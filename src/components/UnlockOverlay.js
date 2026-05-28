import React from 'react';
import './UnlockOverlay.css';

export default function UnlockOverlay({ clue, clueIndex, total, onDismiss, visible }) {
  if (!visible || !clue) return null;

  return (
    <div className="overlay-backdrop" onClick={onDismiss}>
      <div className="overlay-box" onClick={(e) => e.stopPropagation()}>
        <span className="overlay-emoji" role="img" aria-label="clue emoji">
          {clue.emoji}
        </span>
        <h2 className="overlay-title">Clue {clueIndex + 1} Unlocked!</h2>
        <p className="overlay-sub">You've arrived at<br /><strong>{clue.location}</strong></p>
        <button className="overlay-btn" onClick={onDismiss}>
          Read My Clue →
        </button>
        <p className="overlay-count">{clueIndex + 1} of {total} found</p>
      </div>
    </div>
  );
}
