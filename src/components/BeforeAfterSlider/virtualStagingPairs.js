// src/components/BeforeAfterSlider/virtualStagingPairs.js

// Add more pairs anytime by pushing another object into this array.
// The /portfolio/virtual-staging page will auto-render them.

export const virtualStagingPairs = [
  {
    id: 'vs-1',
    aspectRatio: '16/9',
    beforeSrc: '/images/gallery/virtual-staging/a1.webp',
    afterSrc: '/images/gallery/virtual-staging/b1.webp',
    beforeAlt: 'Virtual staging before 1',
    afterAlt: 'Virtual staging after 1',
    initial: 0.5,
  },
  {
    id: 'vs-2',
    aspectRatio: '16/9',
    beforeSrc: '/images/gallery/virtual-staging/a2.webp',
    afterSrc: '/images/gallery/virtual-staging/b2.webp',
    beforeAlt: 'Virtual staging before 2',
    afterAlt: 'Virtual staging after 2',
    initial: 0.5,
  },
  {
    id: 'vs-3',
    aspectRatio: '16/9',
    beforeSrc: '/images/gallery/virtual-staging/a3.webp',
    afterSrc: '/images/gallery/virtual-staging/b3.webp',
    beforeAlt: 'Virtual staging before 3',
    afterAlt: 'Virtual staging after 3',
    initial: 0.5,
  },
    {
    id: 'vs-4',
    aspectRatio: '16/9',
    beforeSrc: '/images/gallery/virtual-staging/a4.webp',
    afterSrc: '/images/gallery/virtual-staging/b4.webp',
    beforeAlt: 'Virtual staging before 4',
    afterAlt: 'Virtual staging after 4',
    initial: 0.5,
  },
];

// keep this so older imports still work
export const virtualStagingDemo = virtualStagingPairs?.[0] ?? null;
