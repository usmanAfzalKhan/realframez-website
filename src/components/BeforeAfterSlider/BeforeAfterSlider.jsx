'use client';

import { useEffect, useId, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './BeforeAfterSlider.module.scss';

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  aspectRatio = '16/9',
  initial = 0.5,        // 0..1
  min = 0,              // ✅ allow full range
  max = 1,              // ✅ allow full range
  className = '',
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

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== undefined && e.button !== 0) return; // left click only
      e.preventDefault();
      draggingRef.current = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setFromClientX(e.clientX);
    },
    [setFromClientX]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    },
    [setFromClientX]
  );

  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
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

  const clipStyle = useMemo(() => {
    const pct = (p * 100).toFixed(3);
    return { clipPath: `inset(0 ${100 - pct}% 0 0)` };
  }, [p]);

  const pctNow = Math.round(p * 100);

  return (
    <section className={`${styles.slider} ${className}`} aria-label="Before and after comparison">
      <div
        ref={wrapRef}
        className={styles.stage}
        style={{ aspectRatio }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* BEFORE (base) */}
        <div className={styles.layer}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 980px"
            priority={priority}
            className={styles.img}
          />
        </div>

        {/* AFTER (clipped on top) */}
        <div className={styles.layer} style={clipStyle} aria-hidden="true">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 980px"
            priority={priority}
            className={styles.img}
          />
        </div>

        {/* LINE */}
        <div className={styles.line} style={{ left: `${p * 100}%` }} aria-hidden="true" />

        {/* HANDLE */}
        <button
          type="button"
          className={styles.handle}
          style={{ left: `${p * 100}%` }}
          role="slider"
          aria-label="Drag to compare before and after"
          aria-controls={sliderId}
          aria-valuemin={Math.round(min * 100)}
          aria-valuemax={Math.round(max * 100)}
          aria-valuenow={pctNow}
          onKeyDown={onKeyDown}
        >
          <span className={styles.chev} aria-hidden="true">
            ‹
          </span>
          <span className={styles.knob} aria-hidden="true" />
          <span className={styles.chev} aria-hidden="true">
            ›
          </span>
        </button>

        {/* Labels */}
        <div id={sliderId} className={styles.labels} aria-hidden="true">
          <span className={styles.badge}>Before</span>
          <span className={styles.badge}>After</span>
        </div>
      </div>
    </section>
  );
}
