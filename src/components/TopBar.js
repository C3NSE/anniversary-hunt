import React from 'react';
import './TopBar.css';

export default function TopBar({ total, unlocked, gpsStatus }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-title">◈ Anniversary Hunt</div>
        <div className={`gps-dot ${gpsStatus === 'active' ? 'on' : ''}`} title="GPS status" />
      </div>
      <div className="progress-row">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`pip ${i < unlocked ? 'done' : i === unlocked ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
