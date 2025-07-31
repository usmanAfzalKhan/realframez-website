// src/app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { interiorImages, exteriorImages } from '../../data/galleryImages';
import styles from './PortfolioLanding.module.scss';

const PREVIEW_COUNT = 5;
const ROTATE_INTERVAL = 14000;
const FADE_DURATION = 500;
const SLOW_DOWNLINK_THRESHOLD = 2; // Mbps

function isSlowConnection() {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator.connection || {};
  if (nav.saveData) return true;
  const effective = (nav.effectiveType || '').toLowerCase();
  if (effective.includes('2g') || effective === 'slow-2g') return true;
  if (nav.downlink && nav.downlink < SLOW_DOWNLINK_THRESHOLD) return true;
  return false;
}

function RotatingCard({ href, title, description, images }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const slow = useRef(isSlowConnection());

  useEffect(() => {
    if (!slow.current) {
      const next = (currentIdx + 1) % images.length;
      const img = new window.Image();
      img.src = images[next];
    }
  }, [currentIdx, images]);

  useEffect(() => {
    if (slow.current) return;

    intervalRef.current = setInterval(() => {
      setIsFading(true);
      timeoutRef.current = setTimeout(() => {
        setPrevIdx(currentIdx);
        setCurrentIdx(i => (i + 1) % images.length);
        setIsFading(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, FADE_DURATION);
    }, ROTATE_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [images.length]);

  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {!slow.current && prevIdx !== null && (
            <div className={`${styles.singleLayer} ${styles.fadeOut}`}>
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
            className={`${styles.singleLayer} ${
              slow.current ? '' : isFading ? styles.fadeOut : styles.fadeIn
            }`}
            key={slow.current ? 0 : currentIdx}
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
  const [slowMode, setSlowMode] = useState(false);

  useEffect(() => {
    if (isSlowConnection()) setSlowMode(true);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfolio</h1>
      {slowMode && (
        <div className={styles.hint}>
          Explore interior and exterior galleries below.
        </div>
      )}
      <p className={styles.subtitle}>
        See how professional photography transforms spaces—select a gallery to dive into detailed interior and exterior shots.
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
