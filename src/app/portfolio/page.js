// src/app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { interiorImages, exteriorImages } from '../../data/galleryImages';
import styles from './PortfolioLanding.module.scss';

const PREVIEW_COUNT = 5; // increased to show more images per card
const ROTATE_INTERVAL = 6000;
const FADE_DURATION = 500;

function RotatingCard({ href, title, description, images }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const timeoutRef = useRef(null);

  // stable interval for rotation
  useEffect(() => {
    const id = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx(i => (i + 1) % images.length);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPrevIdx(null);
      }, FADE_DURATION);
    }, ROTATE_INTERVAL);
    return () => {
      clearInterval(id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [images.length]); // not depending on currentIdx to avoid recreation

  // preload next image for smoother mobile experience
  useEffect(() => {
    const next = (currentIdx + 1) % images.length;
    const img = new window.Image();
    img.src = images[next];
  }, [currentIdx, images]);

  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {prevIdx !== null && (
            <div className={`${styles.crossfadeLayer} ${styles.fadeOut}`}>
              <Image
                src={images[prevIdx]}
                alt={`${title} preview ${prevIdx + 1}`}
                fill
                sizes="(min-width:640px) 45vw, 90vw"
                className={styles.image}
                priority={prevIdx === 0}
                loading={prevIdx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )}
          <div
            key={currentIdx}
            className={`${styles.crossfadeLayer} ${
              prevIdx === null ? styles.instant : styles.fadeIn
            }`}
          >
            <Image
              src={images[currentIdx]}
              alt={`${title} preview ${currentIdx + 1}`}
              fill
              sizes="(min-width:640px) 45vw, 90vw"
              className={styles.image}
              priority={currentIdx === 0}
              loading={currentIdx === 0 ? 'eager' : 'lazy'}
            />
          </div>
          <div className={styles.cardLogo}>
            <Image
              src="/images/logo.png"
              alt="RealFramez Logo"
              width={40}
              height={40}
              priority
            />
          </div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardSubtitle}>{description}</p>
        </div>
      </article>
    </Link>
  );
}

export default function PortfolioLanding() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfolio</h1>
      <p className={styles.subtitle}>
        Browse through the portfolio below to explore both the interior and exterior galleries. Each card previews multiple curated shots—click in to view the full collection and get inspired.
      </p>
      <div className={styles.cards}>
        <RotatingCard
          href="/portfolio/interior"
          title="Interior Gallery"
          description="Showcase rooms with natural lighting and meticulous composition."
          images={interiorImages.slice(0, PREVIEW_COUNT)}
        />
        <RotatingCard
          href="/portfolio/exterior"
          title="Exterior Gallery"
          description="Capture the curb appeal and landscape of the property."
          images={exteriorImages.slice(0, PREVIEW_COUNT)}
        />
      </div>
    </main>
  );
}
