'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { galleryImages } from '../../data/galleryImages';
import styles from './Gallery.module.scss';

const GalleryModal = dynamic(() => import('./GalleryModal'), { ssr: false });

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((idx) => {
    setCurrentIndex(idx);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);
  const prevImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, []);
  const nextImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % galleryImages.length);
  }, []);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage(e);
      if (e.key === 'ArrowRight') nextImage(e);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal, prevImage, nextImage]);

  // preload next & prev images
  useEffect(() => {
    if (!isOpen) return;
    const next = (currentIndex + 1) % galleryImages.length;
    const prev = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    [next, prev].forEach((i) => {
      const img = new window.Image();
      img.src = galleryImages[i];
    });
  }, [currentIndex, isOpen]);

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.gallery}>
      <h1 className={styles.heading}>Gallery</h1>
      <p className={styles.subtitle}>
        Explore our curated gallery of real estate photographs, showcasing each property’s finest details—from sun‑drenched interiors and artfully styled rooms to breathtaking exterior vistas and architectural features.
      </p>
      <p className={styles.note}>Click to enlarge</p>

      <div className={styles.grid}>
        {galleryImages.map((src, idx) => (
          <div
            key={idx}
            className={styles.thumbWrap}
            onClick={() => openModal(idx)}
          >
            <NextImage
              src={src}
              alt={`Gallery image ${idx + 1}`}
              fill
              sizes="(min-width: 700px) 23vw, (min-width: 400px) 45vw, 90vw"
              priority={idx < 3}
              className={styles.thumb}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <GalleryModal
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
