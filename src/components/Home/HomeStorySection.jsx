'use client'

import Link from 'next/link'
import styles from '../../app/page.module.scss'

export default function HomeStorySection() {
  return (
    <div className={styles.storySection}>
      {/* Our Story */}
      <h3 className={styles.storyHeading}>Our Story</h3>
      <p className={styles.storyCopy}>
        RealFrames started as a one-person photo service in the GTA, shooting condos and townhomes, and grew into
        a full real estate media partner — interiors, exteriors, aerials, video, and virtual staging — so agents
        don’t have to juggle 5 vendors.
      </p>
      <Link href="/about" className={styles.storyBtn}>
        Continue getting to know us →
      </Link>
    </div>
  )
}
