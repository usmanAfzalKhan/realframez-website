'use client'

import Link from 'next/link'
import styles from '../../app/page.module.scss'

export default function HomeFaqTeaser() {
  return (
    <div className={styles.faqTeaser}>
      {/* FAQ STRIP */}
      <h3 className={styles.faqHeading}>Got questions about our services?</h3>
      <p className={styles.faqCopy}>
        Turnaround times, travel zones, video add-ons — it’s all answered on our FAQ page.
      </p>
      <Link href="/faq" className={styles.faqLink}>
        Visit our FAQ →
      </Link>
    </div>
  )
}
