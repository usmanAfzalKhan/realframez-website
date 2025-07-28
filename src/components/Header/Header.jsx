// src/components/Header/Header.jsx
"use client";

import { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  // Prevent background scroll when mobile nav is open
  if (typeof window !== "undefined") {
    document.body.style.overflow = navOpen ? 'hidden' : '';
  }

  function handleNavToggle() {
    setNavOpen(!navOpen);
  }

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeNav}>
          <Image src="/images/logo.png" alt="Logo" width={44} height={44} priority />
          <span className={styles.text}>REALFRAMES</span>
        </Link>

        {/* Hamburger: only visible on mobile */}
        <button
          className={`${styles.toggle} ${navOpen ? styles.active : ''}`}
          onClick={handleNavToggle}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          type="button"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Navigation */}
        <nav className={`${styles.nav} ${navOpen ? styles.open : ''}`}>
          <Link href="/" onClick={closeNav}>Home</Link>
          <Link href="/services" onClick={closeNav}>Services</Link>
          <Link href="/gallery" onClick={closeNav}>Gallery</Link>
          <Link href="/faq" onClick={closeNav}>FAQ</Link>
          <Link href="/review" onClick={closeNav}>Review</Link>
          <Link href="/about" onClick={closeNav}>About</Link>
          <Link href="/contact" onClick={closeNav}>Contact</Link>
        </nav>
      </div>

      {/* Overlay behind mobile nav */}
      <div
        className={`${styles.overlay} ${navOpen ? styles.open : ''}`}
        onClick={closeNav}
        aria-hidden={!navOpen}
      />
    </header>
);
}
