// src/data/slides.js
// Build hero slides directly from galleryImages so we don't typo any paths.

import { galleriesBySlug } from './galleryImages';

const eastMall = galleriesBySlug['137-366-the-east-mall'];
const sandhill = galleriesBySlug['13-sandhill-cres'];
const sandway = galleriesBySlug['16-sandway-cres'];
const manorcrest = galleriesBySlug['20-manorcrest'];
const pandora = galleriesBySlug['139-pandora-cir'];
const dayspring = galleriesBySlug['203-4-dayspring-circle'];
const rowntree = galleriesBySlug['416-5-rowntree-rd'];
const finch = galleriesBySlug['2101-3045-finch-ave'];

const eastMallImgs = eastMall?.images ?? [];
const sandhillImgs = sandhill?.images ?? [];
const sandwayImgs = sandway?.images ?? [];
const manorcrestImgs = manorcrest?.images ?? [];
const pandoraImgs = pandora?.images ?? [];
const dayspringImgs = dayspring?.images ?? [];
const rowntreeImgs = rowntree?.images ?? [];
const finchImgs = finch?.images ?? [];

// 👇 renamed so ESLint doesn't think it's a React hook
const pickImages = (...paths) => paths.filter(Boolean);

export const slides = [
  // 0) WELCOME
  {
    slug: 'welcome',
    title: 'Welcome to Real Frames',
    description: 'Premium real estate media solutions across the GTA.',
    // all of these are valid hero candidates – you asked to use all of them
    images: pickImages(
      // 13 Sandhill
      sandhillImgs[0], // 13-Sandhill_01.webp
      sandhillImgs[1], // 13-Sandhill_02.webp
      sandhillImgs[2], // 13-Sandhill_03.webp

      // 16 Sandway
      sandwayImgs[0], // 16-Sandway_01.webp
      sandwayImgs[1], // 16-Sandway_02.webp
      sandwayImgs[4], // 16-Sandway_05.webp

      // Manorcrest
      manorcrestImgs[0], // Manorcrest01.webp
      manorcrestImgs[4], // Manorcrest06.webp

      // Pandora
      pandoraImgs[0], // 1.webp

      // Dayspring
      dayspringImgs[0], // 1.webp

      // Rowntree
      rowntreeImgs[0], // 1.webp
      rowntreeImgs[1], // 2.webp
      rowntreeImgs[2], // 3.webp

      // Finch
      finchImgs[1] // 2.webp
    ),
    ctaHref: '/services',
    ctaLabel: 'View Services',
  },

  // 1) INTERIOR / EXTERIOR PHOTOGRAPHY
  {
    slug: 'photography',
    title: 'Interior / Exterior Photography',
    description:
      'Clean, MLS-ready interior and exterior photos that make every room pop.',
    images: pickImages(
      sandhillImgs[4], // 13-Sandhill_05.webp
      sandhillImgs[5], // 13-Sandhill_06.webp
      sandhillImgs[6] // 13-Sandhill_07.webp
    ),
    ctaHref: '/services/photography',
    ctaLabel: 'View Service',
  },

  // 2) AERIAL PHOTOGRAPHY
  {
    slug: 'aerial-photography',
    title: 'Aerial Photography',
    description:
      'Capture curb appeal, surroundings, and views in a single hero shot.',
    images: pickImages(
      // Manorcrest (aerial-ish angles)
      manorcrestImgs[1], // Manorcrest03.webp
      manorcrestImgs[3], // Manorcrest05.webp

      // Dayspring 2–5
      dayspringImgs[1], // 2.webp
      dayspringImgs[2], // 3.webp
      dayspringImgs[3], // 4.webp
      dayspringImgs[4], // 5.webp

      // Rowntree balcony / view
      rowntreeImgs[1] // 2.webp
    ),
    ctaHref: '/services/aerial-photography',
    ctaLabel: 'View Service',
  },

  // 3) TWILIGHT PHOTOGRAPHY
  {
    slug: 'twilight-photography',
    title: 'Twilight Shoots',
    description:
      'Warm, inviting images that feel like golden hour even on a cloudy day.',
    images: pickImages(
      // you specified Finch 7.webp for this slide
      finchImgs[6] // 7.webp
    ),
    // 👇 if your actual route is different, change this string
    ctaHref: '/services/twilight-shoots',
    ctaLabel: 'View Service',
  },

  // 4) VIDEO PRODUCTION
  {
    slug: 'video-production',
    title: 'Video Production',
    description:
      'Cinematic walk-throughs built from steady, well-composed footage.',
    images: pickImages(
      eastMallImgs[0],
      eastMallImgs[1],
      eastMallImgs[2],
      eastMallImgs[3],
      eastMallImgs[4],
      eastMallImgs[5]
    ),
    ctaHref: '/services/video-production',
    ctaLabel: 'View Service',
  },

  // 5) 360° VIRTUAL TOURS
  {
    slug: 'matterport-360-tour',
    title: '360° Virtual Tours',
    description:
      'Room-to-room coverage that lets buyers explore every corner on their phone.',
    images: pickImages(
      dayspringImgs[5],
      dayspringImgs[6],
      dayspringImgs[7],
      dayspringImgs[8],
      dayspringImgs[9],
      dayspringImgs[10],
      sandhillImgs[8],
      sandhillImgs[9]
    ),
    // 👇 if your actual route is different, change this string
    ctaHref: '/services/matterport-360-tour',
    ctaLabel: 'View Service',
  },

  // 6) AERIAL VIDEO – same folders as aerial photos but NO repeated frames
  {
    slug: 'aerial-video',
    title: 'Aerial Video',
    description:
      'Smooth balcony and exterior angles that show off height, views, and surroundings.',
    images: pickImages(
      // Rowntree – different frames than aerial-photography
      rowntreeImgs[3], // 4.webp
      rowntreeImgs[4], // 5.webp
      rowntreeImgs[5], // 6.webp
      rowntreeImgs[6], // 7.webp

      // Dayspring – different frames than aerial-photography
      dayspringImgs[5], // 6.webp
      dayspringImgs[6], // 7.webp
      dayspringImgs[7], // 8.webp
      dayspringImgs[8] // 9.webp
    ),
    // 👇 if your actual route is different, change this string
    ctaHref: '/services/drone-aerial-video',
    ctaLabel: 'View Service',
  },

  // 7) VIRTUAL STAGING
  {
    slug: 'virtual-staging',
    title: 'Virtual Staging',
    description:
      'Neutral, realistic staging that helps buyers imagine living there.',
    images: pickImages(
      pandoraImgs[1],
      pandoraImgs[2],
      sandwayImgs[8],
      sandwayImgs[9],
      sandhillImgs[10],
      sandhillImgs[11]
    ),
    ctaHref: '/services/virtual-staging',
    ctaLabel: 'View Service',
  },

  // 8) SOCIAL MEDIA REEL WITH REALTOR
  {
    slug: 'social-media-reel-with-realtor',
    title: 'Social Media Reel with Realtor',
    description:
      'Vertical-friendly sequences ready to cut into high-performing reels.',
    images: pickImages(
      finchImgs[1], // 2.webp
      finchImgs[2],
      finchImgs[3],
      sandhillImgs[3],
      sandhillImgs[7],
      rowntreeImgs[2]
    ),
    ctaHref: '/services/social-media-reel-with-realtor',
    ctaLabel: 'View Service',
  },

  // ==== NEW: PAGE-BASED SLIDES (using the same gallery images) ====

  // 9) PACKAGES
  {
    slug: 'packages',
    title: 'Listing Packages',
    description:
      'Three clear bundles so you can price photos, video, and add-ons in seconds.',
    images: pickImages(sandwayImgs[2], sandwayImgs[3], manorcrestImgs[6]),
    ctaHref: '/packages',
    ctaLabel: 'View Packages',
  },

  // 10) PORTFOLIO
  {
    slug: 'portfolio',
    title: 'Portfolio',
    description:
      'Full property galleries that show how your listings look online.',
    images: pickImages(
      eastMallImgs[10] ?? eastMallImgs[0],
      sandhillImgs[12],
      rowntreeImgs[10]
    ),
    ctaHref: '/portfolio',
    ctaLabel: 'View Portfolio',
  },

  // 11) FAQ
  {
    slug: 'faq',
    title: 'FAQ & Booking Details',
    description:
      'Shoot prep, turnaround times, and what to expect on the day of your listing.',
    images: pickImages(pandoraImgs[5], dayspringImgs[12]),
    ctaHref: '/faq',
    ctaLabel: 'View FAQ',
  },

  // 12) OUR STORY
  {
    slug: 'our-story',
    title: 'Our Story',
    description:
      'A small, detail-obsessed team serving the GTA, Halton, Dufferin County and surrounding areas.',
    images: pickImages(sandhillImgs[15], manorcrestImgs[10]),
    ctaHref: '/about',
    ctaLabel: 'Our Story',
  },

  // 13) CONTACT
  {
    slug: 'contact',
    title: 'Ready to List Your Next Property?',
    description:
      'Tell us the address and timeline, and we’ll recommend the right Real Frames package.',
    images: pickImages(rowntreeImgs[12], finchImgs[10]),
    ctaHref: '/contact',
    ctaLabel: 'Book a Shoot',
  },

  // 14) REVIEWS
  {
    slug: 'reviews',
    title: 'Agent Reviews',
    description:
      'See why local realtors trust Real Frames with their photos and video.',
    images: pickImages(finchImgs[12], sandhillImgs[20]),
    ctaHref: '/review',
    ctaLabel: 'Read Reviews',
  },
];
