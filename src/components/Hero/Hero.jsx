"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.scss";
import { slides } from "../../data/slides";
import Link from "next/link";
import Image from "next/image";

const swipeVariants = {
  initial: (dir) => ({
    x: dir === "next" ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir) => ({
    x: dir === "next" ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const prevSlide = () => {
    setDirection("prev");
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };
  const nextSlide = () => {
    setDirection("next");
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };

  const slide = slides[current];
  const imgSrc = isMobile ? slide.mobileImg : slide.desktopImg;

  return (
    <section className={styles.hero} aria-label="Hero slider">
      <div className={styles.bgWrap}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            className={styles.motionWrap}
            custom={direction}
            variants={swipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(e, info) => {
              if (info.offset.x > 50) prevSlide();
              if (info.offset.x < -50) nextSlide();
            }}
          >
            <Image
              src={imgSrc}
              alt={slide.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.overlay}>
        <AnimatePresence initial={false} mode="wait">
          <motion.h1
            key={`title-${current}`}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.title}
          >
            {slide.title}
          </motion.h1>
          <motion.p
            key={`sub-${current}`}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            {slide.subtitle}
          </motion.p>
          {slide.button && (
            <motion.div
              key={`btn-${current}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.2 }}
              className={styles.ctaWrapper}
            >
              <Link href={slide.buttonLink} className={styles.ctaBtn}>
                {slide.button}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === current ? styles.dotActive : styles.dot}
              onClick={() => {
                setDirection(i > current ? "next" : "prev");
                setCurrent(i);
              }}
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
        &#10094;
      </button>
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        &#10095;
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
