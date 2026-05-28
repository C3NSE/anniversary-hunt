import React from 'react';
import './FinalScreen.css';

export default function FinalScreen({ visible }) {
  if (!visible) return null;
  return (
    <div className="final-screen">
      <div className="final-photo">
        <img src={`${process.env.PUBLIC_URL}/photos/final.jpg`} alt="Cody and Katelyn" />
      </div>
      <div className="final-inner">
        <span className="final-ornament">✦ ANNIVERSARY HUNT COMPLETE ✦</span>
        <h1 className="final-title">You Made It.</h1>
        <p className="final-sub">
          Every riddle, every mile, every stop —<br />
          all of it led right here.
        </p>
        <div className="final-divider" />
        <p className="final-note">
          "Love isn't finding someone you can live with.<br />
          It's finding someone you can't live without.<br />
          You're my without."
        </p>
        <p className="final-caption">Happy 4th Anniversary, Katelyn ♡</p>
      </div>
    </div>
  );
}
