// src/data/slides.js
// 1 slide = 1 image.
// Aerial slide uses ONLY /public/images/gallery/twilight/13.webp.
// Other slides use /public/images/hero/*.
// Slide copy + CTA stays the same.

const heroImages = [
  '/images/hero/1.webp',
  '/images/hero/2.webp',
  '/images/hero/3.webp',
  '/images/hero/4.webp',
  '/images/hero/5.webp',
  '/images/hero/6.webp',
  '/images/hero/7.webp',
  '/images/hero/8.webp',
  '/images/hero/9.webp',
  '/images/hero/10.webp',
  '/images/hero/11.webp',
  '/images/hero/12.webp',
  '/images/hero/13.webp',
];

function buildSlides() {
  return [
    // 0) WELCOME
    {
      slug: 'welcome',
      title: 'Welcome to Real Frames',
      description: 'Premium real estate media solutions across the GTA.',
      images: [heroImages[0]],
      ctaHref: '/contact',
      ctaLabel: 'Book Now',
    },

    // 1) INTERIOR / EXTERIOR PHOTOGRAPHY
    {
      slug: 'photography',
      title: 'Interior / Exterior Photography',
      description:
        'Clean, MLS-ready interior and exterior photos that make every room pop.',
      images: [heroImages[1]],
      ctaHref: '/services/photography',
      ctaLabel: 'View Service',
    },

    // 2) AERIAL PHOTOGRAPHY
    {
      slug: 'aerial-photography',
      title: 'Aerial Photography',
      description:
        'Capture curb appeal, surroundings, and views in a single hero shot.',
      images: ['/images/gallery/twilight/13.webp'],
      ctaHref: '/services/aerial-photography',
      ctaLabel: 'View Service',
    },

    // 3) TWILIGHT PHOTOGRAPHY
    {
      slug: 'twilight-photography',
      title: 'Twilight Shoots',
      description:
        'Warm, inviting images that feel like golden hour even on a cloudy day.',
      images: [heroImages[2]],
      ctaHref: '/services/twilight-shoots',
      ctaLabel: 'View Service',
    },

    // 4) VIDEO PRODUCTION
    {
      slug: 'video-production',
      title: 'Video Production',
      description:
        'Cinematic walk-throughs built from steady, well-composed footage.',
      images: [heroImages[3]],
      ctaHref: '/services/video-production',
      ctaLabel: 'View Service',
    },

    // 5) VIRTUAL STAGING
    {
      slug: 'virtual-staging',
      title: 'Virtual Staging',
      description:
        'Neutral, realistic staging that helps buyers imagine living there.',
      images: [heroImages[4]],
      ctaHref: '/services/virtual-staging',
      ctaLabel: 'View Service',
    },

    // 6) SOCIAL MEDIA REEL WITH REALTOR
    {
      slug: 'social-media-reel-with-realtor',
      title: 'Social Media Reel with Realtor',
      description:
        'Vertical-friendly sequences ready to cut into high-performing reels.',
      images: [heroImages[5]],
      ctaHref: '/services/social-media-reel-with-realtor',
      ctaLabel: 'View Service',
    },

    // 7) PACKAGES
    {
      slug: 'packages',
      title: 'Listing Packages',
      description:
        'Three clear bundles so you can price photos, video, and add-ons in seconds.',
      images: [heroImages[6]],
      ctaHref: '/packages',
      ctaLabel: 'View Packages',
    },

    // 8) PORTFOLIO
    {
      slug: 'portfolio',
      title: 'Portfolio',
      description:
        'Full property galleries that show how your listings look online.',
      images: [heroImages[7]],
      ctaHref: '/portfolio',
      ctaLabel: 'View Portfolio',
    },

    // 9) FAQ
    {
      slug: 'faq',
      title: 'FAQ & Booking Details',
      description:
        'Shoot prep, turnaround times, and what to expect on the day of your listing.',
      images: [heroImages[8]],
      ctaHref: '/faq',
      ctaLabel: 'View FAQ',
    },

    // 10) OUR STORY
    {
      slug: 'our-story',
      title: 'Our Story',
      description:
        'A small, detail-obsessed team serving the GTA, Halton, Dufferin County and surrounding areas.',
      images: [heroImages[9]],
      ctaHref: '/about',
      ctaLabel: 'Our Story',
    },

    // 11) CONTACT
    {
      slug: 'contact',
      title: 'Ready to List Your Next Property?',
      description:
        'Tell us the address and timeline, and we’ll recommend the right Real Frames package.',
      images: [heroImages[10]],
      ctaHref: '/contact',
      ctaLabel: 'Book a Shoot',
    },

    // 12) REVIEWS
    {
      slug: 'reviews',
      title: 'Agent Reviews',
      description:
        'See why local realtors trust Real Frames with their photos and video.',
      images: [heroImages[11]],
      ctaHref: '/review',
      ctaLabel: 'Read Reviews',
    },
  ];
}

// Stable export for Hero.jsx
export const slides = buildSlides();

// Keep this export so existing imports do not break.
export function getRandomizedSlides() {
  return buildSlides();
}