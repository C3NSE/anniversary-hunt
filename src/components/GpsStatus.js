import React from 'react';
import './GpsStatus.css';

const STATUS_MESSAGES = {
  idle: 'Starting GPS…',
  requesting: 'Requesting location permission…',
  active: null,
  denied: 'Location permission denied — tap to open settings',
  unavailable: 'GPS unavailable on this device',
};

export default function GpsStatus({ status, targetName, formattedDistance, onManualUnlock }) {
  const msg = STATUS_MESSAGES[status] ?? 'Locating…';
  const isActive = status === 'active';
  const isDenied = status === 'denied';

  return (
    <div className={`gps-status-bar ${isDenied ? 'denied' : ''}`}>
      <span className="gps-icon">{isActive ? '📍' : isDenied ? '⚠️' : '🛰️'}</span>
      <span className="gps-text">
        {isActive
          ? `Tracking · Next: ${targetName}`
          : msg}
      </span>
      {isActive && formattedDistance && (
        <span className="gps-dist">{formattedDistance}</span>
      )}
      {isDenied && (
        <button className="manual-btn" onClick={onManualUnlock}>
          I'm here
        </button>
      )}
    </div>
  );
}
