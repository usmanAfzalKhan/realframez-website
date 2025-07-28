// src/components/ServiceCard/ServiceCard.jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ServiceCard.module.scss'

export default function ServiceCard({ title, description, slug }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const imgSrc = `/images/services/${slug}-${isMobile ? 'mobile' : 'desktop'}.png`

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.placeholder}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          draggable={false}
        />
        <div className={styles.logoOverlay}>
          <Image
            src="/images/logo.png"
            alt="RealFramez logo"
            width={28}
            height={28}
            draggable={false}
          />
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>

      <Link href={`/services/${slug}`} className={styles.cta}>
        View Details
      </Link>
    </motion.div>
  )
}
