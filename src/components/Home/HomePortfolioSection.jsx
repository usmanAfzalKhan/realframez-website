'use client'

import Link from 'next/link'
import Image from 'next/image'
import { interiorImages, exteriorImages } from '../../data/galleryImages'
import styles from '../../app/page.module.scss'

export default function HomePortfolioSection() {
  return (
    <>
      {/* PORTFOLIO TEASER */}
      <h3 className={styles.portfolioHeading}>Portfolio</h3>
      <p className={styles.portfolioCopy}>
        Interior and exterior galleries shot for GTA listings. See full sets on the portfolio page.
      </p>

      <div className={styles.portfolioGrid}>
        <article className={styles.portfolioCard}>
          <Link href="/portfolio/interior" className={styles.portfolioLink}>
            <div className={styles.portfolioThumb}>
              <Image
                src={interiorImages[0]}
                alt="Interior gallery preview"
                fill
                sizes="(min-width: 900px) 45vw, 90vw"
                className={styles.portfolioImg}
                priority
              />
              <span className={styles.portfolioBadge}>Interior</span>
            </div>
            <div className={styles.portfolioBody}>
              <h4 className={styles.portfolioTitle}>Interior Spaces</h4>
              <p className={styles.portfolioDesc}>
                Kitchens, living rooms, bedrooms — shot bright and MLS-ready.
              </p>
              <span className={styles.portfolioCta}>View interior gallery →</span>
            </div>
          </Link>
        </article>

        <article className={styles.portfolioCard}>
          <Link href="/portfolio/exterior" className={styles.portfolioLink}>
            <div className={styles.portfolioThumb}>
              <Image
                src={exteriorImages[0]}
                alt="Exterior gallery preview"
                fill
                sizes="(min-width: 900px) 45vw, 90vw"
                className={styles.portfolioImg}
              />
              <span className={styles.portfolioBadge}>Exterior</span>
            </div>
            <div className={styles.portfolioBody}>
              <h4 className={styles.portfolioTitle}>Exteriors &amp; Aerials</h4>
              <p className={styles.portfolioDesc}>
                Curb appeal, drone angles, and neighbourhood context.
              </p>
              <span className={styles.portfolioCta}>View exterior gallery →</span>
            </div>
          </Link>
        </article>

        {/* East Mall video card */}
        <article className={styles.portfolioCard}>
          <Link href="/portfolio/eastmall" className={styles.portfolioLink}>
            <div className={styles.portfolioThumb}>
              <Image
                src="/images/gallery/eastmall/thumbnail.jpg"
                alt="137-366 The East Mall video thumbnail"
                fill
                sizes="(min-width: 900px) 45vw, 90vw"
                className={styles.portfolioImg}
              />
              <span className={styles.portfolioBadge}>Video</span>
            </div>
            <div className={styles.portfolioBody}>
              <h4 className={styles.portfolioTitle}>137-366 The East Mall</h4>
              <p className={styles.portfolioDesc}>Cinematic walkthrough. Tap to play.</p>
              <span className={styles.portfolioCta}>View the video →</span>
            </div>
          </Link>
        </article>
      </div>
    </>
  )
}
