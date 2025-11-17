'use client'

import Image from 'next/image'
import styles from '../../app/page.module.scss'

export default function HomeSocialStrip() {
  return (
    <div className={styles.socialStrip} aria-label="Follow RealFrames on social">
      {/* Social strip */}
      <div className={styles.socialBrand}>
        <Image
          src="/images/logo.png"
          alt="RealFrames"
          width={44}
          height={44}
          className={styles.socialLogo}
        />
        <div className={styles.socialMeta}>
          <span className={styles.socialLabel}>Follow RealFrames</span>
          <h3 className={styles.socialHeading}>BTS, edits &amp; new shoots</h3>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <a
          href="https://www.instagram.com/realframes.ca/"
          className={`${styles.socialPill} ${styles.socialIg}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.socialIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.75-3.2a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
            </svg>
          </span>
          <span>@realframes.ca</span>
        </a>
        <a
          href="https://www.tiktok.com/@realframes.ca?is_from_webapp=1&sender_device=pc"
          className={`${styles.socialPill} ${styles.socialTt}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.socialIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5 3c.2 1.5 1.3 3.2 3.6 3.3v2.4c-1.2 0-2.3-.3-3.6-1v5.3c0 3.2-2.1 4.5-4.2 4.5a4 4 0 0 1-4.1-4c0-2.3 1.8-3.4 3.6-3.4.4 0 .8.1 1.1.2v2.4c-.2-.1-.5-.2-.9-.2-.8 0-1.5.5-1.5 1.4 0 .9.7 1.4 1.4 1.4.8 0 1.5-.5 1.5-1.4V3h3.1z" />
            </svg>
          </span>
          <span>TikTok @realframes.ca</span>
        </a>
      </div>
    </div>
  )
}
