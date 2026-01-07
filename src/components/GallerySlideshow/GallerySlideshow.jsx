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
  const [i, setI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef(null);

  const count = safeImages.length;
  const hasMany = count > 1;

  const go = (nextIndex) => {
    if (!count) return;
    const normalized = (nextIndex + count) % count;
    setI(normalized);
  };

  const next = () => go(i + 1);
  const prev = () => go(i - 1);

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
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') setIsPlaying((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMany, i]);

  if (!count) return null;

  const current = safeImages[i];

  // Don't show dots for huge galleries (looks messy). Still keep arrows + autoplay + progress bar.
  const showDots = hasMany && count <= 12;

  const progressPct = count ? ((i + 1) / count) * 100 : 0;

  return (
    <section className={styles.wrap} aria-label="Property slideshow">
      <div className={styles.frame}>
        <Image
          key={current} // ✅ forces remount so the CSS animation plays on slide change
          src={current}
          alt={`Slide ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          priority={priorityFirst && i === 0}
          className={styles.img}
        />

        <div className={styles.overlayTop}>
          {hasMany && (
            <button
              type="button"
              className={styles.playBtn}
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prev}`}
              onClick={prev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.next}`}
              onClick={next}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMany && (
        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {showDots && (
        <div className={styles.dots} role="tablist" aria-label="Slideshow dots">
          {safeImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === i ? styles.dotActive : ''}`}
              onClick={() => go(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === i ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </section>
  );
}
