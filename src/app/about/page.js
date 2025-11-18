// src/app/about/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { partnerLogos } from '../../data/partnerLogos';
import aboutContent from './aboutContent';
import styles from './About.module.scss';

const partnerList = partnerLogos;

export default function AboutPage() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal();
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const stop = (e) => e.stopPropagation();

  return (
    <section className={styles.about}>
      <h1>{aboutContent.heading}</h1>
      <p className={styles.mission}>{aboutContent.mission}</p>

      {/* Partner brokerages section (static grid, linked from home logos) */}
      {partnerList.length > 0 && (
        <section className={styles.partnersSection} id="partners">
          <h2 className={styles.partnersHeading}>
            Brokerages We&apos;ve Worked With
          </h2>
          <p className={styles.partnersCopy}>
            Real Frames has delivered listing media for agents across leading
            brands throughout the GTA, Halton, and Dufferin County.
          </p>

          <div className={styles.partnersGrid}>
            {partnerList.map((p) => (
              <div className={styles.partnerCard} key={p.slug}>
                <img
                  src={p.src}
                  alt={p.name}
                  className={styles.partnerLogo}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {aboutContent.sections.map((sec) => (
        <div key={sec.title} className={styles.section}>
          <h2>{sec.title}</h2>

          {sec.image ? (
            <div className={styles.founder}>
              <img
                src={sec.image}
                alt={sec.title}
                className={styles.founderImg}
                onClick={openModal}
              />
              <p className={styles.founderText}>{sec.text}</p>
            </div>
          ) : (
            <p>{sec.text}</p>
          )}
        </div>
      ))}

      {isOpen && (
        <div
          className={styles.modalOverlay}
          ref={overlayRef}
          onClick={closeModal}
        >
          <div className={styles.modalContent} onClick={stop}>
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={aboutContent.sections.find((s) => s.image).image}
              alt="Founder large"
            />
          </div>
        </div>
      )}
    </section>
  );
}
