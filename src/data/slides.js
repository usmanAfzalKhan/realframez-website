// src/data/slides.js
// Client wants ONLY /public/images/gallery/twilight/* used across ALL slides.
// Slide copy + CTA stays the same; ONLY images change.
// Randomized per fresh session (SSR-safe).

const TWILIGHT_COUNT = 25;

const twilightPool = Array.from(
  { length: TWILIGHT_COUNT },
  (_, i) => `/images/gallery/twilight/${i + 1}.webp`
);

// ---- deterministic PRNG helpers (seeded shuffle) ----
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSessionSeed() {
  // IMPORTANT: only use browser storage in browser
  if (typeof window === 'undefined') return 1;

  const KEY = 'rf_slides_seed_v1';
  const existing = window.sessionStorage.getItem(KEY);
  if (existing) return Number(existing) || 1;

  // generate seed once per session (new tab = new images)
  let seed = 1;
  try {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    seed = buf[0] >>> 0;
  } catch {
    seed = (Math.floor(Math.random() * 2 ** 32) >>> 0) || 1;
  }

  window.sessionStorage.setItem(KEY, String(seed));
  return seed;
}

function buildSlidesFromSeed(seed) {
  const rng = mulberry32(seed);
  const pool = shuffle(twilightPool, rng);
  let cursor = 0;

  const take = (n) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      out.push(pool[cursor % pool.length]);
      cursor++;
    }
    return out;
  };

  return [
    // 0) WELCOME
    {
      slug: 'welcome',
      title: 'Welcome to Real Frames',
      description: 'Premium real estate media solutions across the GTA.',
      images: take(13),
      ctaHref: '/services',
      ctaLabel: 'View Services',
    },

    // 1) INTERIOR / EXTERIOR PHOTOGRAPHY
    {
      slug: 'photography',
      title: 'Interior / Exterior Photography',
      description:
        'Clean, MLS-ready interior and exterior photos that make every room pop.',
      images: take(3),
      ctaHref: '/services/photography',
      ctaLabel: 'View Service',
    },

    // 2) AERIAL PHOTOGRAPHY
    {
      slug: 'aerial-photography',
      title: 'Aerial Photography',
      description:
        'Capture curb appeal, surroundings, and views in a single hero shot.',
      images: take(7),
      ctaHref: '/services/aerial-photography',
      ctaLabel: 'View Service',
    },

    // 3) TWILIGHT PHOTOGRAPHY
    {
      slug: 'twilight-photography',
      title: 'Twilight Shoots',
      description:
        'Warm, inviting images that feel like golden hour even on a cloudy day.',
      images: take(1),
      ctaHref: '/services/twilight-shoots',
      ctaLabel: 'View Service',
    },

    // 4) VIDEO PRODUCTION
    {
      slug: 'video-production',
      title: 'Video Production',
      description:
        'Cinematic walk-throughs built from steady, well-composed footage.',
      images: take(6),
      ctaHref: '/services/video-production',
      ctaLabel: 'View Service',
    },

    // 7) VIRTUAL STAGING
    {
      slug: 'virtual-staging',
      title: 'Virtual Staging',
      description:
        'Neutral, realistic staging that helps buyers imagine living there.',
      images: take(6),
      ctaHref: '/services/virtual-staging',
      ctaLabel: 'View Service',
    },

    // 8) SOCIAL MEDIA REEL WITH REALTOR
    {
      slug: 'social-media-reel-with-realtor',
      title: 'Social Media Reel with Realtor',
      description:
        'Vertical-friendly sequences ready to cut into high-performing reels.',
      images: take(6),
      ctaHref: '/services/social-media-reel-with-realtor',
      ctaLabel: 'View Service',
    },

    // 9) PACKAGES
    {
      slug: 'packages',
      title: 'Listing Packages',
      description:
        'Three clear bundles so you can price photos, video, and add-ons in seconds.',
      images: take(3),
      ctaHref: '/packages',
      ctaLabel: 'View Packages',
    },

    // 10) PORTFOLIO
    {
      slug: 'portfolio',
      title: 'Portfolio',
      description:
        'Full property galleries that show how your listings look online.',
      images: take(3),
      ctaHref: '/portfolio',
      ctaLabel: 'View Portfolio',
    },

    // 11) FAQ
    {
      slug: 'faq',
      title: 'FAQ & Booking Details',
      description:
        'Shoot prep, turnaround times, and what to expect on the day of your listing.',
      images: take(2),
      ctaHref: '/faq',
      ctaLabel: 'View FAQ',
    },

    // 12) OUR STORY
    {
      slug: 'our-story',
      title: 'Our Story',
      description:
        'A small, detail-obsessed team serving the GTA, Halton, Dufferin County and surrounding areas.',
      images: take(2),
      ctaHref: '/about',
      ctaLabel: 'Our Story',
    },

    // 13) CONTACT
    {
      slug: 'contact',
      title: 'Ready to List Your Next Property?',
      description:
        'Tell us the address and timeline, and we’ll recommend the right Real Frames package.',
      images: take(2),
      ctaHref: '/contact',
      ctaLabel: 'Book a Shoot',
    },

    // 14) REVIEWS
    {
      slug: 'reviews',
      title: 'Agent Reviews',
      description:
        'See why local realtors trust Real Frames with their photos and video.',
      images: take(2),
      ctaHref: '/review',
      ctaLabel: 'Read Reviews',
    },
  ];
}

// ✅ SSR-safe default export (stable seed so no hydration mismatch)
export const slides = buildSlidesFromSeed(1);

// ✅ Call this on the client to randomize per fresh session
export function getRandomizedSlides() {
  return buildSlidesFromSeed(getSessionSeed());
}
