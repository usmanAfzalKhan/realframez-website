'use client'

import styles from '../../app/page.module.scss'

export default function HomeIntroSection() {
  return (
    <>
      <h2 id="intro-title">Elevate Your Property’s Story</h2>

      <p className={styles.copy}>
        Most listings don’t have a marketing problem. They have a presentation problem.
      </p>

      <p className={styles.copy}>
        We fix that.
      </p>

      <p className={styles.copy}>
        Photography, video, and virtual staging designed to show your listing the way it should have been presented from the start.
      </p>

      <p className={styles.copy}>
        When it’s done right, the difference is obvious.
      </p>
    </>
  )
}