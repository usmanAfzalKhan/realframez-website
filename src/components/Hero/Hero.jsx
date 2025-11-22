// src/components/Hero/Hero.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slides } from '../../data/slides';
import styles from './Hero.module.scss';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1️⃣ Initial backgrounds: deterministic (first image of each slide)
  const [bgPerSlide, setBgPerSlide] = useState(() =>
    slides.map((slide) => {
      const imgs = slide.images || [];
      return imgs.length ? imgs[0] : null;
    })
  );

  // 2️⃣ After hydration on the client: swap to random images (no SSR mismatch)
  useEffect(() => {
    setBgPerSlide(
      slides.map((slide) => {
        const imgs = slide.images || [];
        if (!imgs.length) return null;
        const randomIndex = Math.floor(Math.random() * imgs.length);
        return imgs[randomIndex];
      })
    );
  }, []);

  // swipe / drag state
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const slide = slides[currentSlide];
  const activeImage = bgPerSlide[currentSlide] || null;

  // per-slide CTAs
  const defaultHref = slide.slug === 'welcome' ? '/services' : '/services';
  const defaultLabel =
    slide.slug === 'welcome' ? 'View Services' : 'View Service';

  const ctaHref = slide.ctaHref || defaultHref;
  const ctaLabel = slide.ctaLabel || defaultLabel;

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s + 1) % slides.length);
  };

  // ==== SWIPE / DRAG HANDLERS (like Mehndi hero, but only moving the bg) ====
  const THRESHOLD = 35; // nice and sensitive

  const onStart = (clientX) => {
    setDragging(true);
    startX.current = clientX;
  };

  const onMove = (clientX) => {
    if (!dragging) return;
    setDragOffset(clientX - startX.current);
  };

  const onEnd = () => {
    if (!dragging) return;

    const dx = dragOffset;
    setDragging(false);
    setDragOffset(0);

    if (dx > THRESHOLD) {
      prevSlide();
    } else if (dx < -THRESHOLD) {
      nextSlide();
    }
  };

  // touch
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    onStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    onMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    onEnd();
  };

  // mouse (desktop drag)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // left click only
    onStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    onMove(e.clientX);
  };

  const handleMouseUp = () => {
    onEnd();
  };

  const handleMouseLeave = () => {
    onEnd();
  };

  // Move ONLY the background image, so no black gap while swiping
  const bgStyle = {
    backgroundImage: activeImage ? `url(${activeImage})` : undefined,
    transform: `translateX(${dragging ? dragOffset : 0}px)`,
    transition: dragging ? 'none' : 'transform 280ms ease-out',
  };

  return (
    <section
      className={styles.hero}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.heroInner} ${styles.slideIn}`}>
        {/* Background (your work) */}
        {activeImage && (
          <div
            key={`${currentSlide}`}
            className={`${styles.heroBg} ${styles.fadeIn}`}
            style={bgStyle}
          />
        )}

        {/* Gradient overlay for text legibility */}
        <div className={styles.heroOverlay} />

        {/* Brand pill – positioned via your SCSS */}
        <div className={styles.logoPill}>
          <Image
            src="/images/logo.png"
            alt="Real Frames logo"
            width={32}
            height={32}
          />
          <span className={styles.logoText}>Real Frames</span>
        </div>

        {/* Text & CTA – bottom-left */}
        <div className={styles.content}>
          <div className={styles.copyBlock}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.desc}>{slide.description}</p>
            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {slides.map((s, idx) => (
              <button
                key={s.slug}
                type="button"
                className={`${styles.dot} ${
                  idx === currentSlide ? styles.dotActive : ''
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Arrows (desktop only via CSS) */}
        <button
          type="button"
          className={styles.arrowLeft}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className={styles.arrowRight}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </section>
  );
}
