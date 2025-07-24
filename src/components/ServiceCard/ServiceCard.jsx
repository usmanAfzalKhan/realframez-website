// src/components/ServiceCard/ServiceCard.jsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ServiceCard.module.scss'

export default function ServiceCard({ title, description, slug }) {
  // track mobile breakpoint
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // build the correct image path
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
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={`/services/${slug}`} className={styles.cta}>
        View Details
      </Link>
    </motion.div>
  )
}
