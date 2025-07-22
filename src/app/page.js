'use client'

import { motion } from 'framer-motion'
import styles from './page.module.scss'
import Footer from '../components/Footer/Footer'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          RealFramez
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Professional Real Estate Photography
        </motion.p>
      </motion.section>

      {/* Portfolio placeholder */}
      <section className={styles.section}>
        <h2>Portfolio</h2>
        <p>(Gallery coming soon…)</p>
      </section>

      {/* About placeholder */}
      <section className={styles.section}>
        <h2>About</h2>
        <p>RealFramez captures your property at its best—stunning images that sell.</p>
      </section>

      {/* Contact placeholder */}
      <section className={styles.section}>
        <h2>Contact</h2>
        <p>Get a quote or ask questions at <a href="mailto:info@realframez.com">info@realframez.com</a></p>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
