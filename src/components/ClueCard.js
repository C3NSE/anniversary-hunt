import React, { useState } from 'react';
import './ClueCard.css';

export default function ClueCard({ clue, index, total, state, proximityPct, formattedDistance }) {
  const [hintOpen, setHintOpen] = useState(false);
  // state: 'locked' | 'active' | 'done'
  const isLocked = state === 'locked';
  const isActive = state === 'active';
  const isDone = state === 'done';

  return (
    <div
      id={`card-${index}`}
      className={`clue-card ${state}`}
    >
      {/* ── HEADER ── */}
      <div className="card-header">
        <div className={`clue-badge badge-${state}`}>
          {isDone ? '✓' : isLocked ? '?' : index + 1}
        </div>
        <div className="card-meta">
          <div className="card-step">Clue {index + 1} of {total}</div>
          <div className="card-location">
            {isLocked ? '???' : clue.location}
          </div>
        </div>
        <div className="card-status-icon">
          {isDone && <span className="icon-check">✓</span>}
          {isLocked && <span className="icon-lock">🔒</span>}
          {isActive && <span className="card-emoji">{clue.emoji}</span>}
        </div>
      </div>

      {/* ── PROXIMITY BAR (active only) ── */}
      {isActive && (
        <div className="prox-wrap">
          <div className="prox-label">
            <span>Getting closer…</span>
            <span className="prox-dist">{formattedDistance ?? '—'}</span>
          </div>
          <div className="prox-track">
            <div className="prox-fill" style={{ width: `${proximityPct}%` }} />
          </div>
        </div>
      )}

      {/* ── CLUE BODY (active + done) ── */}
      {!isLocked && (
        <div className="card-body">
          <div className="card-divider" />
          <div className="clue-label">{isDone ? 'Completed clue' : 'Your clue'}</div>
          <p className="clue-text">"{clue.clue}"</p>
          <button
            className="hint-toggle"
            onClick={() => setHintOpen((o) => !o)}
          >
            {hintOpen ? '▲ Hide hint' : '▾ Need a hint?'}
          </button>
          {hintOpen && <p className="hint-text">{clue.hint}</p>}
        </div>
      )}
    </div>
  );
}
