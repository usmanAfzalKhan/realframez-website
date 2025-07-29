'use client';

import { useCallback } from 'react';
import NextImage from 'next/image';
import styles from './Gallery.module.scss';

export default function GalleryModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const stop = useCallback((e) => e.stopPropagation(), []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={stop}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <NextImage
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={1200}
          height={800}
          sizes="80vw"
          className={styles.modalImg}
        />

        <div className={styles.nav}>
          <button className={styles.prevBtn} onClick={onPrev} aria-label="Previous">
            ‹
          </button>
          <button className={styles.nextBtn} onClick={onNext} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
