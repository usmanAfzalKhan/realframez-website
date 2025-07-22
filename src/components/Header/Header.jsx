// src/components/Header/Header.jsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={close}>
          RealFramez
        </Link>

        {/* Nav */}
        <nav className={clsx(styles.nav, open && styles.open)}>
          <Link href="/"      onClick={close}>Home</Link>
          <Link href="/services" onClick={close}>Services</Link>
          <Link href="/gallery"  onClick={close}>Gallery</Link>
          <Link href="/faq"      onClick={close}>FAQ</Link>
          <Link href="/review"   onClick={close}>Review</Link>
          <Link href="/about"    onClick={close}>About</Link>
          <Link href="/contact"  onClick={close}>Contact</Link>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span animate={open ? { rotate: 45, y: 8 }    : { rotate: 0, y: 0 }} />
          <motion.span animate={open ? { opacity: 0 }           : { opacity: 1 }} />
          <motion.span animate={open ? { rotate: -45, y: -8 }  : { rotate: 0, y: 0 }} />
        </button>
      </div>
    </header>
)
}
