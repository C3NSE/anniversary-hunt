import React, { useEffect, useState } from 'react';
import './AffirmationScreen.css';

export default function AffirmationScreen({ text, onContinue, visible }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShow(true), 80);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`affirmation-backdrop ${show ? 'is-visible' : ''}`}>
      <div className="affirmation-inner">
        <div className="affirmation-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
        <div className="affirmation-from">A note from Cody</div>
        <p className="affirmation-text">{text}</p>
        <div className="affirmation-divider" />
        <button className="affirmation-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  );
}
