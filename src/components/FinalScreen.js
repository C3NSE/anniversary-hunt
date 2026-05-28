import React from 'react';
import './FinalScreen.css';

export default function FinalScreen({ visible }) {
  if (!visible) return null;
  return (
    <div className="final-screen">
      <div className="final-inner">
        <div className="final-ornament">🌿✨🌿</div>
        <h1 className="final-title">You made it!</h1>
        <p className="final-sub">
          You've followed every clue and climbed every challenge —<br />
          just like you do every day with me.
        </p>
        <div className="final-divider" />
        <p className="final-note">
          "Walk through these doors. Your prize — and your favorite
          belay partner — are waiting inside."
        </p>
        <div className="final-shoe">🧗‍♀️</div>
        <p className="final-caption">Happy 4th Anniversary ♡</p>
      </div>
    </div>
  );
}
