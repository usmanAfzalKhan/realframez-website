'use client'

import { motion } from 'framer-motion'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className={styles.title}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        RealFramez
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Professional Real Estate Photography
      </motion.p>
    </motion.section>
  )
}
