'use client';

import Image from 'next/image';
import styles from './AgentContactCard.module.scss';

export default function AgentContactCard({
  photoSrc = '/images/gallery/3309-joliffe-ave/ghuman.webp',
  brokerage = 'HomeLife/Miracle Realty Ltd',
  name = 'Surjit Ghuman',
  website = 'https://www.surjitghuman.ca',
  websiteLabel = 'www.surjitghuman.ca',
  phone = '416.841.1900',
  phoneTel = '+14168411900',
  email = 'surjitghuman@gmail.com',
}) {
  return (
    <section className={styles.wrap} aria-label="Agent contact">
      <div className={styles.card}>
        {/* ✅ ALWAYS VISIBLE INFO */}
        <div className={styles.always}>
          <div className={styles.top}>
            <div className={styles.avatar}>
              <Image
                src={photoSrc}
                alt="Agent headshot"
                width={92}
                height={92}
                className={styles.avatarImg}
                draggable={false}
              />
            </div>

            <div className={styles.meta}>
              <div className={styles.brand}>
                <div className={styles.brandName}>HOMELIFE</div>
                <div className={styles.brandTag}>HIGHER STANDARDS</div>
              </div>

              <div className={styles.brokerage}>{brokerage}</div>
              <div className={styles.name}>{name}</div>

              <a
                className={styles.site}
                href={website}
                target="_blank"
                rel="noreferrer"
              >
                {websiteLabel}
              </a>
            </div>
          </div>
        </div>

        {/* ✅ ONLY PHONE/EMAIL TOGGLE */}
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span className={styles.summaryText}>AGENT CONTACT</span>
            <span className={styles.chev} aria-hidden="true" />
          </summary>

          <div className={styles.rows}>
            <a className={styles.row} href={`tel:${phoneTel}`}>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
                </svg>
              </span>
              {phone}
            </a>

            <a className={styles.row} href={`mailto:${email}`}>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
              </span>
              {email}
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
