// src/app/gallery/page.js
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { galleryImages } from '../../data/galleryImages'
import styles from './Gallery.module.scss'

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef(null)

  const openModal = (idx) => {
    setCurrentIndex(idx)
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentIndex(
      (currentIndex - 1 + galleryImages.length) % galleryImages.length
    )
  }
  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((currentIndex + 1) % galleryImages.length)
  }

  // ESC / arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') prevImage(e)
      if (e.key === 'ArrowRight') nextImage(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, currentIndex])

  // Preload prev/next images for instant navigation
  useEffect(() => {
    if (!isOpen) return
    const nextIdx = (currentIndex + 1) % galleryImages.length
    const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    ;[nextIdx, prevIdx].forEach(i => {
      const img = new window.Image()
      img.src = galleryImages[i]
    })
  }, [currentIndex, isOpen])

  const stop = (e) => e.stopPropagation()

  return (
    <div className={styles.gallery}>
      <h1 className={styles.heading}>Gallery</h1>
      <p className={styles.subtitle}>
        Explore our curated gallery of real estate photographs, showcasing properties
        in their best light—from elegant interiors to breathtaking views.
      </p>
      <p className={styles.note}>Click to enlarge</p>

      <div className={styles.grid}>
        {galleryImages.map((src, idx) => (
          <div key={idx} className={styles.thumbWrap}>
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              width={400}
              height={300}
              sizes="(min-width: 700px) 23vw, (min-width: 400px) 45vw, 90vw"
              priority={idx < 8}
              className={styles.thumb}
              onClick={() => openModal(idx)}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={closeModal}
          ref={overlayRef}
        >
          <div className={styles.modal} onClick={stop}>
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            <Image
              src={galleryImages[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              width={1200}
              height={800}
              sizes="80vw"
              className={styles.modalImg}
            />

            <div className={styles.nav}>
              <button
                className={styles.prevBtn}
                onClick={prevImage}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className={styles.nextBtn}
                onClick={nextImage}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
