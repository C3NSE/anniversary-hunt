# Anniversary Scavenger Hunt 🧗

A GPS-assisted mobile scavenger hunt app built with React, deployed to GitHub Pages. Built for Katelyn's 4th anniversary hunt — 9 stops, cryptic clues, personal affirmations, and a climbing shoe reveal at the end.

---

## How It Works

1. Katelyn opens the app and sees a hero screen with a photo and a **Begin the Hunt** button
2. Each clue is hidden until she arrives at the location and taps **I'm here**
3. The app samples GPS for a few seconds and unlocks if she's within range — if not, it tells her exactly how far away she still is **and offers an "unlock anyway" button so she's never stuck**
4. On unlock: confetti fires, an **Unlock Overlay** celebrates the arrival, then a full-screen **Affirmation** from Cody appears
5. She taps Continue to reveal the next cryptic clue
6. Final stop triggers a full-screen celebration with a photo

---

## File Structure

```
anniversary-hunt/
├── public/
│   ├── index.html               # HTML shell, loads Bebas Neue + Playfair Display + DM Sans
│   └── photos/
│       ├── hero.jpg             # Photo shown on opening screen
│       └── final.jpg            # Photo shown on final celebration screen
├── src/
│   ├── clues.js                 # ← ALL clue text, hints, affirmations, GPS coords, and radii live here
│   ├── App.js                   # Root component, unlock logic, hero screen, flow control
│   ├── App.css                  # Hero screen styles
│   ├── index.js                 # React entry point
│   ├── index.css                # Global design tokens (trail map color palette)
│   ├── hooks/
│   │   ├── useGeolocation.js    # Multi-sample, accuracy-aware GPS check (fires on button tap)
│   │   └── useConfetti.js       # Canvas confetti animation
│   └── components/
│       ├── TopBar.js / .css         # Fixed header with progress pips
│       ├── GpsStatus.js / .css      # "I'm here" button, distance message, manual override
│       ├── ClueCard.js / .css       # Individual clue card (locked / active / done)
│       ├── UnlockOverlay.js / .css  # Celebration modal on unlock
│       ├── AffirmationScreen.js / .css  # Full-screen personal note after each unlock
│       └── FinalScreen.js / .css    # Final full-screen celebration with photo
├── .github/
│   └── workflows/
│       └── deploy.yml           # Auto-deploys to GitHub Pages on every push to main
└── package.json                 # homepage set to https://C3nSE.github.io/anniversary-hunt
```

---

## Editing Clues

All clue content lives in `src/clues.js`. Each entry has:

```js
{
  id: 1,
  location: '???',       // Shown on the card header — use '???' to keep it cryptic
  emoji: '🐾',           // Shown in the unlock overlay
  clue: '...',           // The cryptic riddle shown on the active card
  hint: '...',           // Revealed when she taps "Need a hint?"
  affirmation: '...',    // Full-screen personal note shown after unlock
  lat: 40.5284,          // GPS latitude of the target location
  lng: -81.4628,         // GPS longitude of the target location
  radiusFeet: 200,       // OPTIONAL — override the default unlock radius for this stop
}
```

**To get coordinates from Google Maps:**
1. Open [maps.google.com](https://maps.google.com)
2. Right-click the exact spot
3. Coordinates appear at the top of the menu — click to copy

---

## GPS Unlock Behavior

The check still only runs when Katelyn taps **I'm here** (on-demand, to save battery), but each tap is now built to be forgiving rather than finnicky:

- **Multiple samples, not one.** A single GPS reading is often the *least* accurate thing a phone gives you (the first fix can be a coarse cell/network estimate). The app watches position for ~7 seconds and keeps the most accurate reading it sees.
- **Accuracy-aware.** Every reading includes how confident the phone is (its accuracy radius). A clue unlocks whenever she could *plausibly* be within range given that uncertainty — so standing at the right spot with a fuzzy ±100 ft fix still works.
- **Generous radius.** Default is **150 ft** (`UNLOCK_RADIUS_FEET` in `clues.js`), with bigger per-stop overrides for sprawling places like the lake (400 ft) and the towpath trail (300 ft). Tight radii were the main cause of "I'm right here and it won't open."
- **Always a way forward.** If the fix is too far, denied, or GPS just won't lock on, the status bar shows an **"Unlock this stop anyway →"** button. She is never blocked.

Tune the default radius at the top of `clues.js`, or add `radiusFeet` to any individual clue.

---

## Photos

Photos are stored in `public/photos/` and referenced via `process.env.PUBLIC_URL` so they work correctly on GitHub Pages:

- `hero.jpg` — displayed on the opening screen
- `final.jpg` — displayed on the final celebration screen

To swap photos, replace the files and keep the same filenames.

---

## Design

Trail map aesthetic — dark forest green base (`#0d2818`), amber gold accents (`#c8973a`), trail green highlights (`#8fbc6a`), topographic grid overlay. Typography: **Bebas Neue** for headers, **Playfair Display** italic for clue text, **DM Sans** for UI.

The affirmation screen inverts to a full amber background to create an emotional contrast from the rest of the app.

---

## Deploy to GitHub Pages

Every push to `main` automatically builds and deploys via GitHub Actions.

```bash
git add .
git commit -m "Update clues"
git push
```

The app will be live at:
```
https://C3nSE.github.io/anniversary-hunt
```

GitHub Actions → Pages source must be set to the `gh-pages` branch in repo Settings.

---

## Resetting Progress

Progress is stored in `localStorage`. To reset:
- Add `?reset=1` to the URL (e.g. `.../anniversary-hunt/?reset=1`) — wired up in `App.js`, or
- Open browser dev tools → Application → Local Storage → clear `anniversary_hunt_unlocked` and `anniversary_hunt_started`

---

## Pre-Hunt Checklist

- [ ] Confirm coordinates by pasting each lat/lng into Google Maps
- [ ] Stand at each spot and run the **I'm here** check on the real phone (the one she'll carry)
- [ ] Confirm the **"Unlock anyway"** fallback appears if a check comes back too far
- [ ] Call Rock Mill Climbing — let them know Katelyn is coming to pick climbing shoes
- [ ] Leave a printed copy of Clue 8 at Legacy High School's front entrance
- [ ] Call ahead to Sammy Sue's so fair fries are ready on arrival
- [ ] Reset progress with `?reset=1` after testing, before the big day
