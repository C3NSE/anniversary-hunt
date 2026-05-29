import { useState, useEffect, useRef, useCallback } from 'react';

// ──────────────────────────────────────────────────────────────────────────────
//  useGeolocation
//
//  Instead of trusting a single GPS reading (which is often the
//  least accurate thing your phone can give you), this samples
//  for a few seconds and keeps the best fix it sees. It also
//  factors in the *accuracy* the phone reports, so a clue unlocks
//  whenever you could *plausibly* be within range given that uncertainty —
//  so standing at the right spot with a fuzzy ±100 ft fix still works.
//
//  The check still only runs when she taps "I'm here" (on-demand,
//  to save battery), but each tap is now far more forgiving.
// ──────────────────────────────────────────────────────────────────────────────

const FEET_PER_METER = 3.28084;

const SAMPLE_WINDOW_MS = 7000;    // how long to gather readings per tap
const GOOD_ACCURACY_M = 20;       // a fix this tight is trusted instantly
const MAX_TRUST_ACCURACY_M = 150; // ignore wildly imprecise fixes for instant unlock

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
  const [accuracyFeet, setAccuracyFeet] = useState(null);
  const [withinRange, setWithinRange] = useState(false);

  const watchIdRef = useRef(null);
  const timerRef = useRef(null);
  const bestRef = useRef(null); // { distanceM, accuracyM } — most accurate reading so far

  const cleanup = useCallback(() => {
    if (watchIdRef.current != null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset everything whenever we advance to a new clue (new target).
  useEffect(() => {
    cleanup();
    bestRef.current = null;
    setStatus('idle');
    setDistanceFeet(null);
    setAccuracyFeet(null);
    setWithinRange(false);
  }, [targetLat, targetLng, cleanup]);

  // Safety: stop watching if the component unmounts mid-check.
  useEffect(() => cleanup, [cleanup]);

  const checkLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unavailable');
      return;
    }

    cleanup();
    bestRef.current = null;
    setStatus('checking');

    const radiusMeters = unlockRadiusFeet / FEET_PER_METER;

    // Lenient test: if the nearest point inside the GPS error circle
    // is within the radius, count it as arrived.
    const inRange = (distanceM, accuracyM) =>
      Math.max(0, distanceM - accuracyM) <= radiusMeters;

    const succeed = () => {
      cleanup();
      setWithinRange(true);
      setStatus('idle');
    };

    const onReading = (pos) => {
      const { latitude, longitude } = pos.coords;
      const accuracyM = Number.isFinite(pos.coords.accuracy)
        ? pos.coords.accuracy
        : 50;
      const distanceM = haversineMeters(latitude, longitude, targetLat, targetLng);

      // Keep the tightest reading we've seen this window.
      if (!bestRef.current || accuracyM < bestRef.current.accuracyM) {
        bestRef.current = { distanceM, accuracyM };
      }

      // Show the best estimate live so the bar feels responsive.
      const b = bestRef.current;
      setDistanceFeet(Math.round(b.distanceM * FEET_PER_METER));
      setAccuracyFeet(Math.round(b.accuracyM * FEET_PER_METER));

      // Unlock immediately when we're confident:
      //  - the raw point itself is inside the radius (and the fix isn't absurdly imprecise), or
      //  - the fix is tight AND the error circle reaches the radius.
      const reasonable = accuracyM <= MAX_TRUST_ACCURACY_M;
      const confident =
        reasonable &&
        (distanceM <= radiusMeters ||
          (accuracyM <= GOOD_ACCURACY_M && inRange(distanceM, accuracyM)));

      if (confident) succeed();
    };

    const onError = (err) => {
      cleanup();
      setStatus(err.code === 1 ? 'denied' : 'unavailable');
    };

    watchIdRef.current = navigator.geolocation.watchPosition(onReading, onError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 12000,
    });

    // When the window closes, decide based on the best fix we gathered,
    // giving the benefit of the doubt to imperfect GPS.
    timerRef.current = setTimeout(() => {
      const best = bestRef.current;
      cleanup();
      if (!best) {
        setStatus('unavailable'); // never got a single fix
        return;
      }
      if (inRange(best.distanceM, best.accuracyM)) {
        setWithinRange(true);
        setStatus('idle');
      } else {
        setStatus('tooFar');
      }
    }, SAMPLE_WINDOW_MS);
  }, [targetLat, targetLng, unlockRadiusFeet, cleanup]);

  const formatDistance = useCallback(() => {
    if (distanceFeet === null) return null;
    if (distanceFeet > 5280) return `${(distanceFeet / 5280).toFixed(1)} mi`;
    return `${distanceFeet} ft`;
  }, [distanceFeet]);

  return { status, withinRange, distanceFeet, accuracyFeet, checkLocation, formatDistance };
}
