# Anniversary Scavenger Hunt 🧗

A GPS-unlocking mobile scavenger hunt app built with React, deployable to GitHub Pages.

## Features

- 📍 **GPS unlocking** — clues unlock automatically when within 150 feet of the target location
- 🔒 **Locked by default** — future clues are hidden until reached
- 🎉 **Confetti animations** on each unlock
- 💾 **Progress saved** in localStorage — closing the browser won't lose progress
- 🆘 **Manual override** button if GPS permission is denied
- 📱 **Mobile-first** design, works in any phone browser over HTTPS

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/anniversary-hunt.git
cd anniversary-hunt
npm install
```

### 2. Set your coordinates

Open `src/clues.js` and replace the `lat` / `lng` values for each clue.

**How to get coordinates from Google Maps:**
1. Open [maps.google.com](https://maps.google.com) on your computer
2. Right-click the exact spot you want to pin
3. The coordinates appear at the top of the context menu — click them to copy
4. Paste the lat/lng into the matching clue entry

```js
{
  id: 1,
  location: "Your Home",
  clue: "...",
  hint: "...",
  lat: 40.5317,  // ← paste your latitude here
  lng: -81.4762, // ← paste your longitude here
},
```

You can also adjust `UNLOCK_RADIUS_FEET` at the top of the file (default: 150 ft).

### 3. Run locally to test
```bash
npm start
```
Opens at `http://localhost:3000`. Note: GPS won't work on localhost (requires HTTPS).
Use the **"I'm here"** manual button to test the unlock flow locally.

---

## Deploy to GitHub Pages

### Option A — Automatic (GitHub Actions) ✅ Recommended

Every push to `main` automatically builds and deploys.

1. Create a new repo on GitHub named `anniversary-hunt`
2. Push this project:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anniversary-hunt.git
git push -u origin main
```
3. In your GitHub repo → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / `/(root)`
4. Update `"homepage"` in `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/anniversary-hunt"
```
5. Push the change — GitHub Actions will build and deploy automatically

Your app will be live at:
```
https://YOUR_USERNAME.github.io/anniversary-hunt
```

### Option B — Manual deploy with gh-pages
```bash
npm run deploy
```
This runs `npm run build` then pushes the `build/` folder to the `gh-pages` branch.

---

## Sharing with your wife

Once deployed, just text her the URL:
```
https://YOUR_USERNAME.github.io/anniversary-hunt
```

When she opens it on her phone, the browser will ask for location permission.
She taps **Allow**, and the hunt begins!

---

## File Structure

```
anniversary-hunt/
├── public/
│   └── index.html              # HTML shell with mobile meta tags
├── src/
│   ├── clues.js                # ← EDIT THIS: all clue data + coordinates
│   ├── App.js                  # Root component, unlock logic
│   ├── App.css
│   ├── index.js                # React entry point
│   ├── index.css               # Global design tokens
│   ├── hooks/
│   │   ├── useGeolocation.js   # GPS watching + distance calculation
│   │   └── useConfetti.js      # Canvas confetti animation
│   └── components/
│       ├── TopBar.js / .css    # Fixed header with progress pips
│       ├── GpsStatus.js / .css # GPS status + distance bar
│       ├── ClueCard.js / .css  # Individual clue card (locked/active/done)
│       ├── UnlockOverlay.js / .css  # Celebration modal on unlock
│       └── FinalScreen.js / .css   # Final full-screen celebration
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to GitHub Pages on push
├── package.json
└── README.md
```

---

## Resetting Progress

Progress is stored in the browser's `localStorage`. To reset:
- Open the browser dev tools (or Safari settings) and clear site data, OR
- Add `?reset=1` to the URL and refresh (you can add this feature yourself)

---

## Tips

- **Test the flow** before the big day using the "I'm here" manual override button
- **Coordinate with any stops** that need a human (e.g. the restaurant — call ahead!)
- **Check your coords** by pasting them into Google Maps to confirm the pin is right
- The app works offline once loaded, but GPS still needs signal
