// src/app/services/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getServiceBySlug } from '../../../data/services'
import styles from './ServiceDetail.module.scss'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const svc = getServiceBySlug(slug)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!svc) {
    return <div className={styles.main}><p>Service Not Found</p></div>
  }

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
