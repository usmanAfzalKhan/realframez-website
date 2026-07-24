// src/data/slides.js

const NEW_HERO_ROOT = '/images/hero-home-2026';

const currentInteriorExteriorImage = {
  desktop: '/images/hero-desktop-final/2.webp',
  mobile: '/images/hero-mobile-final/2.webp',
};

function createNewHeroImage(name) {
  return {
    desktop: `${NEW_HERO_ROOT}/desktop/${name}.webp`,
    mobile: `${NEW_HERO_ROOT}/mobile/${name}.webp`,
  };
}

function createImagePool(imageNames, extraImages = []) {
  const imageOptions = [
    ...extraImages,
    ...imageNames.map((name) => createNewHeroImage(name)),
  ];

  const images = imageOptions.map((image) => image.desktop);
  const mobileImages = imageOptions.map((image) => image.mobile);

  return {
    images,
    mobileImages,

    // Kept for compatibility with the previous Hero setup.
    mobileImage: mobileImages[0] || null,
  };
}

function buildSlides() {
  return [
    {
      slug: 'welcome',
      title: 'Welcome to Real Frames',
      description: 'Premium real estate media solutions across the GTA.',
      ...createImagePool(['A', 'F']),
      ctaHref: '/services',
      ctaLabel: 'View Services',
    },

    {
      slug: 'photography',
      title: 'Interior / Exterior Photography',
      description:
        'Clean, MLS-ready interior and exterior photos that make every room pop.',
      ...createImagePool(
        ['B', 'C'],
        [currentInteriorExteriorImage],
      ),
      ctaHref: '/services/photography',
      ctaLabel: 'View Service',
    },

    {
      slug: 'aerial-photography',
      title: 'Aerial Photography',
      description:
        'Capture curb appeal, surroundings, and views in a single hero shot.',
      ...createImagePool(['E', 'J']),
      ctaHref: '/services/aerial-photography',
      ctaLabel: 'View Service',
    },

    {
      slug: 'twilight-photography',
      title: 'Twilight Photography',
      description:
        'Warm, inviting images that give every property a premium evening look.',
      ...createImagePool(['I', 'M', 'N']),
      ctaHref: '/services/twilight-shoots',
      ctaLabel: 'View Service',
    },

    {
      slug: 'virtual-staging',
      title: 'Virtual Staging',
      description:
        'Realistic staging that helps buyers imagine themselves living there.',
      ...createImagePool(['D', 'G', 'K']),
      ctaHref: '/services/virtual-staging',
      ctaLabel: 'View Service',
    },

    {
      slug: 'ready-to-list',
      title: 'Ready to List',
      description:
        'Tell us the address and timeline, and we’ll help you choose the right package.',
      ...createImagePool(['H', 'L']),
      ctaHref: '/contact',
      ctaLabel: 'Book a Shoot',
    },
  ];
}

export const slides = buildSlides();

// Kept so another file importing this function will not break.
export function getRandomizedSlides() {
  return buildSlides();
}