# Anniversary Scavenger Hunt 🧗

A GPS-assisted mobile scavenger hunt app built with React, deployed to GitHub Pages. Built for Katelyn's 4th anniversary hunt — 9 stops, cryptic clues, personal affirmations, and a climbing shoe reveal at the end.

---

## How It Works

1. Katelyn opens the app and sees a hero screen with a photo and a **Begin the Hunt** button
2. Each clue is hidden until she arrives at the location and taps **I'm here**
3. The app does a single GPS check — if she's within 150 ft it unlocks; if not, it tells her exactly how far away she still is
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
│   ├── clues.js                 # ← ALL clue text, hints, affirmations, and GPS coords live here
│   ├── App.js                   # Root component, unlock logic, hero screen, flow control
│   ├── App.css                  # Hero screen styles
│   ├── index.js                 # React entry point
│   ├── index.css                # Global design tokens (trail map color palette)
│   ├── hooks/
│   │   ├── useGeolocation.js    # Single-check GPS — fires on button tap, not continuously
│   │   └── useConfetti.js       # Canvas confetti animation
│   └── components/
│       ├── TopBar.js / .css         # Fixed header with progress pips
│       ├── GpsStatus.js / .css      # "I'm here" button + distance error message
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
}
```

**To get coordinates from Google Maps:**
1. Open [maps.google.com](https://maps.google.com)
2. Right-click the exact spot
3. Coordinates appear at the top of the menu — click to copy

---

## GPS Unlock Behavior

Rather than watching GPS continuously, the app uses a **single on-demand check**:

- Katelyn taps **I'm here** when she thinks she's arrived
- The app calls `getCurrentPosition` once with `maximumAge: 0` (always fresh)
- If she's within `UNLOCK_RADIUS_FEET` (set to 150 ft in `clues.js`), the clue unlocks
- If not, the status bar turns amber and shows her exact distance remaining
- Adjust `UNLOCK_RADIUS_FEET` at the top of `clues.js` if needed

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
- Add `?reset=1` to the URL, or
- Open browser dev tools → Application → Local Storage → clear `anniversary_hunt_unlocked` and `anniversary_hunt_started`

---

## Pre-Hunt Checklist

- [ ] Confirm coordinates by pasting each lat/lng into Google Maps
- [ ] Call Rock Mill Climbing — let them know Katelyn is coming to pick climbing shoes
- [ ] Leave a printed copy of Clue 8 at Legacy High School's front entrance
- [ ] Call ahead to Sammy Sue's so fair fries are ready on arrival
- [ ] Test the full flow using the **I'm here** button before the big day
