// src/app/packages/page.js

'use client';

import Link from 'next/link';
import packagesContent from './packagesContent';
import styles from './packages.module.scss';

export default function PackagesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.packages}>
        <h1>{packagesContent.heading}</h1>

        <p className={styles.intro}>
          Choose the right media package for your listing.
          Add an Agent-On-Camera Social Media Reel to any
          package for just $79.99.
        </p>

        <div className={styles.grid}>
          {packagesContent.sections.map((pkg) => (
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
                <span className={styles.tierName}>
                  {pkg.tier}
                </span>

                <span className={styles.packageName}>
                  {pkg.title}
                </span>
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

              {pkg.addon && (
                <div className={styles.addon}>
                  <span
                    className={styles.addonIcon}
                    aria-hidden="true"
                  >
                    +
                  </span>

                  <span className={styles.addonText}>
                    Add an {pkg.addon}
                  </span>
                </div>
              )}

              <Link
                href={`/contact?package=${pkg.id}`}
                className={styles.button}
              >
                Book Now
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}