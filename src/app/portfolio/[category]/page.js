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

function normalizeVideoItems(rawVideos, fallbackPoster, fallbackIsPortraitVideo) {
  if (!rawVideos) return [];

  const list = Array.isArray(rawVideos) ? rawVideos : [rawVideos];

  return list
    .map((videoItem) => {
      if (typeof videoItem === 'string') {
        return {
          src: videoItem,
          poster: fallbackPoster,
          isPortraitVideo: fallbackIsPortraitVideo,
        };
      }

      if (!videoItem || typeof videoItem !== 'object') return null;

      return {
        src: videoItem.src || videoItem.video || '',
        poster: videoItem.poster || videoItem.videoPoster || fallbackPoster,
        isPortraitVideo:
          typeof videoItem.isPortraitVideo === 'boolean'
            ? videoItem.isPortraitVideo
            : fallbackIsPortraitVideo,
      };
    })
    .filter((videoItem) => {
      return (
        videoItem &&
        typeof videoItem.src === 'string' &&
        videoItem.src.trim().length > 0
      );
    });
}

export default function PortfolioCategoryPage() {
  const { category: slug } = useParams();
  const gallery = slug ? galleriesBySlug[slug] || servicesBySlug[slug] : null;

  // ✅ HARD guarantee: only 1 video plays at a time (DOM-level)
  const pauseOtherVideos = useCallback((currentEl) => {
    if (!currentEl) return;

    const videos = document.querySelectorAll('video[data-play-group="portfolio"]');

    videos.forEach((video) => {
      if (video !== currentEl && !video.paused) {
        video.pause();
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

  const fallbackPoster = gallery.videoPoster || gallery.coverImage || '';
  const fallbackIsPortraitVideo = !!gallery.isPortraitVideo;

  // ✅ TOP videos: added from automator with "Add Video On Top"
  const topVideoItems = normalizeVideoItems(
    gallery.topVideos,
    fallbackPoster,
    fallbackIsPortraitVideo
  );

  // ✅ MAIN videos: old website style still works
  const mainRawVideos =
    Array.isArray(gallery.videos) && gallery.videos.length > 0
      ? gallery.videos
      : gallery.video
        ? [
            {
              src: gallery.video,
              poster: gallery.videoPoster || fallbackPoster,
              isPortraitVideo: fallbackIsPortraitVideo,
            },
          ]
        : [];

  const mainVideoItems = normalizeVideoItems(
    mainRawVideos,
    fallbackPoster,
    fallbackIsPortraitVideo
  );

  // ✅ BOTTOM videos: added from automator with "Add Video Underneath"
  const bottomVideoItems = normalizeVideoItems(
    gallery.bottomVideos,
    fallbackPoster,
    fallbackIsPortraitVideo
  );

  const hasTopVideos = topVideoItems.length > 0;
  const hasMainVideos = mainVideoItems.length > 0;
  const hasBottomVideos = bottomVideoItems.length > 0;
  const hasAnyVideo = hasTopVideos || hasMainVideos || hasBottomVideos;

  const showAgentCard = slug === '3309-joliffe-ave' && !!galleriesBySlug[slug];

  const slideshowHref = gallery.slideshowHref || `/portfolio/${slug}/slideshow`;

  const isVirtualStaging = (slug || '').toString().trim().toLowerCase() === 'virtual-staging';

  const stagingPairs = Array.isArray(virtualStagingPairs)
    ? virtualStagingPairs.filter(
        (pair) =>
          pair &&
          typeof pair.beforeSrc === 'string' &&
          typeof pair.afterSrc === 'string'
      )
    : [];

  const showVirtualStagingSliders = isVirtualStaging && stagingPairs.length > 0;

  const renderVideoStack = (videoItems, sectionLabel) => {
    if (!videoItems || videoItems.length === 0) return null;

    return (
      <section className={styles.videoStack} aria-label={sectionLabel}>
        {videoItems.map((videoItem, index) => {
          const isPortrait = !!videoItem.isPortraitVideo;

          const videoWrapClass = isPortrait
            ? styles.videoWrapPortrait
            : styles.videoWrap;

          const videoClass = isPortrait ? styles.videoPortrait : styles.video;

          const poster = videoItem.poster || fallbackPoster;

          return (
            <div className={videoWrapClass} key={`${sectionLabel}-${videoItem.src}-${index}`}>
              <video
                data-play-group="portfolio"
                src={videoItem.src}
                poster={poster}
                className={videoClass}
                controls
                playsInline
                preload="metadata"
                aria-label={`${title} walkthrough ${index + 1}`}
                onPlay={(event) => pauseOtherVideos(event.currentTarget)}
                onPlaying={(event) => pauseOtherVideos(event.currentTarget)}
              />
            </div>
          );
        })}
      </section>
    );
  };

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

      {/* ✅ TOP EXTRA VIDEOS */}
      {renderVideoStack(topVideoItems, `${title} top videos`)}

      {/* ✅ MAIN VIDEO / OLD VIDEO */}
      {renderVideoStack(mainVideoItems, `${title} main videos`)}

      {/* ✅ BUTTON + (Virtual Staging Sliders) + CARD + INSTRUCTION AFTER TOP/MAIN VIDEO */}
      {(hasImages || showVirtualStagingSliders) && (
        <>
          <div className={styles.mediaIntro}>
            <Link href={slideshowHref} className={styles.slideshowCta}>
              View Full Slideshow <span aria-hidden="true">→</span>
            </Link>

            {showVirtualStagingSliders && (
              <div className={styles.virtualStagingGrid}>
                {stagingPairs.map((pair, index) => (
                  <BeforeAfterSlider
                    key={pair.id || index}
                    beforeSrc={pair.beforeSrc}
                    afterSrc={pair.afterSrc}
                    beforeAlt={pair.beforeAlt}
                    afterAlt={pair.afterAlt}
                    aspectRatio={pair.aspectRatio || '16/9'}
                    initial={typeof pair.initial === 'number' ? pair.initial : 0.5}
                    priority={index === 0}
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

      {/* ✅ BOTTOM EXTRA VIDEOS */}
      {renderVideoStack(bottomVideoItems, `${title} bottom videos`)}

      {!hasImages && !hasAnyVideo && !showVirtualStagingSliders && (
        <p className={styles.instruction}>
          This gallery doesn&apos;t have media yet. Please check back soon.
        </p>
      )}
    </main>
  );
}