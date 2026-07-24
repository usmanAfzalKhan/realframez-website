// src/app/packages/packagesContent.js

const packagesContent = {
  heading: 'Our Packages',

  sections: [
    {
      id: 'essential',
      styleKey: 'essential',

      tier: 'Essential',
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
       * Service slugs automatically selected on the contact page.
       * Marketing Essential includes photography only.
       */
      includes: ['photography'],

      addon:
        'Agent-On-Camera Social Media Reel — Just $79.99',
    },

    {
      id: 'silver',
      styleKey: 'silver',

      tier: 'Silver',
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

      addon:
        'Agent-On-Camera Social Media Reel — Just $79.99',
    },

    {
      id: 'platinum',
      styleKey: 'platinum',

      tier: 'Platinum',
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

      addon:
        'Agent-On-Camera Social Media Reel — Just $79.99',
    },
  ],
};

export default packagesContent;