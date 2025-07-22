'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './Gallery.module.scss'
import galleryImages from '../../data/galleryImages'

export default function GalleryPage() {
  const [modalIdx, setModalIdx] = useState(null)
  const modalRef = useRef(null)

  // ESC key closes modal
  useEffect(() => {
    if (modalIdx === null) return
    function handleKey(e) {
      if (e.key === 'Escape') setModalIdx(null)
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line
  }, [modalIdx])

  const openModal = idx => setModalIdx(idx)
  const closeModal = () => setModalIdx(null)
  const showPrev = () => setModalIdx(i => (i === 0 ? galleryImages.length - 1 : i - 1))
  const showNext = () => setModalIdx(i => (i === galleryImages.length - 1 ? 0 : i + 1))

  // Trap focus in modal (optional)
  useEffect(() => {
    if (modalIdx === null) return
    const modal = modalRef.current
    if (modal) modal.focus()
  }, [modalIdx])

  return (
    <div className={styles.main}>
      <h1>Gallery</h1>
      <p className={styles.intro}>
        Explore our work. <span className={styles.hintText}>Click any image to enlarge.</span> (Full gallery coming soon!)
      </p>
      <div className={styles.grid}>
        {galleryImages.map((img, i) => (
          <div
            key={img.id}
            className={styles.imgCard}
            tabIndex={0}
            role="button"
            aria-label={`View image: ${img.alt}`}
            onClick={() => openModal(i)}
            onKeyDown={e => e.key === 'Enter' && openModal(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={styles.placeholder}
              loading="lazy"
              draggable={false}
            />
            <div className={styles.hintOverlay}>Click to enlarge</div>
          </div>
        ))}
      </div>

      {modalIdx !== null && (
        <div
          className={styles.modalBackdrop}
          onClick={closeModal}
          tabIndex={-1}
        >
          <div
            className={styles.modalContent}
            ref={modalRef}
            tabIndex={0}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.modalNav + ' ' + styles.prev} onClick={showPrev} aria-label="Previous image">
              &#8592;
            </button>
            <img
              src={galleryImages[modalIdx].src}
              alt={galleryImages[modalIdx].alt}
              className={styles.modalImg}
              draggable={false}
            />
            <button className={styles.modalNav + ' ' + styles.next} onClick={showNext} aria-label="Next image">
              &#8594;
            </button>
            <p className={styles.modalCaption}>{galleryImages[modalIdx].alt}</p>
            <button className={styles.modalClose} onClick={closeModal} aria-label="Close">&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}
