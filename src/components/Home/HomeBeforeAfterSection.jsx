'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { virtualStagingPairs } from '../BeforeAfterSlider/virtualStagingPairs';

import homeStyles from '../../app/page.module.scss';
import styles from './HomeBeforeAfterSection.module.scss';

function HomeBeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  aspectRatio = '16/9',
  initial = 0.5,
  min = 0,
  max = 1,
  priority = false,
}) {
  const sliderId = useId();
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);

  const clamp01 = useCallback((v) => Math.max(min, Math.min(max, v)), [min, max]);
  const [p, setP] = useState(clamp01(initial));

  useEffect(() => {
    setP(clamp01(initial));
  }, [initial, clamp01]);

  const setFromClientX = useCallback(
    (clientX) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const raw = (clientX - r.left) / r.width;
      setP(clamp01(raw));
    },
    [clamp01]
  );

  // ✅ unified pointer handlers (stage + handle)
  const startDrag = useCallback(
    (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();

      draggingRef.current = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setFromClientX(e.clientX);
    },
    [setFromClientX]
  );

  const moveDrag = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      setFromClientX(e.clientX);
    },
    [setFromClientX]
  );

  const endDrag = useCallback((e) => {
    draggingRef.current = false;
    try {
      e?.currentTarget?.releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      const step = e.shiftKey ? 0.05 : 0.02;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setP((prev) => clamp01(prev - step));
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setP((prev) => clamp01(prev + step));
      }
      if (e.key === 'Home') {
        e.preventDefault();
        setP(clamp01(min));
      }
      if (e.key === 'End') {
        e.preventDefault();
        setP(clamp01(max));
      }
    },
    [clamp01, min, max]
  );

  const pctStr = useMemo(() => (p * 100).toFixed(3), [p]);

  const clipStyle = useMemo(() => {
    const pct = Number(pctStr);
    return { clipPath: `inset(0 ${100 - pct}% 0 0)` };
  }, [pctStr]);

  const pctNow = Math.round(p * 100);

  return (
    <div className={styles.slider} aria-label="Before and after comparison">
      <span id={sliderId} className={styles.srOnly}>
        Drag left or right to compare images.
      </span>

      <div
        ref={wrapRef}
        className={styles.stage}
        style={{ aspectRatio }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* BEFORE */}
        <div className={styles.layer}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 50vw, 520px"
            priority={priority}
            className={styles.img}
          />
        </div>

        {/* AFTER (clipped) */}
        <div className={styles.layer} style={clipStyle} aria-hidden="true">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 50vw, 520px"
            priority={priority}
            className={styles.img}
          />
        </div>

        {/* LINE */}
        <div className={styles.line} style={{ left: `${pctStr}%` }} aria-hidden="true" />

        {/* HANDLE (now draggable too) */}
        <button
          type="button"
          className={styles.handle}
          style={{ left: `${pctStr}%` }}
          role="slider"
          aria-describedby={sliderId}
          aria-label="Drag to compare before and after"
          aria-valuemin={Math.round(min * 100)}
          aria-valuemax={Math.round(max * 100)}
          aria-valuenow={pctNow}
          onKeyDown={onKeyDown}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span className={styles.chev} aria-hidden="true">
            ‹
          </span>
          <span className={styles.knob} aria-hidden="true" />
          <span className={styles.chev} aria-hidden="true">
            ›
          </span>
        </button>
      </div>
    </div>
  );
}

export default function HomeBeforeAfterSection() {
  const showcasePairs = Array.isArray(virtualStagingPairs)
    ? virtualStagingPairs
        .filter((p) => p && typeof p.beforeSrc === 'string' && typeof p.afterSrc === 'string')
        .slice(0, 2)
    : [];

  if (showcasePairs.length === 0) return null;

  return (
    <section className={homeStyles.section} aria-labelledby="home-before-after-heading">
      <div className={homeStyles.sectionInner}>
        <h3 id="home-before-after-heading" className={homeStyles.portfolioHeading}>
          Precision In Every Detail
        </h3>

        <p className={homeStyles.portfolioCopy}>
          A quick look at Real Frames polish — drag to reveal how refined staging elevates a space.
        </p>

        <div className={styles.grid}>
          {showcasePairs.map((pair, idx) => (
            <div key={pair.id || idx} className={styles.item}>
              <HomeBeforeAfterSlider
                beforeSrc={pair.beforeSrc}
                afterSrc={pair.afterSrc}
                beforeAlt={pair.beforeAlt || `Virtual staging before ${idx + 1}`}
                afterAlt={pair.afterAlt || `Virtual staging after ${idx + 1}`}
                aspectRatio={pair.aspectRatio || '16/9'}
                initial={typeof pair.initial === 'number' ? pair.initial : 0.5}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
