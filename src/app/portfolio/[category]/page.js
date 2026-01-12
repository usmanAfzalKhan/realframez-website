// src/app/portfolio/[category]/page.js
'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioGallery from '../../../components/Portfolio/Portfolio';
import AgentContactCard from '../../../components/AgentContactCard/AgentContactCard';
import { galleriesBySlug } from '../../../data/galleryImages';
import { servicesBySlug } from '../../../data/serviceGalleries';

// ✅ Virtual Staging before/after slider (ONLY for /portfolio/virtual-staging)
import BeforeAfterSlider from '../../../components/BeforeAfterSlider/BeforeAfterSlider';
import { virtualStagingPairs } from '../../../components/BeforeAfterSlider/virtualStagingPairs';

import styles from './page.module.scss';

export default function PortfolioCategoryPage() {
  const { category: slug } = useParams();
  const gallery = slug ? (galleriesBySlug[slug] || servicesBySlug[slug]) : null;

  // ✅ HARD guarantee: only 1 video plays at a time (DOM-level)
  const pauseOtherVideos = useCallback((currentEl) => {
    if (!currentEl) return;

    const vids = document.querySelectorAll('video[data-play-group="portfolio"]');
    vids.forEach((v) => {
      if (v !== currentEl && !v.paused) {
        v.pause();
      }
    });
  }, []);

  if (!gallery) {
    return (
      <main className={styles.main}>
        <Link href="/portfolio" className={styles.backButton}>
          &larr; Back to Portfolio
        </Link>
        <h1 className={styles.heading}>Gallery Not Found</h1>
        <p className={styles.instruction}>
          We couldn&apos;t find this property gallery. Please go back and select another address.
        </p>
      </main>
    );
  }

  const title = gallery.address || gallery.title || 'Gallery';

  const hasImages = Array.isArray(gallery.images) && gallery.images.length > 0;

  // ✅ support 1 video (gallery.video) OR many (gallery.videos)
  const rawVideos =
    Array.isArray(gallery.videos) && gallery.videos.length > 0
      ? gallery.videos
      : gallery.video
      ? [gallery.video]
      : [];

  const videoItems = rawVideos
    .map((v) => (typeof v === 'string' ? { src: v } : v))
    .filter((v) => v && typeof v.src === 'string' && v.src.trim().length > 0);

  const hasVideo = videoItems.length > 0;

  const showAgentCard = slug === '3309-joliffe-ave' && !!galleriesBySlug[slug];

  const slideshowHref = gallery.slideshowHref || `/portfolio/${slug}/slideshow`;

  const isVirtualStaging = (slug || '').toString().trim().toLowerCase() === 'virtual-staging';

  const stagingPairs = Array.isArray(virtualStagingPairs)
    ? virtualStagingPairs.filter(
        (p) => p && typeof p.beforeSrc === 'string' && typeof p.afterSrc === 'string'
      )
    : [];

  const showVirtualStagingSliders = isVirtualStaging && stagingPairs.length > 0;

  return (
    <main className={styles.main}>
      <Link href="/portfolio" className={styles.backButton}>
        &larr; Back to Our Work
      </Link>

      <h1 className={styles.heading}>{title}</h1>

      {/* ✅ add service description right under heading (services only) */}
      {gallery.title && gallery.cardDescription && (
        <p className={styles.instruction}>{gallery.cardDescription}</p>
      )}

      {/* ✅ VIDEO FIRST (supports 1 or many) + ✅ ONLY ONE PLAYS */}
      {hasVideo && (
        <div style={videoItems.length > 1 ? { display: 'grid', gap: '18px' } : undefined}>
          {videoItems.map((v, idx) => {
            const isPortrait =
              typeof v.isPortraitVideo === 'boolean' ? v.isPortraitVideo : !!gallery.isPortraitVideo;

            const videoWrapClass = isPortrait ? styles.videoWrapPortrait : styles.videoWrap;
            const videoClass = isPortrait ? styles.videoPortrait : styles.video;

            const poster = v.poster || gallery.videoPoster || gallery.coverImage;

            return (
              <div className={videoWrapClass} key={`${v.src}-${idx}`}>
                <video
                  data-play-group="portfolio"
                  src={v.src}
                  poster={poster}
                  className={videoClass}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${title} walkthrough ${idx + 1}`}
                  onPlay={(e) => pauseOtherVideos(e.currentTarget)}
                  onPlaying={(e) => pauseOtherVideos(e.currentTarget)} // extra-safe
                />
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ BUTTON + (Virtual Staging Sliders) + CARD + INSTRUCTION AFTER VIDEO */}
      {(hasImages || showVirtualStagingSliders) && (
        <>
          <div className={styles.mediaIntro}>
            <Link href={slideshowHref} className={styles.slideshowCta}>
              View Full Slideshow <span aria-hidden="true">→</span>
            </Link>

            {showVirtualStagingSliders && (
              <div style={{ display: 'grid', gap: '18px', width: '100%' }}>
                {stagingPairs.map((pair, idx) => (
                  <BeforeAfterSlider
                    key={pair.id || idx}
                    beforeSrc={pair.beforeSrc}
                    afterSrc={pair.afterSrc}
                    beforeAlt={pair.beforeAlt}
                    afterAlt={pair.afterAlt}
                    aspectRatio={pair.aspectRatio || '16/9'}
                    initial={typeof pair.initial === 'number' ? pair.initial : 0.5}
                    priority={idx === 0}
                  />
                ))}
              </div>
            )}

            {showAgentCard && (
              <AgentContactCard
                photoSrc="/images/gallery/3309-joliffe-ave/ghuman.webp"
                brokerage="HomeLife/Miracle Realty Ltd"
                name="Surjit Ghuman"
                website="https://www.surjitghuman.ca"
                websiteLabel="www.surjitghuman.ca"
                phone="416.841.1900"
                phoneTel="+14168411900"
                email="surjitghuman@gmail.com"
              />
            )}

            <p className={styles.instruction}>
              <em>Click an image to enlarge</em>
            </p>
          </div>

          {hasImages && <PortfolioGallery images={gallery.images} />}
        </>
      )}

      {!hasImages && !hasVideo && !showVirtualStagingSliders && (
        <p className={styles.instruction}>
          This gallery doesn&apos;t have media yet. Please check back soon.
        </p>
      )}
    </main>
  );
}
