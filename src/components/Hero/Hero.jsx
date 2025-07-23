'use client';

import { useState, useEffect } from "react";
import styles from "./Hero.module.scss";
import { slides } from "../../data/slides";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fade animation on slide change
  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 520);
    return () => clearTimeout(timeout);
  }, [current]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    function handler(e) {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const prevSlide = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const nextSlide = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];
  const imgSrc = isMobile ? slide.mobileImg : slide.desktopImg;

  return (
    <section className={styles.hero} aria-label="Hero slider">
      <div className={styles.bgWrap}>
        <Image
          key={imgSrc}
          src={imgSrc}
          alt={slide.title}
          fill
          className={fade ? styles.fade : ""}
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
          draggable={false}
        />
      </div>
      <div className={styles.overlay}>
        <h1 className={styles.title}>{slide.title}</h1>
        <p className={styles.subtitle}>{slide.subtitle}</p>
        {slide.button && (
          <Link href={slide.buttonLink} className={styles.ctaBtn}>
            {slide.button}
          </Link>
        )}
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === current ? styles.dotActive : styles.dot}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <span>&#10094;</span>
      </button>
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <span>&#10095;</span>
      </button>
      <div className={styles.heroLogo}>
        <Image
          src="/images/logo.png"
          alt="RealFramez Logo"
          width={56}
          height={56}
          priority
        />
      </div>
    </section>
  );
}
