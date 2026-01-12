// src/components/Home/HomePortfolioSection.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { galleryList } from '../../data/galleryImages'
import { serviceList } from '../../data/serviceGalleries'
import styles from '../../app/page.module.scss'

export default function HomePortfolioSection() {
  // ✅ show ALL property galleries + ALL service portfolios on home
  const featuredItems = [...galleryList, ...serviceList]

  return (
    <section className={styles.section} aria-labelledby="home-portfolio-heading">
      <div className={styles.sectionInner}>
        <h3 id="home-portfolio-heading" className={styles.portfolioHeading}>
          Our Work
        </h3>
        <p className={styles.portfolioCopy}>
         Recent Listings Shot By Real Frames Around The GTA — Organized By Property Galleries And Service Type
        </p>

        <div className={styles.portfolioGrid}>
          {featuredItems.map((item) => {
            const title = item.address || item.title || 'Gallery'
            const badge = item.address ? 'Gallery' : 'Service'

            return (
              <article key={item.slug} className={styles.portfolioCard}>
                <Link href={`/portfolio/${item.slug}`} className={styles.portfolioLink}>
                  <div className={styles.portfolioThumb}>
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={title}
                        fill
                        sizes="(min-width: 900px) 45vw, 90vw"
                        className={styles.portfolioImg}
                      />
                    ) : (
                      <div className={styles.portfolioImg} />
                    )}
                    <span className={styles.portfolioBadge}>{badge}</span>
                  </div>

                  <div className={styles.portfolioBody}>
                    <h4 className={styles.portfolioTitle}>{title}</h4>

                    {item.cardDescription && (
                      <p className={styles.portfolioDesc}>{item.cardDescription}</p>
                    )}

                    <span className={styles.portfolioCta}>
                      {badge === 'Service' ? 'View Portfolio →' : 'View Gallery →'}
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
