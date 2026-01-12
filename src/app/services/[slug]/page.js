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
import { virtualStagingDemo } from '../../../components/BeforeAfterSlider/virtualStagingPairs'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const svc = getServiceBySlug(slug)

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
  }, [slug])

  if (!svc) {
    return <div className={styles.main}><p>Service Not Found</p></div>
  }

  const isVirtualStaging = slug === 'virtual-staging'

  // On all non-video pages use interior image
  const detailImage = svc.images[isMobile ? 1 : 0]

  return (
    <div className={styles.main}>
      <div className={styles.backWrap}>
        <Link href="/services" className={styles.backBtn}>
          &larr; Back to Services
        </Link>
      </div>

      <h1 className={styles.title}>{svc.title}</h1>

      {slug === 'drone-aerial-video' ? (
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
            <Image
              src={detailImage}
              alt={svc.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
              draggable={false}
            />
            <div className={styles.logoOverlay}>
              <Image
                src="/images/logo.png"
                alt="RealFramez Logo"
                width={36}
                height={36}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Virtual Staging ONLY: premium before/after toggle */}
      {isVirtualStaging && virtualStagingDemo && (
        <div className={styles.compareWrap}>
          <button
            type="button"
            className={styles.compareBtn}
            onClick={() => setShowCompare((v) => !v)}
            aria-expanded={showCompare}
          >
            <span className={styles.compareIcon} aria-hidden="true">↔</span>
            {showCompare ? 'Hide Before / After' : 'View Before / After'}
          </button>

          {showCompare && (
            <div className={styles.comparePanel}>
              <BeforeAfterSlider
                beforeSrc={virtualStagingDemo.beforeSrc}
                afterSrc={virtualStagingDemo.afterSrc}
                beforeAlt={virtualStagingDemo.beforeAlt}
                afterAlt={virtualStagingDemo.afterAlt}
                aspectRatio={virtualStagingDemo.aspectRatio}
                initial={virtualStagingDemo.initial}
                priority
              />
            </div>
          )}
        </div>
      )}

      {svc.description.split('\n\n').map((para, idx) => (
        <p key={idx} className={styles.desc}>{para}</p>
      ))}

      <p className={styles.desc}>{svc.why}</p>

      <div className={styles.priceBox}>
        <div className={styles.starting}>
          Starting from <span>${svc.price}</span>
        </div>
        <Link href={`/contact?service=${slug}`} className={styles.bookBtn}>
          Book Now
        </Link>
      </div>
    </div>
  )
}
