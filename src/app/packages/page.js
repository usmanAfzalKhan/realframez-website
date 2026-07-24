// src/app/packages/page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import packagesContent from './packagesContent';
import styles from './packages.module.scss';

export default function PackagesPage() {
  /*
   * Each package has its own reel checkbox.
   */
  const [reelSelections, setReelSelections] = useState({});

  const handleReelChange = (packageId) => {
    setReelSelections((currentSelections) => ({
      ...currentSelections,
      [packageId]: !currentSelections[packageId],
    }));
  };

  const getBookingHref = (pkg) => {
    const includeReel = Boolean(reelSelections[pkg.id]);

    if (includeReel) {
      return `/contact?package=${pkg.id}&service=${pkg.addon.serviceSlug}`;
    }

    return `/contact?package=${pkg.id}`;
  };

  return (
    <main className={styles.page}>
      <section className={styles.packages}>
        <h1>{packagesContent.heading}</h1>

        <p className={styles.intro}>
          Choose the right media package for your listing.
          Add an Agent-On-Camera Social Media Reel to any
          package for just $99.99.
        </p>

        <div className={styles.grid}>
          {packagesContent.sections.map((pkg) => {
            const reelSelected = Boolean(
              reelSelections[pkg.id],
            );

            return (
              <article
                key={pkg.id}
                className={`${styles.section} ${
                  styles[pkg.styleKey]
                }`}
              >
                {pkg.badge && (
                  <span className={styles.badge}>
                    {pkg.badge}
                  </span>
                )}

                <div className={styles.header}>
                  {pkg.title}
                </div>

                <p className={styles.price}>
                  <span className={styles.start}>
                    Starting at
                  </span>

                  <span className={styles.amount}>
                    {pkg.price}
                  </span>
                </p>

                <ul className={styles.features}>
                  {pkg.features.map((feature) => (
                    <li key={feature}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <label className={styles.addonCheck}>
                  <input
                    type="checkbox"
                    className={styles.addonCheckbox}
                    checked={reelSelected}
                    onChange={() =>
                      handleReelChange(pkg.id)
                    }
                  />

                  <span className={styles.addonText}>
                    Add an {pkg.addon.label} — Just{' '}
                    {pkg.addon.price}
                  </span>
                </label>

                <Link
                  href={getBookingHref(pkg)}
                  className={styles.button}
                >
                  Book Now
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}