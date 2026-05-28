// ══════════════════════════════════════════════════════════
//  CLUES CONFIGURATION
//  Edit this file to update clue text, locations, and coords.
//
//  To get lat/lng for a location:
//    1. Open Google Maps in your browser
//    2. Right-click the exact spot on the map
//    3. The coordinates appear at the top of the menu — click to copy
//
//  UNLOCK_RADIUS_FEET: how close she needs to be to unlock (default 150ft)
// ══════════════════════════════════════════════════════════

export const UNLOCK_RADIUS_FEET = 150;

export const CLUES = [
  {
    id: 1,
    location: "Your Home",
    emoji: "🏡",
    clue:
      "Every adventure starts where the heart is. Before you hit the road, check the spot where we always drop our keys when we walk in the door.",
    hint: "The key hook, bowl, or entryway table near your front door.",
    lat: 40.5317, // ← REPLACE with your home latitude
    lng: -81.4762, // ← REPLACE with your home longitude
  },
  {
    id: 2,
    location: "Downtown Dover",
    emoji: "🌳",
    clue:
      "Four years ago we started saying yes to things together. Find the place in Dover where people gather to celebrate, stroll, and grab a bite on a good day — the heart of downtown.",
    hint: "Try the Dover City Park gazebo or the public square on main street.",
    lat: 40.5317, // ← REPLACE
    lng: -81.4762,
  },
  {
    id: 3,
    location: "Tuscora Park",
    emoji: "🎠",
    clue:
      "We've learned that the best things in life aren't things — they're moments. Find the oldest ride in this park that's been spinning smiles for generations.",
    hint: "Look near the base of the historic carousel.",
    lat: 40.5317, // ← REPLACE
    lng: -81.4762,
  },
  {
    id: 4,
    location: "Dover Dam",
    emoji: "💧",
    clue:
      "Still waters run deep — just like the four years we've built together. Head somewhere nearby where water collects and patience is always rewarded.",
    hint: "Check a bench or the trailhead sign near Dover Dam.",
    lat: 40.5317, // ← REPLACE
    lng: -81.4762,
  },
  {
    id: 5,
    location: "Canal Greenway Trail",
    emoji: "🛤️",
    clue:
      "We've walked a lot of paths together — some planned, some totally unexpected. Find the trail that follows the old Ohio & Erie Canal and look for a marker near the start.",
    hint: "Look at the informational kiosk near the Dover trailhead.",
    lat: 40.5317, // ← REPLACE
    lng: -81.4762,
  },
  {
    id: 6,
    location: "Our Favorite Restaurant",
    emoji: "🍽️",
    clue:
      "Think of the restaurant where we had one of our best dates — the one you still talk about. Go there and ask for something left behind the counter just for you.",
    hint: "The staff are expecting you — just ask!",
    lat: 40.5317, // ← REPLACE
    lng: -81.4762,
  },
  {
    id: 7,
    location: "Brandywine Falls, CVNP",
    emoji: "🌊",
    clue:
      "We're almost there — but first, breathe in some of the best nature Ohio has to offer. Find the Brandywine Falls overlook and look for a small envelope near the railing.",
    hint: "Check near the wooden railing at the falls viewpoint.",
    lat: 41.2706, // ← REPLACE
    lng: -81.5437,
  },
  {
    id: 8,
    location: "Rock Mill Climbing — Akron",
    emoji: "🧗",
    clue:
      "You've climbed every clue I set for you today, just like you climb every challenge that comes our way. Now walk through these doors — something is waiting for you on the other side.",
    hint: "Your prize and your belay partner are inside!",
    lat: 41.0814, // ← REPLACE with Rock Mill's exact coords
    lng: -81.5190,
  },
];
