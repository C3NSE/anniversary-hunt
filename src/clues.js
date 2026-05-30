// ══════════════════════════════════════════════════════════
//  CLUES CONFIGURATION
//  All clue text, affirmations, and GPS coordinates live here.
// ══════════════════════════════════════════════════════════

// Default unlock radius, in feet. Generous on purpose — GPS is
// routinely off by 50–150 ft near buildings, so a tight radius
// is the #1 cause of "I'm standing right here and it won't open."
export const UNLOCK_RADIUS_FEET = 150;

// Any clue may override the radius with an optional `radiusFeet`.
// Big, sprawling spots (a lake, a trail, a park) get a wider one
// so she doesn't have to find the exact pin.
export const CLUES = [
  {
    id: 1,
    location: '???',
    emoji: '🐾',
    radiusFeet: 200,
    clue:
      'Start where love lives and leashes hang. Find the place where the water won cold and a brave girl made her first splash. She had four legs. You were watching.',
    hint: 'The riverside swingset — where Marley took her very first swim.',
    affirmation:
      "You've always been so good with Marley — the time you've given to train her, walk her, play with her, and love her. I'm so excited to watch you pour that same love into our kids someday. I already know you're going to be an incredible mom.",
    lat: 40.521831199391656,
    lng: -81.46942597783756,
  },
  {
    id: 2,
    location: '???',
    emoji: '🍟',
    clue:
      "She's known by her wings, but you're not here for those. Find the place where the fair never really left town, and order the thing that needs nothing but salt and a good day to be perfect.",
    hint: "Sammy Sue's — grab an order of fair fries at the counter.",
    affirmation:
      "Your love for fries and popcorn is so simple, yet so beautiful. You don't need much to make your day. It inspires me to be content with the little things and look for joy in each moment.",
    lat: 40.51881998690293,
    lng: -81.47687346848207,
  },
  {
    id: 3,
    location: '???',
    emoji: '🏀',
    radiusFeet: 250,
    clue:
      "We had no plan. We had no reason to be there. But we showed up anyway and played until it was dark. Go back to where we did something ridiculous on a Tuesday — there's a rusted rim that remembers.",
    hint: 'The basketball hoop at Tuscora Park.',
    affirmation:
      "Your spontaneous side was a perfect match for me. I know I'm not always loose enough to just go with it, but you make those moments fun and remind me what I used to be like. This is only the beginning — there are so many more memories to come.",
    lat: 40.50002110369357, 
    lng: -81.44239909922355,
  },
  {
    id: 4,
    location: '???',
    emoji: '🏄',
    radiusFeet: 400,
    clue:
      "Every summer we say we'll do it more. Every summer we mean it. Find the lake that holds our paddles and our promises — and look for your next clue near the water's edge.",
    hint: 'Atwood Lake — near the paddle board launch or main shoreline.',
    affirmation:
      "Your consistency in my life is almost like our summers on the water. Your love is something I can always come back to and find rest in. Here's to many more precious moments doing the things we love most — together.",
    lat: 40.5276113121001, 
    lng: -81.28533109105558,
  },
  {
    id: 5,
    location: '???',
    emoji: '🛤️',
    radiusFeet: 300,
    clue:
      'It follows a path that mules once walked, beside water that once carried coal. Find the trail that remembers the old Ohio — and look for your clue where the history begins.',
    hint: 'The Towpath Trail trailhead — check near the info kiosk or main signage.',
    affirmation:
      "I know you haven't always loved running, but I've loved watching you grow into it. Your boldness in trying new things and pushing past your own limits always surprises me. Keep pressing into that side of yourself — it will yield so much good.",
    lat: 40.57699044416759,
    lng: -81.39672871965966,
  },
  {
    id: 6,
    location: '???',
    emoji: '🏫',
    clue:
      "Go to the building where you changed someone's life this week — even if you don't know it yet. Find the entrance where students walk in nervous and leave a little braver. Someone left something there for you.",
    hint: 'Legacy High School — check the front entrance or main office.',
    affirmation:
      "Your bravery over the past two years — stepping into a new teaching role, building real connections with your students — constantly amazes me. You've had an impact on those kids that's bigger than you can even comprehend. And it's not over yet.",
    lat: 40.524945821516084,
    lng: -81.6314874841882,
  },
  {
    id: 7,
    location: '???',
    emoji: '🧗',
    clue:
      "You've solved every riddle. You've earned every mile. Now head to the place where the walls are meant to be climbed and the only way forward is up. When you get to the front desk, tell them Cody sent you — then go find your next pair of shoes.",
    hint: "Rock Mill Climbing in Akron — ask the front desk, they're expecting you!",
    affirmation:
      "I love watching you climb. Watching you do something you're genuinely great at and love deeply is one of my favorite things. You're a wildly talented woman in so many ways. I haven't always made that a priority — but that changes today.",
    lat: 41.07552231647431,
    lng: -81.49776103876972,
  },
  {
    id: 8,
    location: 'Rock Mill Climbing',
    emoji: '✨',
    clue:
      'You made it, Katelyn. Every riddle, every mile, every stop. All of it led here — to me, waiting for you.',
    hint: "You're already here. Walk through the doors.",
    affirmation:
      "Love isn't finding someone you can live with. It's finding someone you can't live without. You're my without. I have cherished every single day of these four years, and I look forward to every one that comes after. Happy Anniversary. I love you. ♡",
    lat: 41.07552231647431,
    lng: -81.49776103876972,
  },
];
