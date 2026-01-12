// src/app/portfolio/[category]/page.js
'use client';

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
  const hasVideo = !!gallery.video;

  const videoWrapClass = gallery.isPortraitVideo ? styles.videoWrapPortrait : styles.videoWrap;
  const videoClass = gallery.isPortraitVideo ? styles.videoPortrait : styles.video;

  // only show agent card for that ONE property
  const showAgentCard = slug === '3309-joliffe-ave' && !!galleriesBySlug[slug];

  // ✅ Works for properties + services
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
        &larr; Back to Portfolio
      </Link>

      <h1 className={styles.heading}>{title}</h1>

      {/* ✅ add service description right under heading (services only) */}
      {gallery.title && gallery.cardDescription && (
        <p className={styles.instruction}>{gallery.cardDescription}</p>
      )}

      {/* ✅ VIDEO FIRST */}
      {hasVideo && (
        <div className={videoWrapClass}>
          <video
            src={gallery.video}
            poster={gallery.videoPoster || gallery.coverImage}
            className={videoClass}
            controls
            playsInline
            preload="metadata"
            aria-label={`${title} walkthrough`}
          />
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
