'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { slides } from '../../data/slides'
import styles from './Hero.module.scss'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [showImage, setShowImage] = useState(false)
  const timeoutRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // ensure window.innerWidth is available
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setShowImage(false)
    clearTimeout(timeoutRef.current)
    // after 5s, if video hasn't ended, show the image
    timeoutRef.current = setTimeout(() => setShowImage(true), 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [current])

  const isMobile = isMounted && window.innerWidth < 768
  const slide = slides[current]
  const videoSrc = isMobile ? slide.mobileVideo : slide.desktopVideo
  const imageSrc = isMobile ? slide.mobileImage : slide.desktopImage

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
  const next = () => setCurrent((current + 1) % slides.length)

  // swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX
  }
  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX
    if (touchEndX.current - touchStartX.current > 50) prev()
    else if (touchStartX.current - touchEndX.current > 50) next()
  }

  return (
    <div
      className={`${styles.hero} ${styles.slideIn}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <video
        key={videoSrc}
        className={`${styles.media} ${
          showImage ? styles.hidden : ''
        }`}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={() => setShowImage(true)}
      />

      <img
        key={imageSrc}
        className={`${styles.media} ${
          !showImage ? styles.hidden : styles.fadeIn
        }`}
        src={imageSrc}
        alt={slide.title}
      />

      <div className={styles.logoSlide}>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
      </div>

      <button
        className={styles.arrowLeft}
        onClick={prev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className={styles.arrowRight}
        onClick={next}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className={styles.overlay}>
        <h1 className={styles.title}>{slide.title}</h1>
        <p className={styles.desc}>{slide.description}</p>
        <Link
          href={current === 0 ? '/services' : `/services/${slide.slug}`}
          className={styles.cta}
        >
          {current === 0 ? 'View Services' : 'View Service'}
        </Link>
      </div>
    </div>
  )
}
