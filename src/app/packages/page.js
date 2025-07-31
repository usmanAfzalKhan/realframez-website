'use client';

import Link from 'next/link';
import packagesContent from './packagesContent';
import styles from './packages.module.scss';

export default function PackagesPage() {
  return (
    <section className={styles.packages}>
      <h1>{packagesContent.heading}</h1>
      <div className={styles.grid}>
        {packagesContent.sections.map((pkg) => (
          <div
            key={pkg.title}
            className={`${styles.section} ${styles[pkg.title.toLowerCase()]}`}
          >
            {/* badge */}
            {pkg.title === 'Silver' && <span className={styles.badge}>Popular</span>}
            {pkg.title === 'Platinum' && <span className={styles.badge}>Best Value</span>}

            {/* package name */}
            <div className={styles.header}>{pkg.title}</div>

            {/* price block */}
            <p className={styles.price}>
              <span className={styles.start}>Starting at</span>
              <span className={styles.amount}>{pkg.price}</span>
            </p>

            {/* original price */}
            <p className={styles.original}>{pkg.value}</p>

            {/* features */}
            <ul className={styles.features}>
              {pkg.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>

            {/* savings tagline */}
            <p className={styles.tagline}>{pkg.tagline}</p>

            {/* call to action */}
            <Link href="/contact" className={styles.button}>
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
