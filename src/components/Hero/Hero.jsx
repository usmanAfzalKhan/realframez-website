// src/components/Hero/Hero.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slides } from '../../data/slides';
import styles from './Hero.module.scss';

const heroServiceBookingMap = {
  photography: 'photography',
  'aerial-photography': 'aerial-photography',
  'twilight-photography': 'twilight-shoots',
  'video-production': 'video-production',
  'virtual-staging': 'virtual-staging',
  'social-media-reel-with-realtor': 'social-media-reel-with-realtor',
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileHero, setIsMobileHero] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateHeroMode = () => {
      setIsMobileHero(mediaQuery.matches);
    };

    updateHeroMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateHeroMode);
      return () => mediaQuery.removeEventListener('change', updateHeroMode);
    }

    mediaQuery.addListener(updateHeroMode);
    return () => mediaQuery.removeListener(updateHeroMode);
  }, []);

  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const slide = slides[currentSlide];

  const activeImage = isMobileHero
    ? slide.mobileImage || slide.images?.[0] || null
    : slide.images?.[0] || null;

  const defaultHref = slide.slug === 'welcome' ? '/services' : '/services';
  const defaultLabel =
    slide.slug === 'welcome' ? 'View Services' : 'View Service';

  const ctaHref = slide.ctaHref || defaultHref;
  const ctaLabel = slide.ctaLabel || defaultLabel;

  const bookingServiceSlug = heroServiceBookingMap[slide.slug];
  const showBookNow = Boolean(bookingServiceSlug);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s + 1) % slides.length);
  };

  const THRESHOLD = 35;

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

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
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
        {activeImage && (
          <div
            key={`${currentSlide}-${isMobileHero ? 'mobile' : 'desktop'}`}
            className={`${styles.heroBg} ${styles.fadeIn}`}
            style={bgStyle}
          />
        )}

        <div className={styles.heroOverlay} />

        <div className={styles.logoPill}>
          <Image
            src="/images/logo.png"
            alt="Real Frames logo"
            width={32}
            height={32}
          />
          <span className={styles.logoText}>Real Frames</span>
        </div>

        <div className={styles.content}>
          <div className={styles.copyBlock}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.desc}>{slide.description}</p>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Link href={ctaHref} className={styles.cta}>
                {ctaLabel}
              </Link>

              {showBookNow && (
                <Link
                  href={`/contact?service=${bookingServiceSlug}`}
                  className={styles.cta}
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>

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