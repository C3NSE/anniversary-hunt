import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CLUES, UNLOCK_RADIUS_FEET } from './clues';
import { useGeolocation } from './hooks/useGeolocation';
import { useConfetti } from './hooks/useConfetti';
import TopBar from './components/TopBar';
import GpsStatus from './components/GpsStatus';
import ClueCard from './components/ClueCard';
import UnlockOverlay from './components/UnlockOverlay';
import AffirmationScreen from './components/AffirmationScreen';
import FinalScreen from './components/FinalScreen';
import './App.css';

const STORAGE_KEY = 'anniversary_hunt_unlocked';
const STARTED_KEY = 'anniversary_hunt_started';

// Visiting the app with ?reset=1 wipes saved progress.
// Handy for testing the full flow, or recovering if anything ever feels stuck.
(function maybeReset() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') === '1') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STARTED_KEY);
    }
  } catch {}
})();

function loadProgress() {
  try {
    const n = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    return isNaN(n) ? 0 : Math.min(n, CLUES.length);
  } catch {
    return 0;
  }
}

function saveProgress(n) {
  try { localStorage.setItem(STORAGE_KEY, String(n)); } catch {}
}

function loadStarted() {
  try { return localStorage.getItem(STARTED_KEY) === 'true'; } catch { return false; }
}

function saveStarted() {
  try { localStorage.setItem(STARTED_KEY, 'true'); } catch {}
}

export default function App() {
  const [huntStarted, setHuntStarted] = useState(loadStarted);
  const [unlockedCount, setUnlockedCount] = useState(loadProgress);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [affirmationVisible, setAffirmationVisible] = useState(false);
  const [affirmationText, setAffirmationText] = useState('');
  const [justUnlockedIndex, setJustUnlockedIndex] = useState(null);
  const hasTriggered = useRef(false);
  const { canvasRef, launch: launchConfetti } = useConfetti();

  const currentClue = CLUES[unlockedCount] ?? null;
  const activeRadius = currentClue?.radiusFeet ?? UNLOCK_RADIUS_FEET;

  const { status, withinRange, checkLocation, formatDistance } = useGeolocation(
    currentClue?.lat ?? 0,
    currentClue?.lng ?? 0,
    activeRadius
  );

  // The single place an unlock begins — used by both GPS and the manual fallback.
  const beginUnlock = useCallback(() => {
    if (hasTriggered.current) return;
    if (overlayVisible || affirmationVisible) return;
    if (unlockedCount >= CLUES.length) return;
    hasTriggered.current = true;
    setJustUnlockedIndex(unlockedCount);
    setOverlayVisible(true);
    launchConfetti();
  }, [overlayVisible, affirmationVisible, unlockedCount, launchConfetti]);

  // Fire the unlock once GPS confirms she's close enough.
  useEffect(() => {
    if (withinRange) beginUnlock();
  }, [withinRange, beginUnlock]);

  // Release the trigger lock whenever the clue advances.
  useEffect(() => {
    hasTriggered.current = false;
  }, [unlockedCount]);

  const handleStart = useCallback(() => {
    setHuntStarted(true);
    saveStarted();
  }, []);

  const handleCheckLocation = useCallback(() => {
    checkLocation();
  }, [checkLocation]);

  // The safety net: unlock this stop without waiting on GPS.
  const handleManualUnlock = useCallback(() => {
    beginUnlock();
  }, [beginUnlock]);

  const dismissOverlay = useCallback(() => {
    setOverlayVisible(false);
    const idx = justUnlockedIndex ?? unlockedCount;
    setAffirmationText(CLUES[idx]?.affirmation ?? '');
    setAffirmationVisible(true);
  }, [justUnlockedIndex, unlockedCount]);

  const dismissAffirmation = useCallback(() => {
    setAffirmationVisible(false);
    const next = (justUnlockedIndex ?? unlockedCount) + 1;
    setUnlockedCount(next);
    saveProgress(next);
    hasTriggered.current = false;

    setTimeout(() => {
      const el = document.getElementById(`card-${next}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);

    if (next >= CLUES.length) {
      setTimeout(() => launchConfetti(), 600);
    }
  }, [justUnlockedIndex, unlockedCount, launchConfetti]);

  const allDone = unlockedCount >= CLUES.length;

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />

      {!huntStarted && (
        <div className="hero-screen">
          <div className="hero-photo">
            <img src={`${process.env.PUBLIC_URL}/photos/hero.jpg`} alt="Cody and Katelyn" />
            <svg className="hero-compass" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <circle cx="22" cy="22" r="20" stroke="rgba(245,237,224,0.4)" strokeWidth="1"/>
              <polygon points="22,6 24.5,19 22,17 19.5,19" fill="rgba(245,237,224,0.8)"/>
              <polygon points="22,38 24.5,25 22,27 19.5,25" fill="rgba(245,237,224,0.3)"/>
              <polygon points="6,22 19,19.5 17,22 19,24.5" fill="rgba(245,237,224,0.3)"/>
              <polygon points="38,22 25,19.5 27,22 25,24.5" fill="rgba(245,237,224,0.3)"/>
              <circle cx="22" cy="22" r="3" fill="rgba(200,151,58,0.9)"/>
              <text x="22" y="4.5" textAnchor="middle" fontSize="6" fill="rgba(245,237,224,0.6)" fontFamily="sans-serif">N</text>
            </svg>
          </div>
          <div className="hero-bottom">
            <div className="hero-badge">▲ Anniversary Hunt · May 28, 2022</div>
            <div className="hero-title">For<br /><em>Katelyn.</em></div>
            <div className="hero-sub">"Every adventure starts with a single brave step."</div>
            <button className="hero-start-btn" onClick={handleStart}>
              BEGIN THE HUNT →
            </button>
            <div className="hero-stamp">4 Years · 9 Stops · 1 Perfect Day</div>
          </div>
        </div>
      )}

      {huntStarted && (
        <>
          <TopBar total={CLUES.length} unlocked={unlockedCount} gpsStatus={status} />
          <main className="scroll-area">
            {!allDone && (
              <GpsStatus
                status={status}
                formattedDistance={formatDistance()}
                onCheckLocation={handleCheckLocation}
                onManualUnlock={handleManualUnlock}
              />
            )}
            <div className="cards-list">
              {CLUES.map((clue, i) => {
                const cardState =
                  i < unlockedCount ? 'done' : i === unlockedCount ? 'active' : 'locked';
                return (
                  <ClueCard
                    key={clue.id}
                    clue={clue}
                    index={i}
                    total={CLUES.length}
                    state={cardState}
                  />
                );
              })}
            </div>
          </main>
        </>
      )}

      <UnlockOverlay
        clue={CLUES[justUnlockedIndex]}
        clueIndex={justUnlockedIndex}
        total={CLUES.length}
        visible={overlayVisible}
        onDismiss={dismissOverlay}
      />

      <AffirmationScreen
        text={affirmationText}
        visible={affirmationVisible}
        onContinue={dismissAffirmation}
      />

      <FinalScreen visible={allDone && !overlayVisible && !affirmationVisible} />
    </>
  );
}
