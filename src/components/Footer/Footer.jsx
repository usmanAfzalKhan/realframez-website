'use client'

import { FaTiktok } from 'react-icons/fa'
import styles from './Footer.module.scss'
import { Instagram, Tiktok, Phone } from 'lucide-react'

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
            href="https://www.instagram.com/realframes7/?igsh=MWcyeGQ5NGhzNGNpNg%3D%3D#"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={22} strokeWidth={1.6} />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok size={22} strokeWidth={1.6} />
          </a>
          <a
            href="tel:+16475332748"
            aria-label="Phone"
          >
            <Phone size={22} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </footer>
)
}
