// src/app/portfolio/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { galleryList } from '../../data/galleryImages';
import { serviceList } from '../../data/serviceGalleries';
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

  const [mounted, setMounted] = useState(false);
  const [slowMode, setSlowMode] = useState(true);

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const hasImages = Array.isArray(images) && images.length > 0;

  useEffect(() => {
    setMounted(true);
    setSlowMode(isSlowConnection());
  }, []);

  useEffect(() => {
    if (!mounted || slowMode || !hasImages || images.length < 2) return;
    const next = (currentIdx + 1) % images.length;
    const img = new window.Image();
    img.src = images[next];
  }, [mounted, slowMode, hasImages, currentIdx, images]);

  useEffect(() => {
    if (!mounted || slowMode || !hasImages || images.length < 2) return;

    intervalRef.current = setInterval(() => {
      setIsFading(true);
      timeoutRef.current = setTimeout(() => {
        setPrevIdx(currentIdx);
        setCurrentIdx((i) => (i + 1) % images.length);
        setIsFading(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }, FADE_DURATION);
    }, ROTATE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted, slowMode, hasImages, images, currentIdx]);

  if (!hasImages) return null;

  const layerClass =
    !slowMode && mounted ? (isFading ? styles.fadeOut : styles.fadeIn) : '';

  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {!slowMode && mounted && prevIdx !== null && (
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

          <div className={`${styles.singleLayer} ${layerClass}`} key={currentIdx}>
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
  useEffect(() => {
    isSlowConnection();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfolio</h1>
      <p className={styles.subtitle}>
        Recent Real Estate Shoots Around The GTA, Halton, Dufferin County Organized Per Property Address.
      </p>

      {/* Properties */}
      <p className={styles.hint}>Properties</p>
      {styles.sectionSub ? (
        <p className={styles.sectionSub}>Browse by property address</p>
      ) : null}

      <div className={styles.cards}>
        {galleryList.map((gallery) => {
          const allImages = [
            gallery.coverImage || gallery.images?.[0],
            ...(gallery.images || []),
          ].filter(Boolean);

          return (
            <RotatingCard
              key={gallery.slug}
              href={`/portfolio/${gallery.slug}`}
              title={gallery.address}
              description={gallery.cardDescription}
              images={allImages.slice(0, PREVIEW_COUNT)}
            />
          );
        })}
      </div>

      {/* Services */}
      <section className={styles.videoSection}>
        <p className={styles.hint}>Services</p>
        {styles.sectionSub ? (
          <p className={styles.sectionSub}>Browse by service type</p>
        ) : null}

        <div className={styles.cards}>
          {serviceList.map((service) => {
            const allImages = [
              service.coverImage || service.images?.[0],
              ...(service.images || []),
            ].filter(Boolean);

            return (
              <RotatingCard
                key={service.slug}
                href={`/portfolio/${service.slug}`}
                title={service.title}
                description={service.cardDescription}
                images={allImages.slice(0, PREVIEW_COUNT)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
