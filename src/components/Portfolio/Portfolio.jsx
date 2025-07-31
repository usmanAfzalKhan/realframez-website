'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Portfolio.module.scss';
import PortfolioModal from './PortfolioModal';

export default function PortfolioGallery({ images }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen]       = useState(false);

  const openModal  = idx => { setCurrent(idx); setOpen(true); };
  const closeModal = () => setOpen(false);
  const prevImage  = useCallback(e => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); }, [images.length]);
  const nextImage  = useCallback(e => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); }, [images.length]);

  useEffect(() => {
    const onKey = e => {
      if (!open) return;
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowLeft')  prevImage(e);
      if (e.key === 'ArrowRight') nextImage(e);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {images.map((src, idx) => (
          <div key={idx} className={styles.thumb} onClick={() => openModal(idx)}>
            <Image src={src} alt={`Slide ${idx+1}`} fill className={styles.image} priority />
          </div>
        ))}
      </div>

      {open && (
        <PortfolioModal
          images={images}
          currentIndex={current}
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
