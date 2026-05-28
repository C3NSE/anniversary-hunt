import React from 'react';
import './TopBar.css';

export default function TopBar({ total, unlocked, gpsStatus }) {
  return (
    <div className="topbar">
      <div className="topbar-title">✦ Our Anniversary Hunt ✦</div>
      <div className="progress-row">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`pip ${i < unlocked ? 'done' : i === unlocked ? 'active' : ''}`}
          />
        ))}
        <div className={`gps-indicator ${gpsStatus === 'active' ? 'on' : ''}`} title="GPS status" />
      </div>
    </div>
  );
}
