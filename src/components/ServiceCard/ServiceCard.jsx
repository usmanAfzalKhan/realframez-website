// src/components/ServiceCard/ServiceCard.jsx

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './ServiceCard.module.scss'

export default function ServiceCard({ title, description, slug }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.placeholder}>
        <span className={styles.imgIcon}>🖼️</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={`/services/${slug}`} className={styles.cta}>
        View Details
      </Link>
    </motion.div>
  )
}
