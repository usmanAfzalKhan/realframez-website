'use client'

import styles from '../../app/page.module.scss'

export default function HomeIntroSection() {
  return (
    <>
      <h2 id="intro-title">Elevate Your Property’s Story</h2>

      <p className={styles.copy}>
        Discover how our premium real estate photography—interior, exterior, aerial, and twilight—makes listings
        stand out and sell fast. Clean compositions, true-to-life colours, and MLS-ready exports mean you can publish
        right away.
      </p>

      <div className={styles.whySection}>
        <p className={styles.sectionLabel}>WHY REALFRAMES</p>
        <p className={styles.why}>
          RealFrames is built for GTA realtors and property marketers who need fast, consistent media that actually
          flatters the space.
        </p>
        <p className={styles.why}>
          Photo, aerial, twilight, video, and virtual staging stay in one flow—so you can send the listing the same
          day or next day.
        </p>
      </div>
    </>
  )
}
