'use client'

import { useState } from 'react'
import styles from './Header.module.scss'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>RealFramez</div>
        
        {/* Desktop & Mobile nav */}
        <nav className={clsx(styles.nav, open && styles.open)}>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span animate={open ? { rotate: 45, y: 8 } : {}} />
          <motion.span animate={open ? { opacity: 0 } : {}} />
          <motion.span animate={open ? { rotate: -45, y: -8 } : {}} />
        </button>
      </div>
    </header>
  )
}
