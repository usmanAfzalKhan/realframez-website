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

  // mark as mounted so we can read `window`
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // every time slide changes, reset image/video toggle
  useEffect(() => {
    setShowImage(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowImage(true), 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [current])

  // determine mobile vs desktop
  const isMobile = isMounted && window.innerWidth < 768
  const slide = slides[current]
  const videoSrc = isMobile ? slide.mobileVideo : slide.desktopVideo
  const webmSrc = isMobile ? slide.mobileVideoWebM : slide.desktopVideoWebM
  const imageSrc = isMobile ? slide.mobileImage : slide.desktopImage

  // navigation
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
  const next = () => setCurrent((current + 1) % slides.length)

  // swipe handlers
  const onTouchStart = e => (touchStartX.current = e.changedTouches[0].screenX)
  const onTouchEnd = e => {
    touchEndX.current = e.changedTouches[0].screenX
    if (touchEndX.current - touchStartX.current > 50) prev()
    else if (touchStartX.current - touchEndX.current > 50) next()
  }

  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${imageSrc})` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <video
        suppressHydrationWarning
        key={videoSrc}
        className={`${styles.media} ${showImage ? styles.hidden : ''}`}
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={imageSrc}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={videoSrc} type="video/mp4" />
      </video>

      <img
        suppressHydrationWarning
        key={imageSrc}
        className={`${styles.media} ${!showImage ? styles.hidden : styles.fadeIn}`}
        src={imageSrc}
        alt={slide.title}
      />

      <div className={styles.logoSlide}>
        <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
      </div>

      <button className={styles.arrowLeft} onClick={prev} aria-label="Previous slide">
        ‹
      </button>
      <button className={styles.arrowRight} onClick={next} aria-label="Next slide">
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
