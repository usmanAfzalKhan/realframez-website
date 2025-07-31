'use client'

import Link from 'next/link'
import styles from './TeaserCarousel.module.scss'

const ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Portfolio',  href: '/portfolio'  },
  { label: 'FAQ',      href: '/faq'      },
  { label: 'Review',   href: '/review'   },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
]

export default function TeaserCarousel() {
  return (
    <section className={styles.carousel}>
      <h2 className={styles.heading}>Explore</h2>
      <div className={styles.track}>
        {ITEMS.map(({ label, href }) => (
          <Link key={href} href={href} className={styles.card}>
            {label}
          </Link>
        ))}
      </div>
      <div className={styles.indicator}>Swipe →</div>
    </section>
  )
}
