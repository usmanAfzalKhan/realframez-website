// src/components/Hero/Hero.jsx

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slides } from '../../data/slides';
import styles from './Hero.module.scss';

const heroServiceBookingMap = {
  photography: 'photography',
  'aerial-photography': 'aerial-photography',
  'twilight-photography': 'twilight-shoots',
  'virtual-staging': 'virtual-staging',
};

function getImagePoolLength(slide) {
  const desktopLength = slide.images?.length || 0;
  const mobileLength = slide.mobileImages?.length || 0;

  return Math.max(desktopLength, mobileLength, 1);
}

function getDifferentRandomIndex(currentIndex, poolLength) {
  if (poolLength <= 1) {
    return 0;
  }

  const randomOffset =
    1 + Math.floor(Math.random() * (poolLength - 1));

  return (currentIndex + randomOffset) % poolLength;
}

function getDesktopImage(slide, imageIndex) {
  return (
    slide.images?.[imageIndex] ||
    slide.images?.[0] ||
    null
  );
}

function getMobileImage(slide, imageIndex) {
  return (
    slide.mobileImages?.[imageIndex] ||
    slide.mobileImages?.[0] ||
    slide.mobileImage ||
    getDesktopImage(slide, imageIndex)
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);

  const [imageIndexes, setImageIndexes] = useState(() =>
    slides.map(() => 0),
  );

  /*
   * The first time a slide opens, image zero is displayed.
   * When the user returns to that slide, another image is
   * selected without immediately repeating the previous image.
   */
  const visitedSlidesRef = useRef(new Set([0]));

  const [isMobileHero, setIsMobileHero] = useState(false);

  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);

  const initialHeroImage =
    slides[0]?.images?.[0] || null;

  /*
   * The previous image remains behind the incoming image while
   * the incoming image fades in and zooms outward.
   */
  const [renderedImage, setRenderedImage] =
    useState(initialHeroImage);

  const [previousImage, setPreviousImage] =
    useState(null);

  const transitionTimerRef = useRef(null);

  const slide = slides[currentSlide] || slides[0];

  const activeImageIndex =
    imageIndexes[currentSlide] || 0;

  const activeImage = isMobileHero
    ? getMobileImage(slide, activeImageIndex)
    : getDesktopImage(slide, activeImageIndex);

  /*
   * Detect whether desktop or mobile hero images should be used.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 767px)',
    );

    const updateHeroMode = () => {
      setIsMobileHero(mediaQuery.matches);
    };

    updateHeroMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener(
        'change',
        updateHeroMode,
      );

      return () => {
        mediaQuery.removeEventListener(
          'change',
          updateHeroMode,
        );
      };
    }

    mediaQuery.addListener(updateHeroMode);

    return () => {
      mediaQuery.removeListener(updateHeroMode);
    };
  }, []);

  /*
   * Preload the hero images to avoid blank flashes while
   * switching between slides.
   */
  useEffect(() => {
    const loadedImages = [];

    const preloadSources = (sources) => {
      const uniqueSources = [
        ...new Set(sources.filter(Boolean)),
      ];

      uniqueSources.forEach((source) => {
        const image = new window.Image();

        image.decoding = 'async';
        image.src = source;

        loadedImages.push(image);
      });
    };

    /*
     * Immediately load the first image for every slide.
     */
    const firstImages = slides.flatMap(
      (heroSlide) => [
        heroSlide.images?.[0],
        heroSlide.mobileImages?.[0],
        heroSlide.mobileImage,
      ],
    );

    preloadSources(firstImages);

    /*
     * Load the remaining images shortly afterwards.
     */
    const allImages = slides.flatMap(
      (heroSlide) => [
        ...(heroSlide.images || []),
        ...(heroSlide.mobileImages || []),
      ],
    );

    const firstImageSet = new Set(
      firstImages.filter(Boolean),
    );

    const remainingImages = allImages.filter(
      (source) =>
        source && !firstImageSet.has(source),
    );

    let idleCallbackId;
    let timeoutId;

    const preloadRemainingImages = () => {
      preloadSources(remainingImages);
    };

    if ('requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(
        preloadRemainingImages,
        {
          timeout: 1800,
        },
      );
    } else {
      timeoutId = window.setTimeout(
        preloadRemainingImages,
        300,
      );
    }

    return () => {
      if (
        idleCallbackId !== undefined &&
        'cancelIdleCallback' in window
      ) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  /*
   * Load the requested image before displaying it.
   * The old image stays behind the new image until the
   * 1.6-second reveal animation has finished.
   */
  useEffect(() => {
    if (!activeImage || activeImage === renderedImage) {
      return undefined;
    }

    let cancelled = false;
    let imageWasSwapped = false;

    const loader = new window.Image();

    loader.decoding = 'async';

    const swapImages = () => {
      if (cancelled || imageWasSwapped) {
        return;
      }

      imageWasSwapped = true;

      if (transitionTimerRef.current) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }

      setPreviousImage(renderedImage);
      setRenderedImage(activeImage);

      transitionTimerRef.current =
        window.setTimeout(() => {
          setPreviousImage(null);
          transitionTimerRef.current = null;
        }, 1650);
    };

    loader.onload = swapImages;

    loader.onerror = () => {
      if (!cancelled) {
        console.warn(
          `Hero image could not be loaded: ${activeImage}`,
        );
      }
    };

    loader.src = activeImage;

    if (
      loader.complete &&
      loader.naturalWidth > 0
    ) {
      swapImages();
    }

    return () => {
      cancelled = true;
      loader.onload = null;
      loader.onerror = null;
    };
  }, [activeImage, renderedImage]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);

  const changeSlide = (requestedIndex) => {
    const normalizedIndex =
      ((requestedIndex % slides.length) +
        slides.length) %
      slides.length;

    setImageIndexes((currentIndexes) => {
      const updatedIndexes = [
        ...currentIndexes,
      ];

      if (
        visitedSlidesRef.current.has(
          normalizedIndex,
        )
      ) {
        const currentImageIndex =
          currentIndexes[normalizedIndex] || 0;

        const imagePoolLength =
          getImagePoolLength(
            slides[normalizedIndex],
          );

        updatedIndexes[normalizedIndex] =
          getDifferentRandomIndex(
            currentImageIndex,
            imagePoolLength,
          );
      } else {
        /*
         * First visit uses image zero.
         * Interior/Exterior image zero is the original image
         * the client asked to keep.
         */
        visitedSlidesRef.current.add(
          normalizedIndex,
        );

        updatedIndexes[normalizedIndex] = 0;
      }

      return updatedIndexes;
    });

    currentSlideRef.current = normalizedIndex;
    setCurrentSlide(normalizedIndex);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  const prevSlide = () => {
    changeSlide(
      currentSlideRef.current - 1,
    );
  };

  const nextSlide = () => {
    changeSlide(
      currentSlideRef.current + 1,
    );
  };

  const dragThreshold = 35;

  const onStart = (clientX) => {
    setDragging(true);
    setDragOffset(0);
    startX.current = clientX;
  };

  const onMove = (clientX) => {
    if (!dragging) {
      return;
    }

    setDragOffset(
      clientX - startX.current,
    );
  };

  const onEnd = () => {
    if (!dragging) {
      return;
    }

    const completedDragOffset =
      dragOffset;

    setDragging(false);
    setDragOffset(0);

    if (
      completedDragOffset >
      dragThreshold
    ) {
      prevSlide();
    } else if (
      completedDragOffset <
      -dragThreshold
    ) {
      nextSlide();
    }
  };

  const handleTouchStart = (event) => {
    if (
      !event.touches ||
      !event.touches[0]
    ) {
      return;
    }

    onStart(
      event.touches[0].clientX,
    );
  };

  const handleTouchMove = (event) => {
    if (
      !event.touches ||
      !event.touches[0]
    ) {
      return;
    }

    onMove(
      event.touches[0].clientX,
    );
  };

  const handleTouchEnd = () => {
    onEnd();
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    onStart(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!dragging) {
      return;
    }

    onMove(event.clientX);
  };

  const handleMouseUp = () => {
    onEnd();
  };

  const handleMouseLeave = () => {
    onEnd();
  };

  const ctaHref =
    slide.ctaHref || '/services';

  const ctaLabel =
    slide.ctaLabel ||
    (slide.slug === 'welcome'
      ? 'View Services'
      : 'View Service');

  const bookingServiceSlug =
    heroServiceBookingMap[slide.slug];

  const showBookNow = Boolean(
    bookingServiceSlug,
  );

  const heroTrackStyle = {
    transform: `translateX(${
      dragging ? dragOffset : 0
    }px)`,

    transition: dragging
      ? 'none'
      : 'transform 280ms ease-out',
  };

  return (
    <section
      className={styles.hero}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.heroInner} ${styles.slideIn}`}
      >
        <div
          className={styles.heroBgTrack}
          style={heroTrackStyle}
        >
          {previousImage && (
            <div
              className={`${styles.heroBg} ${styles.heroBgPrevious}`}
              style={{
                backgroundImage: `url(${previousImage})`,
              }}
            />
          )}

          {renderedImage && (
            <div
              key={renderedImage}
              className={`${styles.heroBg} ${styles.fadeIn}`}
              style={{
                backgroundImage: `url(${renderedImage})`,
              }}
            />
          )}
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.logoPill}>
          <Image
            src="/images/logo.png"
            alt="Real Frames logo"
            width={32}
            height={32}
          />

          <span className={styles.logoText}>
            Real Frames
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.copyBlock}>
            <h1 className={styles.title}>
              {slide.title}
            </h1>

            <p className={styles.desc}>
              {slide.description}
            </p>

            <div className={styles.ctaRow}>
              <Link
                href={ctaHref}
                className={styles.cta}
              >
                {ctaLabel}
              </Link>

              {showBookNow && (
                <Link
                  href={`/contact?service=${bookingServiceSlug}`}
                  className={styles.cta}
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>

          <div className={styles.dots}>
            {slides.map(
              (heroSlide, index) => (
                <button
                  key={heroSlide.slug}
                  type="button"
                  className={`${styles.dot} ${
                    index === currentSlide
                      ? styles.dotActive
                      : ''
                  }`}
                  onClick={() =>
                    goToSlide(index)
                  }
                  aria-label={`Go to slide ${
                    index + 1
                  }: ${heroSlide.title}`}
                />
              ),
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles.arrowLeft}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          type="button"
          className={styles.arrowRight}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </section>
  );
}