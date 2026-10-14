import { SpreadData } from "@/types";

export const SAMPLE_SPREADS: SpreadData[] = [
  // Spread 0: Cover
  {
    id: "spread-cover",
    spreadIndex: 0,
    template: "cover",
    photos: [
      {
        slotId: "cover-portrait",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
        alt: "Cover Keepsake Portrait",
        caption: "Our Favorite Beginning",
      },
    ],
    texts: [
      {
        id: "cover-kicker",
        x: 150,
        y: 13,
        text: "THE KEEPSAKE ARCHIVE",
        style: "date",
        fontSize: "text-[10px] tracking-widest uppercase text-cover-accent/70",
      },
      {
        id: "cover-title",
        x: 150,
        y: 19,
        text: "Happy Birthday, Sophia",
        style: "title",
        fontSize: "text-2xl sm:text-3xl font-bold text-cover-accent",
      },
      {
        id: "cover-subtitle",
        x: 150,
        y: 80,
        text: "A Collection of Our Most Treasured Days",
        style: "hand",
        fontSize: "text-xl sm:text-2xl text-accent",
      },
    ],
    stickers: [
      {
        id: "cover-heart",
        x: 150,
        y: 88,
        type: "heart",
        size: 22,
        color: "text-cover-accent",
      },
    ],
  },

  // Spread 1: Single Spotlight
  {
    id: "spread-1",
    spreadIndex: 1,
    template: "single-spotlight",
    photos: [
      {
        slotId: "hero-photo",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        alt: "Golden Hour Glow",
        caption: "Golden hour at the cliffs — you smiled and the world stopped.",
        date: "July 2025",
        location: "Big Sur, CA",
      },
    ],
    texts: [
      {
        id: "spotlight-heading",
        x: 20,
        y: 18,
        text: "The Radiant One",
        style: "title",
        fontSize: "text-3xl font-bold text-ink",
        maxWidth: 60,
      },
      {
        id: "spotlight-letter",
        x: 20,
        y: 32,
        text: "There are moments that get locked in memory not because they were loud, but because they felt completely pure. When the evening breeze caught your hair and you turned around to laugh at my silly joke, I knew right then this was my favorite place to be.",
        style: "body",
        fontSize: "text-sm leading-relaxed text-ink-muted",
        maxWidth: 62,
      },
      {
        id: "spotlight-date",
        x: 20,
        y: 78,
        text: "— Forever my sunbeam",
        style: "hand",
        fontSize: "text-2xl text-accent",
      },
    ],
    stickers: [
      {
        id: "spotlight-sparkle",
        x: 75,
        y: 18,
        type: "sparkle",
        size: 24,
        color: "text-accent",
      },
    ],
  },

  // Spread 2: Duo Classic
  {
    id: "spread-2",
    spreadIndex: 2,
    template: "duo-classic",
    photos: [
      {
        slotId: "duo-left",
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
        alt: "Sunny Cafe Afternoon",
        caption: "Morning coffee & endless talks",
        date: "September 2025",
      },
      {
        slotId: "duo-right",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        alt: "Autumn Walk",
        caption: "Walking through the rain with one umbrella",
        date: "October 2025",
      },
    ],
    texts: [
      {
        id: "duo-left-caption",
        x: 50,
        y: 88,
        text: "Our little corner table in Paris",
        style: "hand",
        fontSize: "text-xl text-accent",
      },
      {
        id: "duo-right-caption",
        x: 150,
        y: 88,
        text: "Wet shoes, cold noses, warmest hearts",
        style: "hand",
        fontSize: "text-xl text-accent",
      },
    ],
    stickers: [
      {
        id: "duo-heart",
        x: 100,
        y: 50,
        type: "heart",
        size: 32,
        color: "text-accent",
      },
    ],
  },

  // Spread 3: Trio Story
  {
    id: "spread-3",
    spreadIndex: 3,
    template: "trio-story",
    photos: [
      {
        slotId: "trio-hero",
        src: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&auto=format&fit=crop&q=80",
        alt: "Standing by the Lake",
        caption: "Mirror lake at sunrise",
      },
      {
        slotId: "trio-top",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
        alt: "Birthday Sparkler",
        caption: "Making midnight birthday wishes",
      },
      {
        slotId: "trio-bottom",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
        alt: "Mountain Vista",
        caption: "Reaching the peak together",
      },
    ],
    texts: [
      {
        id: "trio-note",
        x: 150,
        y: 90,
        text: "Three snapshots from our favorite mountain escape",
        style: "hand",
        fontSize: "text-lg text-ink",
      },
    ],
    stickers: [
      {
        id: "trio-star",
        x: 175,
        y: 12,
        type: "star",
        size: 22,
        color: "text-cover-accent",
      },
    ],
  },

  // Spread 4: Quad Grid
  {
    id: "spread-4",
    spreadIndex: 4,
    template: "quad-grid",
    photos: [
      {
        slotId: "quad-1",
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80",
        alt: "Coastline Drive",
        caption: "Windows down, singing terribly",
      },
      {
        slotId: "quad-2",
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80",
        alt: "Holding Hands",
        caption: "Always right here",
      },
      {
        slotId: "quad-3",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
        alt: "Picnic Blanket",
        caption: "Strawberries & sunshine",
      },
      {
        slotId: "quad-4",
        src: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=800&auto=format&fit=crop&q=80",
        alt: "Evening Bonfire",
        caption: "Roasted marshmallows & guitar chords",
      },
    ],
    texts: [
      {
        id: "quad-heading",
        x: 50,
        y: 8,
        text: "The Art of Being Carefree",
        style: "title",
        fontSize: "text-xl font-bold text-ink",
      },
      {
        id: "quad-footer",
        x: 150,
        y: 92,
        text: "Four little memories, a million reasons to smile",
        style: "hand",
        fontSize: "text-xl text-accent",
      },
    ],
  },

  // Spread 5: Five Collage
  {
    id: "spread-5",
    spreadIndex: 5,
    template: "five-collage",
    photos: [
      {
        slotId: "five-1",
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
        alt: "Friends and Laughs",
        caption: "The crew",
      },
      {
        slotId: "five-2",
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
        alt: "Cozy Hug",
        caption: "Home",
      },
      {
        slotId: "five-3",
        src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
        alt: "Carnival Lights",
        caption: "Ferris wheel view",
      },
      {
        slotId: "five-4",
        src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80",
        alt: "Breakfast in Bed",
        caption: "Pancakes & syrup",
      },
      {
        slotId: "five-5",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        alt: "Valley Waterfall",
        caption: "Nature therapy",
      },
    ],
    texts: [
      {
        id: "five-caption",
        x: 100,
        y: 6,
        text: "A tapestry of our favorite ordinary days",
        style: "hand",
        fontSize: "text-2xl text-accent",
      },
    ],
  },

  // Spread 6: Six Scrapbook
  {
    id: "spread-6",
    spreadIndex: 6,
    template: "six-scrapbook",
    photos: [
      {
        slotId: "six-1",
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80",
        alt: "Boat on the Lake",
        caption: "Rowing across",
      },
      {
        slotId: "six-2",
        src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
        alt: "Desert Roadtrip",
        caption: "Chasing the horizon",
      },
      {
        slotId: "six-3",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        alt: "Tropical Shore",
        caption: "Warm sand and salt in the air",
      },
      {
        slotId: "six-4",
        src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80",
        alt: "Old Town Cobblestones",
        caption: "Getting lost on purpose",
      },
      {
        slotId: "six-5",
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
        alt: "Gelato Stop",
        caption: "Pistachio vs. Chocolate",
      },
      {
        slotId: "six-6",
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
        alt: "Music Festival",
        caption: "Singing until our voices gave out",
      },
    ],
    texts: [
      {
        id: "six-note",
        x: 100,
        y: 94,
        text: "Passport stamps & memories to last ten lifetimes",
        style: "hand",
        fontSize: "text-xl text-accent",
      },
    ],
  },

  // Spread 7: Panoramic Spread
  {
    id: "spread-7",
    spreadIndex: 7,
    template: "panoramic-spread",
    photos: [
      {
        slotId: "pano-main",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
        alt: "Sunset Over the Valley",
        caption: "The world stretched out before us — Yosemite Valley",
      },
    ],
    texts: [
      {
        id: "pano-title",
        x: 100,
        y: 12,
        text: "The Horizon Looks Brighter With You",
        style: "title",
        fontSize: "text-2xl font-bold text-ink",
      },
      {
        id: "pano-caption",
        x: 100,
        y: 86,
        text: "Standing together looking out at everything we've built, and everything still waiting ahead.",
        style: "hand",
        fontSize: "text-2xl text-accent",
      },
    ],
  },

  // Spread 8: Polaroid Scatter
  {
    id: "spread-8",
    spreadIndex: 8,
    template: "polaroid-scatter",
    photos: [
      {
        slotId: "scatter-1",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
        alt: "Sweet Smile",
        caption: "That smile again",
      },
      {
        slotId: "scatter-2",
        src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
        alt: "Goofy Selfie",
        caption: "Trying not to burst out laughing",
      },
      {
        slotId: "scatter-3",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
        alt: "Candid Glance",
        caption: "Caught you looking!",
      },
      {
        slotId: "scatter-4",
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
        alt: "Sunset Silhouette",
        caption: "One more photo before dark",
      },
    ],
    texts: [
      {
        id: "scatter-note",
        x: 100,
        y: 6,
        text: "Unfiltered, unexpected, forever unforgettable",
        style: "hand",
        fontSize: "text-2xl text-accent",
      },
    ],
  },

  // Spread 9: Memory Timeline
  {
    id: "spread-9",
    spreadIndex: 9,
    template: "memory-timeline",
    photos: [
      {
        slotId: "timeline-1",
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
        alt: "The First Concert",
        caption: "Chapter 1: The very first beat",
        date: "2023",
      },
      {
        slotId: "timeline-2",
        src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80",
        alt: "First Trip Together",
        caption: "Chapter 2: Airplane tickets & lost luggage",
        date: "2024",
      },
      {
        slotId: "timeline-3",
        src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80",
        alt: "Celebrating Today",
        caption: "Chapter 3: Here, now, and always",
        date: "2026",
      },
    ],
    texts: [
      {
        id: "timeline-title",
        x: 100,
        y: 12,
        text: "Every Chapter Better Than The Last",
        style: "title",
        fontSize: "text-2xl font-bold text-ink",
      },
    ],
  },

  // Spread 10: Letter and Moments
  {
    id: "spread-10",
    spreadIndex: 10,
    template: "letter-and-moments",
    photos: [
      {
        slotId: "letter-right-top",
        src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80",
        alt: "Warm Smile",
        caption: "Pure joy captured",
      },
      {
        slotId: "letter-right-bottom",
        src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80",
        alt: "Beach Dusk",
        caption: "Listening to the waves at twilight",
      },
    ],
    texts: [
      {
        id: "letter-title",
        x: 20,
        y: 16,
        text: "My Dearest Sophia,",
        style: "title",
        fontSize: "text-2xl font-bold text-accent",
        maxWidth: 62,
      },
      {
        id: "letter-body",
        x: 20,
        y: 26,
        text: "Another year around the sun, and your light only grows more radiant. Thank you for your kindness, your boundless optimism, and for turning every single ordinary Tuesday into an adventure I never want to end. Happy Birthday, my love.",
        style: "letter",
        fontSize: "text-sm leading-relaxed text-ink",
        maxWidth: 62,
      },
      {
        id: "letter-signature",
        x: 20,
        y: 84,
        text: "Forever & Always, Yours.",
        style: "hand",
        fontSize: "text-2xl text-accent",
      },
    ],
    stickers: [
      {
        id: "letter-heart",
        x: 75,
        y: 84,
        type: "heart",
        size: 26,
        color: "text-accent",
      },
    ],
  },

  // Spread 11: Back Cover
  {
    id: "spread-cover-back",
    spreadIndex: 11,
    template: "back-cover",
    photos: [],
    texts: [
      {
        id: "back-title",
        x: 50,
        y: 35,
        text: "To The Next Chapter",
        style: "title",
        fontSize: "text-3xl font-bold text-cover-accent",
      },
      {
        id: "back-message",
        x: 50,
        y: 46,
        text: "May this year bring you as much happiness, wonder, and magic as you give to the world every single day.",
        style: "hand",
        fontSize: "text-2xl text-accent",
        maxWidth: 65,
      },
      {
        id: "back-seal",
        x: 50,
        y: 75,
        text: "HANDCRAFTED WITH ALL MY LOVE • OCTOBER 2026",
        style: "date",
        fontSize: "text-xs tracking-widest uppercase text-cover-accent/70",
      },
    ],
  },
];
