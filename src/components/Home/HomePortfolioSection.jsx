// src/components/Home/HomePortfolioSection.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { galleryList } from '../../data/galleryImages'
import styles from '../../app/page.module.scss'

export default function HomePortfolioSection() {
  // ✅ show ALL property galleries on home
  const featuredGalleries = galleryList

  return (
    <section className={styles.section} aria-labelledby="home-portfolio-heading">
      <div className={styles.sectionInner}>
        <h3 id="home-portfolio-heading" className={styles.portfolioHeading}>
          Portfolio
        </h3>
        <p className={styles.portfolioCopy}>
          Recent Listings Shot By RealFrames Around The GTA Highlighted Per Property Gallery
        </p>

        <div className={styles.portfolioGrid}>
          {featuredGalleries.map((gallery) => (
            <article key={gallery.slug} className={styles.portfolioCard}>
              <Link href={`/portfolio/${gallery.slug}`} className={styles.portfolioLink}>
                <div className={styles.portfolioThumb}>
                  {gallery.coverImage ? (
                    <Image
                      src={gallery.coverImage}
                      alt={gallery.address}
                      fill
                      sizes="(min-width: 900px) 45vw, 90vw"
                      className={styles.portfolioImg}
                    />
                  ) : (
                    <div className={styles.portfolioImg} />
                  )}
                  <span className={styles.portfolioBadge}>Gallery</span>
                </div>
                <div className={styles.portfolioBody}>
                  <h4 className={styles.portfolioTitle}>{gallery.address}</h4>
                  {gallery.cardDescription && (
                    <p className={styles.portfolioDesc}>{gallery.cardDescription}</p>
                  )}
                  <span className={styles.portfolioCta}>View Gallery →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
