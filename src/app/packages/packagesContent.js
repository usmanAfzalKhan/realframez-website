// src/app/packages/packagesContent.js

const packagesContent = {
  heading: 'Our Packages',

  sections: [
    {
      /*
       * Keep the old ID internally so existing links such as
       * /contact?package=essential continue working.
       */
      id: 'essential',
      styleKey: 'essential',

      title: 'Marketing Essential',
      price: '$199.99',
      priceValue: 199.99,
      badge: null,

      features: [
        'Premium HDR Images',
        'MLS-Ready Images',
        '6–10 Hour Delivery',
      ],

      /*
       * Photography remains part of the package internally,
       * even though it is removed from the A La Carte list.
       */
      includes: ['photography'],

      addon: {
        label: 'Agent-On-Camera Social Media Reel',
        price: '$99.99',
        serviceSlug: 'social-media-reel-with-realtor',
      },
    },

    {
      id: 'silver',
      styleKey: 'silver',

      title: 'Multi Media',
      price: '$279.99',
      priceValue: 279.99,
      badge: 'Popular',

      features: [
        'Premium HDR Images',
        'Aerial Photography',
        'MLS-Ready Images',
      ],

      includes: [
        'photography',
        'aerial-photography',
      ],

      addon: {
        label: 'Agent-On-Camera Social Media Reel',
        price: '$99.99',
        serviceSlug: 'social-media-reel-with-realtor',
      },
    },

    {
      id: 'platinum',
      styleKey: 'platinum',

      title: 'Media Pro',
      price: '$499.99',
      priceValue: 499.99,
      badge: 'Best Value',

      features: [
        'Premium HDR Images',
        'Aerial Photography',
        'Cinematic Walkthrough Video',
        'MLS-Ready Images',
        '4–8 Hour Delivery',
      ],

      includes: [
        'photography',
        'aerial-photography',
        'video-production',
      ],

      addon: {
        label: 'Agent-On-Camera Social Media Reel',
        price: '$99.99',
        serviceSlug: 'social-media-reel-with-realtor',
      },
    },
  ],
};

export default packagesContent;