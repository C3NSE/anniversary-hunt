import { useState, useEffect, useRef } from 'react';

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
  const [status, setStatus] = useState('idle');
  const [distanceFeet, setDistanceFeet] = useState(null);
  const [distanceMeters, setDistanceMeters] = useState(null);
  const [withinRange, setWithinRange] = useState(false);
  const watchRef = useRef(null);
  const confirmTimer = useRef(null);
  const unlockRadiusMeters = unlockRadiusFeet / FEET_PER_METER;

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('unavailable');
      return;
    }

    setStatus('requesting');

    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setStatus('active');
        const meters = haversineMeters(
          pos.coords.latitude,
          pos.coords.longitude,
          targetLat,
          targetLng
        );
        const feet = meters * FEET_PER_METER;
        setDistanceMeters(meters);
        setDistanceFeet(Math.round(feet));

        if (meters <= unlockRadiusMeters) {
          // Only fire withinRange after staying inside for 3 seconds
          if (!confirmTimer.current) {
            confirmTimer.current = setTimeout(() => {
              setWithinRange(true);
            }, 3000);
          }
        } else {
          // Left the radius — cancel any pending confirmation
          if (confirmTimer.current) {
            clearTimeout(confirmTimer.current);
            confirmTimer.current = null;
          }
          setWithinRange(false);
        }
      },
      (err) => {
        if (err.code === 1) setStatus('denied');
        else setStatus('unavailable');
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );

    return () => {
      if (watchRef.current !== null) {
        navigator.geolocation.clearWatch(watchRef.current);
      }
      if (confirmTimer.current) {
        clearTimeout(confirmTimer.current);
      }
    };
  }, [targetLat, targetLng, unlockRadiusMeters]);

  const formatDistance = () => {
    if (distanceFeet === null) return null;
    if (distanceFeet > 5280) return `${(distanceFeet / 5280).toFixed(1)} mi`;
    return `${distanceFeet} ft`;
  };

  const proximityPct =
    distanceMeters !== null
      ? Math.round(Math.min(100, Math.max(0, (1 - distanceMeters / 500) * 100)))
      : 0;

  return { status, distanceFeet, withinRange, formatDistance, proximityPct };
}
