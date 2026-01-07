// src/app/portfolio/[category]/page.js
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioGallery from '../../../components/Portfolio/Portfolio';
import { galleriesBySlug } from '../../../data/galleryImages';
import styles from './page.module.scss';

export default function PortfolioCategoryPage() {
  const { category: slug } = useParams();
  const gallery = slug ? galleriesBySlug[slug] : null;

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

  const hasImages = gallery.images && gallery.images.length > 0;
  const hasVideo = !!gallery.video;

  const videoWrapClass = gallery.isPortraitVideo
    ? styles.videoWrapPortrait
    : styles.videoWrap;

  const videoClass = gallery.isPortraitVideo
    ? styles.videoPortrait
    : styles.video;

  return (
    <main className={styles.main}>
      <Link href="/portfolio" className={styles.backButton}>
        &larr; Back to Portfolio
      </Link>

      <h1 className={styles.heading}>{gallery.address}</h1>

      {hasVideo && (
        <div className={videoWrapClass}>
          <video
            src={gallery.video}
            poster={gallery.videoPoster || gallery.coverImage}
            className={videoClass}
            controls
            playsInline
            preload="metadata"
            aria-label={`${gallery.address} walkthrough`}
          />
        </div>
      )}

      {hasImages && (
        <>
          <div className={styles.mediaIntro}>
            <p className={styles.instruction}>
              <em>Click an image to enlarge</em>
            </p>

            {gallery?.slideshowHref && (
              <Link href={gallery.slideshowHref} className={styles.slideshowCta}>
                View Full Slideshow <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          <PortfolioGallery images={gallery.images} />
        </>
      )}

      {!hasImages && !hasVideo && (
        <p className={styles.instruction}>
          This gallery doesn&apos;t have media yet. Please check back soon.
        </p>
      )}
    </main>
  );
}
