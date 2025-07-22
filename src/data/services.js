// src/data/services.js

export const services = [
  {
    slug: 'interior-photography',
    title: 'Interior Photography',
    short: 'Showcase rooms with natural lighting and meticulous composition.',
    description: `We capture your property’s best features with professional lighting, angles, and editing. Perfect for living rooms, bedrooms, kitchens, and more.`,
    price: 99,
    images: [
      '/images/services/interior-1.jpg',
      '/images/services/interior-2.jpg',
      '/images/services/interior-3.jpg',
    ],
  },
  {
    slug: 'exterior-photography',
    title: 'Exterior Photography',
    short: 'Capture the curb appeal and landscape of the property.',
    description: `Highlight your property’s exterior, including gardens, driveways, and outdoor living areas. High-res edits make your listing stand out.`,
    price: 79,
    images: [
      '/images/services/exterior-1.jpg',
      '/images/services/exterior-2.jpg',
      '/images/services/exterior-3.jpg',
    ],
  },
  {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    short: 'Get stunning bird’s-eye views with professional drone shots.',
    description: `Our licensed drone pilots provide dynamic, high-impact aerial shots for a complete perspective of your property and neighborhood.`,
    price: 129,
    images: [
      '/images/services/aerial-1.jpg',
      '/images/services/aerial-2.jpg',
      '/images/services/aerial-3.jpg',
    ],
  },
  {
    slug: 'twilight-shoots',
    title: 'Twilight Shoots',
    short: 'Create dramatic, warm images shot at dusk for extra allure.',
    description: `Twilight photography captures your property in beautiful evening light, increasing its emotional appeal for potential buyers.`,
    price: 119,
    images: [
      '/images/services/twilight-1.jpg',
      '/images/services/twilight-2.jpg',
      '/images/services/twilight-3.jpg',
    ],
  },
];

// Helper for easy lookup by slug
export function getServiceBySlug(slug) {
  return services.find((svc) => svc.slug === slug);
}
