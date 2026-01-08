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
  const indexRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef(null);

  const [prevIndex, setPrevIndex] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = safeImages.length;
  const hasMany = count > 1;

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    indexRef.current = i;
  }, [i]);

  // reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(!!mq.matches);

    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  // keep index valid when images change
  useEffect(() => {
    if (!count) return;
    if (i >= count) setI(0);
  }, [count, i]);

  const transitionTo = (nextIndex) => {
    if (!count) return;

    const cur = indexRef.current;
    if (nextIndex === cur) return;

    setPrevIndex(cur);
    setI(nextIndex);
  };

  const go = (nextIndex) => {
    if (!count) return;
    const normalized = (nextIndex + count) % count;
    transitionTo(normalized);
  };

  const next = () => go(indexRef.current + 1);
  const prev = () => go(indexRef.current - 1);

  // drop previous layer after fade duration
  useEffect(() => {
    if (prevIndex === null) return;

    const t = setTimeout(() => {
      setPrevIndex(null);
    }, reduceMotion ? 0 : 520);

    return () => clearTimeout(t);
  }, [i, prevIndex, reduceMotion]);

  // autoplay (resets on each slide change)
  useEffect(() => {
    clearTimer();

    if (!hasMany || !isPlaying) return;
    if (reduceMotion) return;

    timerRef.current = setInterval(() => {
      const cur = indexRef.current;
      const nxt = (cur + 1) % count;
      transitionTo(nxt);
    }, intervalMs);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMany, isPlaying, intervalMs, count, i, reduceMotion]);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (!hasMany) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') togglePlay();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMany]);

  const togglePlay = () => {
    setIsPlaying((p) => {
      const nextState = !p;
      if (!nextState) clearTimer(); // stop instantly when pausing
      return nextState;
    });
  };

  if (!count) return null;

  const currentSrc = safeImages[i];
  const prevSrc = prevIndex !== null ? safeImages[prevIndex] : null;

  const progressPct = hasMany ? ((i + 1) / count) * 100 : 0;

  return (
    <div className={styles.wrap} aria-label="Property slideshow">
      <div className={styles.frame}>
        {prevSrc && (
          <div className={`${styles.layer} ${styles.layerPrev}`} key={`prev-${prevIndex}`}>
            <Image
              src={prevSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              className={styles.img}
              draggable={false}
            />
          </div>
        )}

        <div className={`${styles.layer} ${styles.layerCurrent}`} key={`cur-${i}`}>
          <Image
            src={currentSrc}
            alt="Property photo"
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            priority={priorityFirst && i === 0}
            className={`${styles.img} ${reduceMotion ? styles.noMotion : styles.imgFadeIn}`}
            draggable={false}
          />
        </div>
      </div>

      {hasMany && (
        <>
          <div className={styles.controls} aria-label="Slideshow controls">
            <button type="button" className={styles.ctrlBtn} onClick={prev} aria-label="Previous image">
              ‹
            </button>

            <button
              type="button"
              className={`${styles.ctrlBtn} ${styles.playBtn}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button type="button" className={styles.ctrlBtn} onClick={next} aria-label="Next image">
              ›
            </button>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
        </>
      )}
    </div>
  );
}
