// src/components/Home/HomeServingStrip.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../../app/page.module.scss';
import { partnerLogos } from '../../data/partnerLogos';

export default function HomeServingStrip() {
  // duplicate logos so the strip loops cleanly
  const loopedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      aria-label="Service areas and partner brokerages"
      style={{ marginTop: '0' }}
    >
      {/* Pill strip with the text */}
      <div className={styles.servingStrip}>
        <p className={styles.servingHeading}>
          Serving Realtors Across GTA, Halton & Dufferin County
        </p>
      </div>

      {/* Partner logos marquee */}
      {partnerLogos.length > 0 && (
        <>
          <div
            className={styles.partnersStrip}
            aria-label="Brokerages Real Frames has worked with"
          >
            <div className={styles.partnersTrack}>
              {loopedLogos.map((logo, idx) => (
                <div
                  key={`${logo.slug}-${idx}`}
                  className={styles.partnerLogoWrap}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={140}
                    height={48}
                    className={styles.partnerLogo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA to view full static grid on About page */}
          <div className={styles.servingCtaWrap}>
            <Link href="/about#partners" className={styles.servingCtaBtn}>
              View all Brokerages
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
