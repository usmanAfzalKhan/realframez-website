// src/app/services/[slug]/page.js
'use client'

import React, { use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { use as usePromise } from 'react'
import { getServiceBySlug } from '../../../data/services'
import styles from './ServiceDetail.module.scss'

export default function ServiceDetailPage({ params }) {
  // unwrap the incoming params promise to silence the Next.js warning:
  const { slug } = usePromise(params)
  const svc = getServiceBySlug(slug)

  // Detect mobile breakpoint
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!svc) {
    return (
      <div className={styles.main}>
        <div className={styles.notFound}>Service Not Found</div>
      </div>
    )
  }

  // Build the correct filename for desktop vs. mobile
  const imageName = `${slug}-${isMobile ? 'mobile' : 'desktop'}.png`

  return (
    <div className={styles.main}>
      <div className={styles.backWrap}>
        <Link href="/services" className={styles.backBtn}>
          &larr; Back to Services
        </Link>
      </div>

      <h1>{svc.title}</h1>

      <div className={styles.album}>
        <div className={styles.imgBox}>
          <Image
            src={`/images/services/${imageName}`}
            alt={svc.title}
            fill
            sizes="(max-width: 767px) 100vw, 100vw"
            style={{ objectFit: 'cover' }}
            priority
            draggable={false}
          />
        </div>
      </div>

      <p className={styles.desc}>{svc.description}</p>

      <div className={styles.priceBox}>
        <div className={styles.starting}>
          Starting from <span>${svc.price}</span>
        </div>
        <button className={styles.bookBtn}>Book Now</button>
      </div>
    </div>
  )
}
