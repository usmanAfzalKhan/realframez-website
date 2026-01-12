// src/data/serviceGalleries.js

// 🎬 Service galleries (same shape as property galleries)
// - slug: used in URL => /portfolio/[slug]
// - title: shown on cards/headings
// - cardDescription: one clean line (Title Case, no period)
// - coverImage: thumbnail used on cards
// - images: placeholder media for now (swap later per service)
// - optional: video, videoPoster, isPortraitVideo

const PLACEHOLDER = [
  '/images/gallery/3309-joliffe-ave/1.webp',
  '/images/gallery/3309-joliffe-ave/2.webp',
  '/images/gallery/3309-joliffe-ave/3.webp',
  '/images/gallery/3309-joliffe-ave/4.webp',
  '/images/gallery/3309-joliffe-ave/5.webp',
  '/images/gallery/3309-joliffe-ave/6.webp',
];

export const servicesBySlug = {
  'interior-exterior-photography': {
    slug: 'interior-exterior-photography',
    title: 'Interior / Exterior Photography',
    cardDescription: 'Crisp Listing Photos With Clean, True-To-Life Detail',
    coverImage: PLACEHOLDER[0],
    images: PLACEHOLDER,
  },

  'aerial-photography': {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    cardDescription: 'Premium Drone Angles That Highlight Location And Scale',
    coverImage: PLACEHOLDER[1],
    images: PLACEHOLDER,
  },

  'twilight-shoots': {
    slug: 'twilight-shoots',
    title: 'Twilight Shoots',
    cardDescription: 'Golden-Hour Exteriors With A Luxury, High-End Feel',
    coverImage: PLACEHOLDER[2],
    images: PLACEHOLDER,
  },

  'video-production': {
    slug: 'video-production',
    title: 'Video Production',
    cardDescription: 'Cinematic Walkthroughs Designed To Boost Showings',
    coverImage: PLACEHOLDER[3],
    images: PLACEHOLDER,
    // video: '/videos/example.mp4',
    // videoPoster: PLACEHOLDER[3],
    // isPortraitVideo: false,
  },

  'virtual-staging': {
    slug: 'virtual-staging',
    title: 'Virtual Staging',
    cardDescription: 'Realistic Before-And-After Transformations That Sell The Space',
    coverImage: PLACEHOLDER[4],
    images: PLACEHOLDER,
  },

  'social-media-reel-with-realtor': {
    slug: 'social-media-reel-with-realtor',
    title: 'Social Media Reel With Realtor',
    cardDescription: 'Scroll-Stopping Reels Built For Reach And Leads',
    coverImage: PLACEHOLDER[5],
    images: PLACEHOLDER,
    // isPortraitVideo: true,
  },
};

export const serviceList = Object.values(servicesBySlug);
