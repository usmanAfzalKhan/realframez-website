// src/data/serviceGalleries.js

// 🎬 Service galleries (same shape as property galleries)
// - slug: used in URL => /portfolio/[slug]
// - title: shown on cards/headings
// - cardDescription: one clean line (Title Case, no period)
// - coverImage: thumbnail used on cards/headings
// - images: still images
// - optional: video, videos, videoPoster, isPortraitVideo

const PLACEHOLDER = [
  '/images/gallery/3309-joliffe-ave/1.webp',
  '/images/gallery/3309-joliffe-ave/2.webp',
  '/images/gallery/3309-joliffe-ave/3.webp',
  '/images/gallery/3309-joliffe-ave/4.webp',
  '/images/gallery/3309-joliffe-ave/5.webp',
  '/images/gallery/3309-joliffe-ave/6.webp',
];

// ✅ the exact two videos (as objects so they can't "merge" / look duplicated)
const TWO_VIDEOS = [
  {
    src: '/images/gallery/137-366-the-east-mall/137-366-The-EastMall.mp4',
    poster: '/images/gallery/137-366-the-east-mall/137-EastMall_01.webp',
    isPortraitVideo: false,
  },
  {
    src: '/images/gallery/8-levida-st/8-Levida.mp4',
    poster: '/images/gallery/8-levida-st/8-Levida-poster.webp',
    isPortraitVideo: true,
  },
];

export const servicesBySlug = {
  'interior-exterior-photography': {
    slug: 'interior-exterior-photography',
    title: 'Interior / Exterior Photography',
    cardDescription: 'Crisp Listing Photos With Clean, True-To-Life Detail',
    coverImage: '/images/gallery/interior-exterior/1.webp',
    images: [
      '/images/gallery/interior-exterior/1.webp',
      '/images/gallery/interior-exterior/10.webp',
      '/images/gallery/interior-exterior/11.webp',
      '/images/gallery/interior-exterior/12.webp',
      '/images/gallery/interior-exterior/13.webp',
      '/images/gallery/interior-exterior/14.webp',
      '/images/gallery/interior-exterior/15.webp',
      '/images/gallery/interior-exterior/16.webp',
      '/images/gallery/interior-exterior/17.webp',
      '/images/gallery/interior-exterior/18.webp',
      '/images/gallery/interior-exterior/19.webp',
      '/images/gallery/interior-exterior/2.webp',
      '/images/gallery/interior-exterior/20.webp',
      '/images/gallery/interior-exterior/3.webp',
      '/images/gallery/interior-exterior/4.webp',
      '/images/gallery/interior-exterior/5.webp',
      '/images/gallery/interior-exterior/6.webp',
      '/images/gallery/interior-exterior/7.webp',
      '/images/gallery/interior-exterior/8.webp',
      '/images/gallery/interior-exterior/9.webp',
    ],
  },

  'aerial-photography': {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    cardDescription: 'Premium Drone Angles That Highlight Location And Scale',
    coverImage: '/images/gallery/aerial/1.webp',
    images: [
      '/images/gallery/aerial/1.webp',
      '/images/gallery/aerial/10.webp',
      '/images/gallery/aerial/11.webp',
      '/images/gallery/aerial/12.webp',
      '/images/gallery/aerial/13.webp',
      '/images/gallery/aerial/14.webp',
      '/images/gallery/aerial/15.webp',
      '/images/gallery/aerial/16.webp',
      '/images/gallery/aerial/17.webp',
      '/images/gallery/aerial/18.webp',
      '/images/gallery/aerial/19.webp',
      '/images/gallery/aerial/2.webp',
      '/images/gallery/aerial/20.webp',
      '/images/gallery/aerial/21.webp',
      '/images/gallery/aerial/22.webp',
      '/images/gallery/aerial/23.webp',
      '/images/gallery/aerial/24.webp',
      '/images/gallery/aerial/25.webp',
      '/images/gallery/aerial/26.webp',
      '/images/gallery/aerial/27.webp',
      '/images/gallery/aerial/28.webp',
      '/images/gallery/aerial/29.webp',
      '/images/gallery/aerial/3.webp',
      '/images/gallery/aerial/30.webp',
      '/images/gallery/aerial/31.webp',
      '/images/gallery/aerial/32.webp',
      '/images/gallery/aerial/33.webp',
      '/images/gallery/aerial/34.webp',
      '/images/gallery/aerial/35.webp',
      '/images/gallery/aerial/36.webp',
      '/images/gallery/aerial/37.webp',
      '/images/gallery/aerial/38.webp',
      '/images/gallery/aerial/39.webp',
      '/images/gallery/aerial/4.webp',
      '/images/gallery/aerial/40.webp',
      '/images/gallery/aerial/41.webp',
      '/images/gallery/aerial/42.webp',
      '/images/gallery/aerial/43.webp',
      '/images/gallery/aerial/44.webp',
      '/images/gallery/aerial/5.webp',
      '/images/gallery/aerial/6.webp',
      '/images/gallery/aerial/7.webp',
      '/images/gallery/aerial/8.webp',
      '/images/gallery/aerial/9.webp',
    ],
  },

  'twilight-shoots': {
    slug: 'twilight-shoots',
    title: 'Twilight Shoots',
    cardDescription: 'Golden-Hour Exteriors With A Luxury, High-End Feel',
    coverImage: '/images/gallery/twilight/1.webp',
    images: [
      '/images/gallery/twilight/1.webp',
      '/images/gallery/twilight/10.webp',
      '/images/gallery/twilight/11.webp',
      '/images/gallery/twilight/12.webp',
      '/images/gallery/twilight/13.webp',
      '/images/gallery/twilight/14.webp',
      '/images/gallery/twilight/15.webp',
      '/images/gallery/twilight/16.webp',
      '/images/gallery/twilight/17.webp',
      '/images/gallery/twilight/18.webp',
      '/images/gallery/twilight/19.webp',
      '/images/gallery/twilight/2.webp',
      '/images/gallery/twilight/20.webp',
      '/images/gallery/twilight/21.webp',
      '/images/gallery/twilight/22.webp',
      '/images/gallery/twilight/23.webp',
      '/images/gallery/twilight/24.webp',
      '/images/gallery/twilight/25.webp',
      '/images/gallery/twilight/3.webp',
      '/images/gallery/twilight/4.webp',
      '/images/gallery/twilight/5.webp',
      '/images/gallery/twilight/6.webp',
      '/images/gallery/twilight/7.webp',
      '/images/gallery/twilight/8.webp',
      '/images/gallery/twilight/9.webp',
    ],
  },

  'video-production': {
    slug: 'video-production',
    title: 'Video Production',
    cardDescription: 'Cinematic Walkthroughs Designed To Boost Showings',

    // ✅ no placeholder images
    coverImage: '/images/gallery/137-366-the-east-mall/137-EastMall_01.webp',
    images: [],

    // ✅ BOTH videos (original order: EastMall first, Levida second)
    videos: TWO_VIDEOS,

    // ✅ keep this so any older code that expects "video" still works
    video: '/images/gallery/137-366-the-east-mall/137-366-The-EastMall.mp4',
    videoPoster: '/images/gallery/137-366-the-east-mall/137-EastMall_01.webp',
    isPortraitVideo: false,
  },

  'virtual-staging': {
    slug: 'virtual-staging',
    title: 'Virtual Staging',
    cardDescription: 'Realistic Before-And-After Transformations That Sell The Space',
    coverImage: '/images/gallery/virtual-staging/1.webp',
    images: [
      '/images/gallery/virtual-staging/1.webp',
      '/images/gallery/virtual-staging/10.webp',
      '/images/gallery/virtual-staging/14.webp',
      '/images/gallery/virtual-staging/15.webp',
      '/images/gallery/virtual-staging/17.webp',
      '/images/gallery/virtual-staging/18.webp',
      '/images/gallery/virtual-staging/19.webp',
      '/images/gallery/virtual-staging/20.webp',
      '/images/gallery/virtual-staging/21.webp',
      '/images/gallery/virtual-staging/22.webp',
      '/images/gallery/virtual-staging/4.webp',
      '/images/gallery/virtual-staging/5.webp',
      '/images/gallery/virtual-staging/8.webp',
      '/images/gallery/virtual-staging/9.webp',
      '/images/gallery/virtual-staging/a1.webp',
      '/images/gallery/virtual-staging/a2.webp',
      '/images/gallery/virtual-staging/a3.webp',
      '/images/gallery/virtual-staging/a4.webp',
      '/images/gallery/virtual-staging/b1.webp',
      '/images/gallery/virtual-staging/b2.webp',
      '/images/gallery/virtual-staging/b3.webp',
      '/images/gallery/virtual-staging/b4.webp',
    ],
  },

  'social-media-reel-with-realtor': {
    slug: 'social-media-reel-with-realtor',
    title: 'Social Media Reel With Realtor',
    cardDescription: 'Scroll-Stopping Reels Built For Reach And Leads',

    // ✅ no placeholder images
    coverImage: '/images/gallery/137-366-the-east-mall/137-EastMall_01.webp',
    images: [],

    // ✅ SAME two videos, but REVERSED order (Levida first, EastMall second)
    videos: [TWO_VIDEOS[1], TWO_VIDEOS[0]],

    // ✅ fallback single video
    video: '/images/gallery/8-levida-st/8-Levida.mp4',
    videoPoster: '/images/gallery/8-levida-st/1.webp',
    isPortraitVideo: true,
  },
};

export const serviceList = Object.values(servicesBySlug);
