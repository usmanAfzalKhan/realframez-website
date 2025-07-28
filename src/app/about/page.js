// src/app/about/page.js
'use client'

import { useState, useEffect, useRef } from 'react'
import aboutContent from './aboutContent'
import styles from './About.module.scss'

export default function AboutPage() {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef(null)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal()
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  const stop = (e) => e.stopPropagation()

  return (
    <section className={styles.about}>
      <h1>{aboutContent.heading}</h1>
      <p className={styles.mission}>{aboutContent.mission}</p>

      {aboutContent.sections.map((sec) => (
        <div key={sec.title} className={styles.section}>
          <h2>{sec.title}</h2>

          {sec.image ? (
            <div className={styles.founder}>
              <img
                src={sec.image}
                alt={sec.title}
                className={styles.founderImg}
                onClick={openModal}
              />
              <p className={styles.founderText}>{sec.text}</p>
            </div>
          ) : (
            <p>{sec.text}</p>
          )}
        </div>
      ))}

      {isOpen && (
        <div
          className={styles.modalOverlay}
          ref={overlayRef}
          onClick={closeModal}
        >
          <div className={styles.modalContent} onClick={stop}>
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={aboutContent.sections.find(s => s.image).image}
              alt="Founder large"
            />
          </div>
        </div>
      )}
    </section>
  )
}
