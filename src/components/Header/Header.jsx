"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef();

  // Close hamburger menu on outside click
useEffect(() => {
  if (!open) return;
  function handleClick(e) {
    if (
      navRef.current &&
      !navRef.current.contains(e.target) &&
      // also ignore clicks on the hamburger itself!
      !e.target.closest(`.${styles.toggle}`)
    ) {
      setOpen(false);
    }
  }
  window.addEventListener('mousedown', handleClick);
  return () => window.removeEventListener('mousedown', handleClick);
}, [open]);


  // Optional: close menu on navigation (route change)
  // useEffect(() => {
  //   const handleRouteChange = () => setOpen(false);
  //   window.addEventListener('hashchange', handleRouteChange);
  //   return () => window.removeEventListener('hashchange', handleRouteChange);
  // }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="RealFrames Logo"
            width={38}
            height={38}
            priority
          />
          <span className={styles.text}>REALFRAMES</span>
        </Link>

        <nav
          ref={navRef}
          className={clsx(styles.nav, open && styles.open)}
        >
          <Link href="/"        onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/gallery"  onClick={() => setOpen(false)}>Gallery</Link>
          <Link href="/faq"      onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/review"   onClick={() => setOpen(false)}>Review</Link>
          <Link href="/about"    onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact"  onClick={() => setOpen(false)}>Contact</Link>
        </nav>

<button
  className={clsx(styles.toggle, open && styles.active)}
  onClick={e => {
    e.stopPropagation();
    setOpen(o => !o);
  }}
  aria-label="Toggle menu"
  type="button"
>
  <span className={styles.bar}></span>
  <span className={styles.bar}></span>
  <span className={styles.bar}></span>
</button>

      </div>
    </header>
  );
}
