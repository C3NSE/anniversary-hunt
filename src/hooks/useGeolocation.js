import { useState, useEffect, useRef, useCallback } from 'react';

const FEET_PER_METER = 3.28084;

function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useGeolocation(targetLat, targetLng, unlockRadiusFeet) {
  const [status, setStatus] = useState('idle'); // idle | checking | tooFar | denied | unavailable
  const [distanceFeet, setDistanceFeet] = useState(null);
  const [withinRange, setWithinRange] = useState(false);
  const unlockRadiusMeters = unlockRadiusFeet / FEET_PER_METER;

  // Reset state when target changes (i.e. new clue unlocked)
  useEffect(() => {
    setStatus('idle');
    setDistanceFeet(null);
    setWithinRange(false);
  }, [targetLat, targetLng]);

  const checkLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unavailable');
      return;
    }
    setStatus('checking');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const meters = haversineMeters(
          pos.coords.latitude,
          pos.coords.longitude,
          targetLat,
          targetLng
        );
        const feet = Math.round(meters * FEET_PER_METER);
        setDistanceFeet(feet);
        if (meters <= unlockRadiusMeters) {
          setWithinRange(true);
          setStatus('idle');
        } else {
          setWithinRange(false);
          setStatus('tooFar');
        }
      },
      (err) => {
        if (err.code === 1) setStatus('denied');
        else setStatus('unavailable');
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );
  }, [targetLat, targetLng, unlockRadiusMeters]);

  const formatDistance = () => {
    if (distanceFeet === null) return null;
    if (distanceFeet > 5280) return `${(distanceFeet / 5280).toFixed(1)} mi`;
    return `${distanceFeet} ft`;
  };

  return { status, withinRange, checkLocation, formatDistance };
}
