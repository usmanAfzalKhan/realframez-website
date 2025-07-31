'use client';

import Image from 'next/image';
import styles from './Portfolio.module.scss';

export default function PortfolioModal({ images, currentIndex, onClose, onPrev, onNext }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <button
        className={styles.prevButton}
        onClick={e => { e.stopPropagation(); onPrev(e); }}
      >
        ‹
      </button>

      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalImageWrapper}>
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className={styles.modalImage}
            priority
          />
        </div>
      </div>

      <button
        className={styles.nextButton}
        onClick={e => { e.stopPropagation(); onNext(e); }}
      >
        ›
      </button>
    </div>
  );
}
