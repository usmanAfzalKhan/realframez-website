'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServiceBySlug } from '../../../data/services'
import styles from './ServiceDetail.module.scss'

export default function ServiceDetailPage({ params }) {
  const { slug } = params
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

  const imageName = `${slug}-${isMobile ? 'mobile' : 'desktop'}.png`

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>{svc.title}</h1>

      <div className={styles.album}>
        <div className={styles.imgBox}>
          <Image
            src={`/images/services/${imageName}`}
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
              width={28}
              height={28}
              priority
            />
          </div>
        </div>
      </div>

      <p className={styles.desc}>{svc.description}</p>
      <p className={styles.desc}>{svc.why}</p>

      <div className={styles.backWrap}>
        <Link href="/services" className={styles.backBtn}>
          &larr; Back to Services
        </Link>
      </div>

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
