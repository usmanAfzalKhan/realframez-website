'use client'

import Link from 'next/link'
import styles from '../../app/page.module.scss'

export default function HomeContactStrip() {
  return (
    <div className={styles.contactStrip}>
      {/* Contact strip */}
      <div className={styles.contactText}>
        <h3 className={styles.contactHeading}>Need to book a shoot or ask a quick question?</h3>
        <p className={styles.contactCopy}>
          Tell us the address, the package or services you want, and your date — we’ll reply fast.
        </p>
      </div>
      <div className={styles.contactActions}>
        <Link href="/contact" className={styles.contactBtnPrimary}>
          Book / Contact →
        </Link>
      </div>
    </div>
  )
}
