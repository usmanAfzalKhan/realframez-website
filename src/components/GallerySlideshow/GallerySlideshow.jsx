'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './GallerySlideshow.module.scss';

export default function GallerySlideshow({
  images = [],
  autoPlay = true,
  intervalMs = 3500,
  priorityFirst = true,
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const count = safeImages.length;

  const [i, setI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFading, setIsFading] = useState(false);

  const timerRef = useRef(null);

  const hasMany = count > 1;

  const go = (nextIndex) => {
    if (!count) return;
    const normalized = (nextIndex + count) % count;
    setI(normalized);
  };

  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  // Smooth fade on image change
  useEffect(() => {
    if (!count) return;
    setIsFading(true);
    const t = setTimeout(() => setIsFading(false), 360);
    return () => clearTimeout(t);
  }, [i, count]);

  // autoplay (respects reduced motion)
  useEffect(() => {
    if (!hasMany || !isPlaying) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    timerRef.current = setInterval(() => {
      setI((v) => (v + 1) % count);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, hasMany, isPlaying, intervalMs]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (!hasMany) return;

      // don't hijack typing in inputs
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMany, i]);

  if (!count) return null;

  const current = safeImages[i];

  return (
    <section className={styles.wrap} aria-label="Property slideshow">
      <div className={styles.frame}>
        <Image
          src={current}
          alt="Property photo"
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          priority={priorityFirst && i === 0}
          className={`${styles.img} ${isFading ? styles.imgFade : ''}`}
        />
      </div>

      {hasMany && (
        <>
          <div className={styles.controlsBar} aria-label="Slideshow controls">
            <button
              type="button"
              className={styles.iconBtn}
              onClick={prev}
              aria-label="Previous image"
              title="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              className={styles.pauseBtn}
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={next}
              aria-label="Next image"
              title="Next"
            >
              ›
            </button>
          </div>

          {/* scrub (replaces dots) */}
          <div className={styles.scrubWrap} aria-label="Slideshow scrub bar">
            <input
              className={styles.scrub}
              type="range"
              min={0}
              max={count - 1}
              step={1}
              value={i}
              onChange={(e) => go(Number(e.target.value))}
              aria-label="Slide position"
            />
          </div>
        </>
      )}
    </section>
  );
}
