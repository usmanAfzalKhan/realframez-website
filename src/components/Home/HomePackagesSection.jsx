'use client'

import { useState } from 'react'
import Link from 'next/link'
import packagesContent from '../../app/packages/packagesContent'
import styles from '../../app/page.module.scss'

export default function HomePackagesSection() {
  const [openPackage, setOpenPackage] = useState(null)

  const miniPackages = packagesContent.sections.map((pkg) => ({
    id: pkg.title.toLowerCase(),
    title: pkg.title,
    price: pkg.price,
    oldPrice: pkg.value,
    tagline: pkg.tagline,
    features: pkg.features,
  }))

  const togglePackage = (id) => {
    setOpenPackage((prev) => (prev === id ? null : id))
  }

  return (
    <>
      {/* PACKAGES MINI */}
      <h3 className={styles.packagesHeading}>Packages</h3>
      <p className={styles.packagesCopy}>
        Fast, bundled options based on what GTA agents book the most. Pick one, or view all packages.
      </p>

      <ul className={styles.packagesGrid} role="list">
        {miniPackages.map((pkg) => {
          const isOpen = openPackage === pkg.id
          return (
            <li
              key={pkg.id}
              className={`${styles.packageCard} ${styles[`package-${pkg.id}`]} ${
                isOpen ? styles.packageOpen : ''
              }`}
            >
              <div className={styles.packageTop}>
                <p className={styles.packageTitle}>{pkg.title}</p>
                <p className={styles.packagePriceBlock}>
                  <span className={styles.packagePriceLabel}>Starting from</span>
                  <span className={styles.packagePrice}>{pkg.price}</span>
                  {pkg.oldPrice && <span className={styles.packageOld}>{pkg.oldPrice}</span>}
                </p>
              </div>

              <div className={`${styles.packageBody} ${isOpen ? styles.packageBodyOpen : ''}`}>
                <p className={styles.packageText}>{pkg.features[0]}</p>

                {isOpen && (
                  <ul className={styles.packageList}>
                    {pkg.features.slice(1).map((feat) => (
                      <li key={feat}>{feat}</li>
                    ))}
                  </ul>
                )}

                {isOpen && (
                  <div className={styles.packageActions}>
                    <p className={styles.packageTagline}>{pkg.tagline}</p>
                    <Link href={`/contact?package=${pkg.id}`} className={styles.packageBook}>
                      Book now
                    </Link>
                  </div>
                )}
              </div>

              {!isOpen && <div className={styles.packageFade} aria-hidden="true" />}

              <button
                type="button"
                className={styles.packageSeeMore}
                onClick={() => togglePackage(pkg.id)}
              >
                {isOpen ? 'Hide details' : 'See more'}
                <span className={styles.packageSeeMoreArrow}>{isOpen ? '▲' : '▼'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
