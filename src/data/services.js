export const services = [
{
  slug: 'photography',
  title: 'Interior / Exterior Photography',
  short: 'Showcase rooms with pro lighting and boost curb appeal with crisp exterior shots.',
  description: `We capture the best of both worlds:

Interior: professional lighting, angles, and HDR editing to highlight living rooms, bedrooms, kitchens, and more.

Exterior: crisp, high-resolution photos that boost curb appeal by showcasing gardens, driveways, and landscaping.`,
  why: `Combining interior and exterior images tells the full story of your property—buyers feel at home inside before they even step through the door, and are won over by stunning curb appeal outside.`,
  price: 149.99,
  // used on the Services listing cards (exterior previews)
  cardImages: [
    '/images/services/exterior-photography-desktop.png',
    '/images/services/exterior-photography-mobile.png',
  ],
  // used on the detail page (interior shots)
  images: [
    '/images/services/exterior-photography-desktop.png',
    '/images/services/exterior-photography-mobile.png',
  ],
},

  {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    short: 'Get stunning bird’s-eye views with professional drone shots.',
    description: `Our licensed drone pilots provide dynamic, high-impact aerial shots for a complete perspective of your property and neighborhood.`,
    why: `Aerial views give context—show off property size, neighborhood, and landscaping for a competitive edge.`,
    price: 79.99,
    images: [
      '/images/services/aerial-photography-desktop.png',
      '/images/services/aerial-photography-mobile.png',
    ],
  },
  {
    slug: 'twilight-shoots',
    title: 'Twilight Shoots',
    short: 'Create dramatic, warm images shot at dusk for extra allure.',
    description: `Twilight photography captures your property in beautiful evening light, increasing its emotional appeal for potential buyers.`,
    why: `Dusk images add drama and warmth—perfect for creating an emotional connection with potential buyers.`,
    price: 79.99,
    images: [
      '/images/services/twilight-shoots-desktop.png',
      '/images/services/twilight-shoots-mobile.png',
    ],
  },
  {
    slug: 'video-production',
    title: 'Video Production',
    short: 'Cinematic real estate video creation.',
    description: `We produce high-quality property videos—including aerial drone footage, guided walkthroughs, and professional editing—to showcase your listing dynamically.`,
    why: `Video engages buyers 5× longer than photos alone—give them a virtual walkthrough they won’t forget.`,
    price: 149.99,
    images: [
      '/images/services/video-production-desktop.png',
      '/images/services/video-production-mobile.png',
    ],
  },
  {
    slug: 'matterport-360-tour',
    title: '360° Virtual Tours',
    short: 'Immersive Matterport 360 virtual walkthroughs.',
    description: `Create interactive 3D virtual tours of your property for an immersive online experience, capturing every angle and detail with Matterport technology.`,
    why: `360° tours keep prospects on your page 3× longer—let them explore every corner at their own pace.`,
    price: 149.99,
    images: [
      '/images/services/matterport-360-tour-desktop.png',
      '/images/services/matterport-360-tour-mobile.png',
    ],
  },
  {
    slug: 'drone-aerial-video',
    title: 'Aerial Video',
    short: 'Get stunning bird’s-eye video with professional drone footage.',
    description: `Our licensed drone pilots provide dynamic, high-impact aerial videos for a complete perspective of your property and neighborhood.`,
    why: `Aerial videos give context—show off property size, neighborhood, and landscaping for a competitive edge.`,
    price: 99.99,
    images: [
      '/images/services/aerial-video-desktop.png',
      '/images/services/aerial-video-mobile.png',
    ],
  },
  {
    slug: 'virtual-staging',
    title: 'Virtual Staging',
    short: 'Enhance empty rooms with realistic virtual furniture.',
    description: `Transform vacant spaces with our virtual staging service, adding realistic furniture and decor to help buyers visualize the potential of each room.`,
    why: `Virtual staging helps buyers see the possibilities—empty rooms become inviting spaces that sell faster.`,
    price: 19.99 + '/ image',
    images: [
      '/images/services/virtual-staging-desktop.png',
      '/images/services/virtual-staging-mobile.png',
    ],
  },
  {
    slug: 'social-media-reel-with-realtor',
    title: 'Social Media Reel with Realtor',
    short: 'Professional social-media-optimized video reel featuring the realtor and property.',
    description: `We create a dynamic, shareable reel tailored for Instagram, Facebook, and TikTok, highlighting your property’s best angles and your realtor’s insights.`,
    why: `Social media reels boost engagement and reach new audiences—drive more inquiries with a high-impact video reel.`,
    price: 129.99,
    images: [
      '/images/services/social-media-reel-desktop.png',
      '/images/services/social-media-reel-desktop.png',
    ],
  },
];

// Helper for detail lookup
export function getServiceBySlug(slug) {
  return services.find((svc) => svc.slug === slug);
}
