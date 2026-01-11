'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './GallerySlideshow.module.scss';

export default function GallerySlideshow({
  images = [],
  autoPlay = true,
  intervalMs = 8000, // ✅ slower by default
  priorityFirst = true,
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const count = safeImages.length;

  const [i, setI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // crossfade support
  const [prevI, setPrevI] = useState(null); // previous index during transition
  const [phase, setPhase] = useState('idle'); // 'idle' | 'from' | 'to'
  const cleanupRef = useRef(null);

  const timerRef = useRef(null);
  const iRef = useRef(0);

  const hasMany = count > 1;

  useEffect(() => {
    iRef.current = i;
  }, [i]);

  // keep index valid if images change
  useEffect(() => {
    if (!count) return;
    setI((curr) => Math.min(curr, count - 1));
    setPrevI(null);
    setPhase('idle');
  }, [count]);

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  };

  const beginTransition = useCallback(
    (nextIndex) => {
      if (!count) return;

      const normalized = (nextIndex + count) % count;
      const curr = iRef.current;

      if (normalized === curr) return;

      if (cleanupRef.current) {
        clearTimeout(cleanupRef.current);
        cleanupRef.current = null;
      }

      if (prefersReducedMotion()) {
        setPrevI(null);
        setPhase('idle');
        setI(normalized);
        return;
      }

      setPrevI(curr);
      setI(normalized);

      setPhase('from');
      requestAnimationFrame(() => setPhase('to'));

      cleanupRef.current = setTimeout(() => {
        setPrevI(null);
        setPhase('idle');
      }, 1200);
    },
    [count]
  );

  const go = (nextIndex) => beginTransition(nextIndex);
  const next = () => go(iRef.current + 1);
  const prev = () => go(iRef.current - 1);

  // autoplay (respects reduced motion)
  useEffect(() => {
    if (!hasMany || !isPlaying) return;
    if (prefersReducedMotion()) return;

    timerRef.current = setInterval(() => {
      setI((v) => {
        const n = (v + 1) % count;

        setPrevI(v);
        setPhase('from');
        requestAnimationFrame(() => setPhase('to'));

        if (cleanupRef.current) clearTimeout(cleanupRef.current);
        cleanupRef.current = setTimeout(() => {
          setPrevI(null);
          setPhase('idle');
        }, 1200);

        return n;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, hasMany, isPlaying, intervalMs]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (!hasMany) return;

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
  }, [hasMany]);

  if (!count) return null;

  const current = safeImages[i];
  const previous = prevI !== null ? safeImages[prevI] : null;

  const enteringClass = phase === 'from' ? styles.enterFrom : styles.enterTo;
  const exitingClass = phase === 'from' ? styles.exitFrom : styles.exitTo;

  return (
    <section
      className={styles.wrap}
      aria-label="Property slideshow"
      style={{ '--hold-ms': `${intervalMs}ms` }}
    >
      <div className={styles.frame}>
        {/* previous image fades OUT + zooms OUT */}
        {previous && (
          <Image
            key={`prev-${prevI}`}
            src={previous}
            alt="Property photo"
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className={`${styles.img} ${styles.imgPrev} ${exitingClass}`}
            draggable={false}
          />
        )}

        {/* current image fades IN + slowly zooms IN while holding */}
        <Image
          key={`curr-${i}`}
          src={current}
          alt="Property photo"
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          priority={priorityFirst && i === 0}
          className={`${styles.img} ${styles.imgCurr} ${enteringClass}`}
          draggable={false}
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

          <div className={styles.counter} aria-label="Slide count">
            {i + 1}/{count}
          </div>
        </>
      )}
    </section>
  );
}
