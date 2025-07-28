// src/data/services.js

export const services = [
  {
    slug: 'interior-photography',
    title: 'Interior Photography',
    short: 'Showcase rooms with natural lighting and meticulous composition.',
    description: `We capture your property’s best features with professional lighting, angles, and editing. Perfect for living rooms, bedrooms, kitchens, and more.`,
    why: `Interior shots set the emotional tone—our pro lighting and composition make buyers feel at home before they even visit.`,
    price: 99,
    images: [
      '/images/services/interior-photography-desktop.png',
      '/images/services/interior-photography-mobile.png',
    ],
  },
  {
    slug: 'exterior-photography',
    title: 'Exterior Photography',
    short: 'Capture the curb appeal and landscape of the property.',
    description: `Highlight your property’s exterior, including gardens, driveways, and outdoor living areas. High-res edits make your listing stand out.`,
    why: `First impressions matter: crisp exterior photos boost curb appeal, driving 40% more clicks on your listing.`,
    price: 79,
    images: [
      '/images/services/exterior-photography-desktop.png',
      '/images/services/exterior-photography-mobile.png',
    ],
  },
  {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    short: 'Get stunning bird’s‑eye views with professional drone shots.',
    description: `Our licensed drone pilots provide dynamic, high-impact aerial shots for a complete perspective of your property and neighborhood.`,
    why: `Aerial views give context—show off property size, neighborhood and landscaping for a competitive edge.`,
    price: 129,
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
    price: 119,
    images: [
      '/images/services/twilight-shoots-desktop.png',
      '/images/services/twilight-shoots-mobile.png',
    ],
  },
  {
    slug: 'video-production',
    title: 'Video Production',
    short: 'Cinematic real estate video creation.',
    description: `We produce high‑quality property videos—including aerial drone footage, guided walkthroughs, and professional editing—to showcase your listing dynamically.`,
    why: `Video engages buyers 5× longer than photos alone—give them a virtual walkthrough they won’t forget.`,
    price: 149,
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
    price: 199,
    images: [
      '/images/services/matterport-360-tour-desktop.png',
      '/images/services/matterport-360-tour-mobile.png',
    ],
  },
]

// Helper for easy lookup by slug
export function getServiceBySlug(slug) {
  return services.find((svc) => svc.slug === slug)
}
