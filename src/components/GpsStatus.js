import React from 'react';
import './GpsStatus.css';

export default function GpsStatus({
  status,
  formattedDistance,
  onCheckLocation,
  onManualUnlock,
}) {
  const isChecking = status === 'checking';
  const isTooFar = status === 'tooFar';
  const isDenied = status === 'denied';
  const isUnavailable = status === 'unavailable';

  // Whenever GPS won't cooperate, offer a guaranteed way forward.
  const showOverride = isTooFar || isDenied || isUnavailable;

  let icon = '📍';
  if (isChecking) icon = '🛰️';
  else if (isDenied) icon = '⚠️';
  else if (isUnavailable) icon = '📡';

  let buttonLabel = "I'm here";
  if (isChecking) buttonLabel = '…';
  else if (status !== 'idle') buttonLabel = 'Try again';

  return (
    <div
      className={`gps-status-bar ${isTooFar ? 'too-far' : ''} ${
        isDenied || isUnavailable ? 'denied' : ''
      }`}
    >
      <div className="gps-row">
        <span className="gps-icon">{icon}</span>
        <span className="gps-text">
          {isChecking && 'Pinpointing your location…'}
          {isTooFar && (
            <>Not quite yet — you're about <strong>{formattedDistance}</strong> away.</>
          )}
          {isDenied && 'Location access is turned off for this site.'}
          {isUnavailable && "Couldn't get a GPS fix right now."}
          {status === 'idle' && "Tap when you've arrived."}
        </span>
        <button
          className={`manual-btn ${isChecking ? 'checking' : ''}`}
          onClick={onCheckLocation}
          disabled={isChecking}
        >
          {buttonLabel}
        </button>
      </div>

      {isChecking && (
        <div className="gps-hint">
          Hold still for a few seconds — it gets more accurate the longer it looks.
        </div>
      )}

      {showOverride && (
        <button className="gps-override" onClick={onManualUnlock}>
          GPS being stubborn? Unlock this stop anyway →
        </button>
      )}
    </div>
  );
}
