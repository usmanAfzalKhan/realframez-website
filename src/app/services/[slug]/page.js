// src/app/services/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getServiceBySlug } from '../../../data/services'
import styles from './ServiceDetail.module.scss'

// ✅ Before/After slider (only used on Virtual Staging)
import BeforeAfterSlider from '../../../components/BeforeAfterSlider/BeforeAfterSlider'
import { virtualStagingPairs } from '../../../components/BeforeAfterSlider/virtualStagingPairs'

// ✅ map Services-page slugs -> Portfolio-page slugs
const PORTFOLIO_SLUG_BY_SERVICE_SLUG = {
  photography: 'interior-exterior-photography',
  'aerial-photography': 'aerial-photography',
  'twilight-shoots': 'twilight-shoots',
  'video-production': 'video-production',
  'virtual-staging': 'virtual-staging',
  'social-media-reel-with-realtor': 'social-media-reel-with-realtor',
}

export default function ServiceDetailPage() {
  const params = useParams()
  const rawSlug = (params?.slug || '').toString()
  const svc = getServiceBySlug(rawSlug)

  const [isMobile, setIsMobile] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // reset the compare panel when switching services (client-side nav)
  useEffect(() => {
    setShowCompare(false)
  }, [rawSlug])

  if (!svc) {
    return (
      <div className={styles.main}>
        <p>Service Not Found</p>
      </div>
    )
  }

  const isVirtualStaging = rawSlug === 'virtual-staging'

  // On all non-video pages use interior image
  const detailImage = svc.images?.[isMobile ? 1 : 0]

  // ✅ Always show View Our Work button (correct portfolio slug)
  const portfolioSlug = PORTFOLIO_SLUG_BY_SERVICE_SLUG[rawSlug] || rawSlug
  const viewWorkHref = `/portfolio/${portfolioSlug}`

  // ✅ Virtual Staging: render ALL pairs from virtualStagingPairs.js
  const stagingPairs = Array.isArray(virtualStagingPairs)
    ? virtualStagingPairs.filter(
        (p) => p && typeof p.beforeSrc === 'string' && typeof p.afterSrc === 'string'
      )
    : []

  return (
    <div className={styles.main}>
      <div className={styles.backWrap}>
        <Link href="/services" className={styles.backBtn}>
          &larr; Back to Services
        </Link>
      </div>

      <h1 className={styles.title}>{svc.title}</h1>

      {rawSlug === 'drone-aerial-video' ? (
        <div className={styles.videoWrapper}>
          <video
            src="/videos/recyclevids/aerial.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          />
        </div>
      ) : (
        <div className={styles.album}>
          <div className={styles.imgBox}>
            {detailImage && (
              <Image
                src={detailImage}
                alt={svc.title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority
                draggable={false}
              />
            )}

            <div className={styles.logoOverlay}>
              <Image src="/images/logo.png" alt="RealFramez Logo" width={36} height={36} priority />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Virtual Staging ONLY: premium before/after toggle (shows ALL pairs) */}
      {isVirtualStaging && stagingPairs.length > 0 && (
        <div className={styles.compareWrap}>
          <button
            type="button"
            className={styles.compareBtn}
            onClick={() => setShowCompare((v) => !v)}
            aria-expanded={showCompare}
          >
            <span className={styles.compareIcon} aria-hidden="true">
              ↔
            </span>
            {showCompare ? 'Hide Before / After' : 'View Before / After'}
          </button>

          {showCompare && (
            <div className={styles.comparePanel}>
              <div className={styles.compareGrid}>
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
            </div>
          )}
        </div>
      )}

      {svc.description.split('\n\n').map((para, idx) => (
        <p key={idx} className={styles.desc}>
          {para}
        </p>
      ))}

      <p className={styles.desc}>{svc.why}</p>

      <div className={styles.priceBox}>
        <div className={styles.starting}>
          Starting from <span>${svc.price}</span>
        </div>

        {/* ✅ buttons */}
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
          <Link href={viewWorkHref} className={styles.bookBtn}>
            View Our Work
          </Link>

          <Link href={`/contact?service=${rawSlug}`} className={styles.bookBtn}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
