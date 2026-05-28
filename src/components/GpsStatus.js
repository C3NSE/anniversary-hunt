import React from 'react';
import './GpsStatus.css';

export default function GpsStatus({ status, formattedDistance, onCheckLocation }) {
  const isChecking = status === 'checking';
  const isTooFar = status === 'tooFar';
  const isDenied = status === 'denied';

  return (
    <div className={`gps-status-bar ${isTooFar ? 'too-far' : ''} ${isDenied ? 'denied' : ''}`}>
      <span className="gps-icon">
        {isChecking ? '🛰️' : isTooFar ? '📍' : isDenied ? '⚠️' : '📍'}
      </span>
      <span className="gps-text">
        {isChecking && 'Checking your location…'}
        {isTooFar && `Not quite — you're still ${formattedDistance} away`}
        {isDenied && 'Location permission denied'}
        {status === 'unavailable' && 'GPS unavailable on this device'}
        {status === 'idle' && "Tap when you've arrived"}
      </span>
      <button
        className={`manual-btn ${isChecking ? 'checking' : ''}`}
        onClick={onCheckLocation}
        disabled={isChecking}
      >
        {isChecking ? '…' : "I'm here"}
      </button>
    </div>
  );
}
