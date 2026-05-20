// src/data/slides.js

const desktopHeroImages = [
  '/images/hero-desktop-final/1.webp',
  '/images/hero-desktop-final/2.webp',
  '/images/hero-desktop-final/3.webp',
  '/images/hero-desktop-final/4.webp',
  '/images/hero-desktop-final/5.webp',
  '/images/hero-desktop-final/6.webp',
  '/images/hero-desktop-final/7.webp',
  '/images/hero-desktop-final/8.webp',
  '/images/hero-desktop-final/9.webp',
  '/images/hero-desktop-final/10.webp',
  '/images/hero-desktop-final/11.webp',
  '/images/hero-desktop-final/12.webp',
  '/images/hero-desktop-final/13.webp',
];

const mobileHeroImages = [
  '/images/hero-mobile-final/1.webp',
  '/images/hero-mobile-final/2.webp',
  '/images/hero-mobile-final/3.webp',
  '/images/hero-mobile-final/4.webp',
  '/images/hero-mobile-final/5.webp',
  '/images/hero-mobile-final/6.webp',
  '/images/hero-mobile-final/7.webp',
  '/images/hero-mobile-final/8.webp',
  '/images/hero-mobile-final/9.webp',
  '/images/hero-mobile-final/10.webp',
  '/images/hero-mobile-final/11.webp',
  '/images/hero-mobile-final/12.webp',
  '/images/hero-mobile-final/13.webp',
];

function buildSlides() {
  return [
    {
      slug: 'welcome',
      title: 'Welcome to Real Frames',
      description: 'Premium real estate media solutions across the GTA.',
      images: [desktopHeroImages[0]],
      mobileImage: mobileHeroImages[0],
      ctaHref: '/contact',
      ctaLabel: 'Book Now',
    },

    {
      slug: 'photography',
      title: 'Interior / Exterior Photography',
      description:
        'Clean, MLS-ready interior and exterior photos that make every room pop.',
      images: [desktopHeroImages[1]],
      mobileImage: mobileHeroImages[1],
      ctaHref: '/services/photography',
      ctaLabel: 'View Service',
    },

    {
      slug: 'aerial-photography',
      title: 'Aerial Photography',
      description:
        'Capture curb appeal, surroundings, and views in a single hero shot.',
      images: [desktopHeroImages[2]],
      mobileImage: mobileHeroImages[2],
      ctaHref: '/services/aerial-photography',
      ctaLabel: 'View Service',
    },

    {
      slug: 'twilight-photography',
      title: 'Twilight Shoots',
      description:
        'Warm, inviting images that feel like golden hour even on a cloudy day.',
      images: [desktopHeroImages[3]],
      mobileImage: mobileHeroImages[3],
      ctaHref: '/services/twilight-shoots',
      ctaLabel: 'View Service',
    },

    {
      slug: 'video-production',
      title: 'Video Production',
      description:
        'Cinematic walk-throughs built from steady, well-composed footage.',
      images: [desktopHeroImages[4]],
      mobileImage: mobileHeroImages[4],
      ctaHref: '/services/video-production',
      ctaLabel: 'View Service',
    },

    {
      slug: 'virtual-staging',
      title: 'Virtual Staging',
      description:
        'Neutral, realistic staging that helps buyers imagine living there.',
      images: [desktopHeroImages[5]],
      mobileImage: mobileHeroImages[5],
      ctaHref: '/services/virtual-staging',
      ctaLabel: 'View Service',
    },

    {
      slug: 'social-media-reel-with-realtor',
      title: 'Social Media Reel with Realtor',
      description:
        'Vertical-friendly sequences ready to cut into high-performing reels.',
      images: [desktopHeroImages[6]],
      mobileImage: mobileHeroImages[6],
      ctaHref: '/services/social-media-reel-with-realtor',
      ctaLabel: 'View Service',
    },

    {
      slug: 'packages',
      title: 'Listing Packages',
      description:
        'Three clear bundles so you can price photos, video, and add-ons in seconds.',
      images: [desktopHeroImages[7]],
      mobileImage: mobileHeroImages[7],
      ctaHref: '/packages',
      ctaLabel: 'View Packages',
    },

    {
      slug: 'portfolio',
      title: 'Portfolio',
      description:
        'Full property galleries that show how your listings look online.',
      images: [desktopHeroImages[8]],
      mobileImage: mobileHeroImages[8],
      ctaHref: '/portfolio',
      ctaLabel: 'View Portfolio',
    },

    {
      slug: 'faq',
      title: 'FAQ & Booking Details',
      description:
        'Shoot prep, turnaround times, and what to expect on the day of your listing.',
      images: [desktopHeroImages[9]],
      mobileImage: mobileHeroImages[9],
      ctaHref: '/faq',
      ctaLabel: 'View FAQ',
    },

    {
      slug: 'our-story',
      title: 'Our Story',
      description:
        'A small, detail-obsessed team serving the GTA, Halton, Dufferin County and surrounding areas.',
      images: [desktopHeroImages[10]],
      mobileImage: mobileHeroImages[10],
      ctaHref: '/about',
      ctaLabel: 'Our Story',
    },

    {
      slug: 'contact',
      title: 'Ready to List Your Next Property?',
      description:
        'Tell us the address and timeline, and we’ll recommend the right Real Frames package.',
      images: [desktopHeroImages[11]],
      mobileImage: mobileHeroImages[11],
      ctaHref: '/contact',
      ctaLabel: 'Book a Shoot',
    },

    {
      slug: 'reviews',
      title: 'Agent Reviews',
      description:
        'See why local realtors trust Real Frames with their photos and video.',
      images: [desktopHeroImages[12]],
      mobileImage: mobileHeroImages[12],
      ctaHref: '/review',
      ctaLabel: 'Read Reviews',
    },
  ];
}

export const slides = buildSlides();

export function getRandomizedSlides() {
  return buildSlides();
}