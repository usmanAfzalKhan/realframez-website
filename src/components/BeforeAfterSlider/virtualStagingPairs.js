// TEMP (works right now):
// Using your existing Virtual Staging service images as placeholders.
// Later, replace these with real before/after virtual-staging images.

export const virtualStagingPairs = [
  {
    id: 'virtual-staging-temp',
    aspectRatio: '16/9',
    beforeSrc: '/images/services/virtual-staging-desktop.webp',
    afterSrc: '/images/services/virtual-staging-mobile.webp',
    beforeAlt: 'Virtual staging (temporary demo - before)',
    afterAlt: 'Virtual staging (temporary demo - after)',
    initial: 0.5,
  },
]

export const virtualStagingDemo = virtualStagingPairs?.[0] ?? null
