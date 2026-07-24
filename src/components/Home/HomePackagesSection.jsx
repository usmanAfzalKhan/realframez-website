'use client';

import { useState } from 'react';
import Link from 'next/link';
import packagesContent from '../../app/packages/packagesContent';
import styles from '../../app/page.module.scss';

export default function HomePackagesSection() {
  /*
   * One shared value controls all three cards.
   * Clicking See more on any card opens all three.
   */
  const [allPackagesOpen, setAllPackagesOpen] =
    useState(false);

  /*
   * Each package still has its own reel selection.
   */
  const [reelSelections, setReelSelections] =
    useState({});

  const toggleAllPackages = () => {
    setAllPackagesOpen(
      (currentValue) => !currentValue,
    );
  };

  const handleReelChange = (packageId) => {
    setReelSelections((currentSelections) => ({
      ...currentSelections,

      [packageId]:
        !currentSelections[packageId],
    }));
  };

  const getBookingHref = (pkg) => {
    const includeReel = Boolean(
      reelSelections[pkg.id],
    );

    if (includeReel) {
      return `/contact?package=${pkg.id}&service=${pkg.addon.serviceSlug}`;
    }

    return `/contact?package=${pkg.id}`;
  };

  return (
    <>
      <h3 className={styles.packagesHeading}>
        Packages
      </h3>

      <p className={styles.packagesCopy}>
        Fast, bundled options based on what GTA
        agents book the most. Pick one, or view all
        packages.
      </p>

      <ul
        className={styles.packagesGrid}
        role="list"
      >
        {packagesContent.sections.map((pkg) => {
          const reelSelected = Boolean(
            reelSelections[pkg.id],
          );

          return (
            <li
              key={pkg.id}
              className={`${styles.packageCard} ${
                styles[
                  `package-${pkg.styleKey}`
                ]
              } ${
                allPackagesOpen
                  ? styles.packageOpen
                  : ''
              }`}
            >
              <div className={styles.packageTop}>
                <p className={styles.packageTitle}>
                  {pkg.title}
                </p>

                <p
                  className={
                    styles.packagePriceBlock
                  }
                >
                  <span
                    className={
                      styles.packagePriceLabel
                    }
                  >
                    Starting from
                  </span>

                  <span
                    className={
                      styles.packagePrice
                    }
                  >
                    {pkg.price}
                  </span>
                </p>
              </div>

              <div
                className={`${styles.packageBody} ${
                  allPackagesOpen
                    ? styles.packageBodyOpen
                    : ''
                }`}
              >
                <p
                  className={
                    styles.packageText
                  }
                >
                  {pkg.features[0]}
                </p>

                {allPackagesOpen && (
                  <>
                    {pkg.features.length > 1 && (
                      <ul
                        className={
                          styles.packageList
                        }
                      >
                        {pkg.features
                          .slice(1)
                          .map((feature) => (
                            <li key={feature}>
                              {feature}
                            </li>
                          ))}
                      </ul>
                    )}

                    <div
                      className={
                        styles.packageActions
                      }
                    >
                      <label
                        className={
                          styles.packageTagline
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.55rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={reelSelected}
                          onChange={() =>
                            handleReelChange(
                              pkg.id,
                            )
                          }
                          style={{
                            flex: '0 0 auto',
                            width: '17px',
                            height: '17px',
                            marginTop: '2px',
                            accentColor:
                              '#ffcc57',
                            cursor: 'pointer',
                          }}
                        />

                        <span>
                          Add an{' '}
                          {pkg.addon.label} — Just{' '}
                          {pkg.addon.price}
                        </span>
                      </label>

                      <Link
                        href={getBookingHref(pkg)}
                        className={
                          styles.packageBook
                        }
                      >
                        Book now
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {!allPackagesOpen && (
                <div
                  className={
                    styles.packageFade
                  }
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                className={
                  styles.packageSeeMore
                }
                onClick={toggleAllPackages}
                aria-expanded={allPackagesOpen}
              >
                {allPackagesOpen
                  ? 'Hide details'
                  : 'See more'}

                <span
                  className={
                    styles.packageSeeMoreArrow
                  }
                  aria-hidden="true"
                >
                  {allPackagesOpen
                    ? '▲'
                    : '▼'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}