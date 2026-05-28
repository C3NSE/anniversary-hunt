import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CLUES, UNLOCK_RADIUS_FEET } from './clues';
import { useGeolocation } from './hooks/useGeolocation';
import { useConfetti } from './hooks/useConfetti';
import TopBar from './components/TopBar';
import GpsStatus from './components/GpsStatus';
import ClueCard from './components/ClueCard';
import UnlockOverlay from './components/UnlockOverlay';
import FinalScreen from './components/FinalScreen';
import './App.css';

const STORAGE_KEY = 'anniversary_hunt_unlocked';

function loadProgress() {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    const n = parseInt(val, 10);
    return isNaN(n) ? 0 : Math.min(n, CLUES.length);
  } catch {
    return 0;
  }
}

function saveProgress(n) {
  try { localStorage.setItem(STORAGE_KEY, String(n)); } catch {}
}

export default function App() {
  const [unlockedCount, setUnlockedCount] = useState(loadProgress);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [justUnlockedIndex, setJustUnlockedIndex] = useState(null);
  const hasTriggered = useRef(false);
  const { canvasRef, launch: launchConfetti } = useConfetti();

  const currentClue = CLUES[unlockedCount] ?? null;

  const { status, withinRange, formatDistance, proximityPct } = useGeolocation(
    currentClue?.lat ?? 0,
    currentClue?.lng ?? 0,
    UNLOCK_RADIUS_FEET
  );

  // Trigger unlock when GPS says we're close enough
  useEffect(() => {
    if (withinRange && !overlayVisible && !hasTriggered.current && unlockedCount < CLUES.length) {
      hasTriggered.current = true;
      setJustUnlockedIndex(unlockedCount);
      setOverlayVisible(true);
      launchConfetti();
    }
    if (!withinRange) {
      hasTriggered.current = false;
    }
  }, [withinRange, overlayVisible, unlockedCount, launchConfetti]);

  const handleManualUnlock = useCallback(() => {
    if (unlockedCount < CLUES.length && !overlayVisible) {
      hasTriggered.current = true;
      setJustUnlockedIndex(unlockedCount);
      setOverlayVisible(true);
      launchConfetti();
    }
  }, [unlockedCount, overlayVisible, launchConfetti]);

  const dismissOverlay = useCallback(() => {
    setOverlayVisible(false);
    const next = (justUnlockedIndex ?? unlockedCount) + 1;
    setUnlockedCount(next);
    saveProgress(next);
    hasTriggered.current = false;

    // Scroll to next card
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
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />

      <TopBar total={CLUES.length} unlocked={unlockedCount} gpsStatus={status} />

      <main className="scroll-area">
        <GpsStatus
          status={status}
          targetName={currentClue?.location ?? ''}
          formattedDistance={formatDistance()}
          onManualUnlock={handleManualUnlock}
        />

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
                proximityPct={i === unlockedCount ? proximityPct : 0}
                formattedDistance={i === unlockedCount ? formatDistance() : null}
              />
            );
          })}
        </div>
      </main>

      <UnlockOverlay
        clue={CLUES[justUnlockedIndex]}
        clueIndex={justUnlockedIndex}
        total={CLUES.length}
        visible={overlayVisible}
        onDismiss={dismissOverlay}
      />

      <FinalScreen visible={allDone && !overlayVisible} />
    </>
  );
}
