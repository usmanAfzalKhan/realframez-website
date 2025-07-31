// src/components/Hero/Hero.jsx
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
  const videoRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isMobile = isMounted && window.innerWidth < 768
  const slide = slides[current]

  // special case: combined interior/exterior photography slide uses exterior video + interior image
  const isPhotography = slide.slug === 'photography'
  const exteriorSlide = slides.find((s) => s.slug === 'exterior-photography')
  const interiorSlide = slides.find((s) => s.slug === 'interior-photography')

  const videoSourceSlide = isPhotography
    ? exteriorSlide ?? slide
    : slide

  const imageSourceSlide = isPhotography
    ? interiorSlide ?? slide
    : slide

  const videoSrc = isMobile
    ? videoSourceSlide.mobileVideo || videoSourceSlide.desktopVideo
    : videoSourceSlide.desktopVideo || videoSourceSlide.mobileVideo

  const webmSrc = isMobile
    ? videoSourceSlide.mobileVideoWebM || videoSourceSlide.desktopVideoWebM
    : videoSourceSlide.desktopVideoWebM || videoSourceSlide.mobileVideoWebM

  const imageSrc = isMobile
    ? imageSourceSlide.mobileImage || imageSourceSlide.desktopImage
    : imageSourceSlide.desktopImage || imageSourceSlide.mobileImage

  // Reset image/video toggle & preload next video's src
  useEffect(() => {
    setShowImage(false)
    clearTimeout(timeoutRef.current)

    const nextIdx = (current + 1) % slides.length
    const nextSlide = slides[nextIdx]
    // For the "photography" slide, preload its video like normal
    const nextVideoHref = isMounted
      ? (window.innerWidth < 768
          ? nextSlide.mobileVideo
          : nextSlide.desktopVideo)
      : null

    if (nextVideoHref) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = nextVideoHref
      document.head.appendChild(link)
      return () => {
        clearTimeout(timeoutRef.current)
        document.head.removeChild(link)
      }
    }
  }, [current, isMounted])

  // When the video has loaded its first frame, play & start 5s timer
  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.play()
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setShowImage(true), 5000)
    }
  }

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

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
      style={{ backgroundImage: `url(${imageSrc})` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <video
        ref={videoRef}
        suppressHydrationWarning
        key={videoSrc}
        className={`${styles.media} ${showImage ? styles.hidden : ''}`}
        muted
        playsInline
        preload="auto"
        poster={imageSrc}
        onLoadedData={handleLoadedData}
        onEnded={() => {
          setShowImage(true)
          videoRef.current?.pause()
        }}
        autoPlay
        loop
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
