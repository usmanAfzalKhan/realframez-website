'use client'

import styles from './Footer.module.scss'
import { Instagram, Linkedin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.brand}>
          RealFrames
          <span className={styles.copyright}>&copy;</span>
        </span>

        {/* Decorative separator */}
        <div className={styles.separator} aria-hidden="true" />

        <div className={styles.links}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={22} strokeWidth={1.6} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} strokeWidth={1.6} />
          </a>
          <a
            href="tel:+11234567890"
            aria-label="Phone"
          >
            <Phone size={22} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </footer>
)
}
