'use client'

import Link from 'next/link'
import styles from '../../app/page.module.scss'

export default function HomeServicesSection() {
  return (
    <>
      {/* SERVICES */}
      <h3 className={styles.servicesHeading}>Our Services</h3>
      <ul className={styles.servicesGrid} role="list" aria-label="Popular services">
        <li className={`${styles.serviceCard} ${styles.photography}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Interior / Exterior</h3>
            <p className={styles.serviceDesc}>Clean angles, bright edits, curb appeal.</p>
          </div>
          <Link href="/services/photography" className={styles.serviceLink}>
            View Details
          </Link>
        </li>

        <li className={`${styles.serviceCard} ${styles.aerial}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Aerial Photography</h3>
            <p className={styles.serviceDesc}>Lot, surroundings, neighbourhood context.</p>
          </div>
          <Link href="/services/aerial-photography" className={styles.serviceLink}>
            View Details
          </Link>
        </li>

        <li className={`${styles.serviceCard} ${styles.twilight}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Twilight Shoots</h3>
            <p className={styles.serviceDesc}>Warm, premium, scroll-stopping dusk.</p>
          </div>
          <Link href="/services/twilight-shoots" className={styles.serviceLink}>
            View Details
          </Link>
        </li>

        <li className={`${styles.serviceCard} ${styles.video}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Video Production</h3>
            <p className={styles.serviceDesc}>Cinematic walk-throughs + drone.</p>
          </div>
          <Link href="/services/video-production" className={styles.serviceLink}>
            View Details
          </Link>
        </li>

        <li className={`${styles.serviceCard} ${styles.virtualStaging}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Virtual Staging</h3>
            <p className={styles.serviceDesc}>Empty rooms → lived-in spaces.</p>
          </div>
          <Link href="/services/virtual-staging" className={styles.serviceLink}>
            View Details
          </Link>
        </li>

        <li className={`${styles.serviceCard} ${styles.socialReel}`}>
          <div className={styles.serviceMedia} aria-hidden="true" />
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>Social Media Reel w/ Realtor</h3>
            <p className={styles.serviceDesc}>Platform-ready promo reel.</p>
          </div>
          <Link href="/services/social-media-reel-with-realtor" className={styles.serviceLink}>
            View Details
          </Link>
        </li>
      </ul>
    </>
  )
}
