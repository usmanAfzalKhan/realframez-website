'use client'

import { useState, useEffect } from 'react'
import styles from './ScrollToTop.module.scss'
import { FaArrowUp } from 'react-icons/fa';


export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className={styles.scrollBtn}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <FaArrowUp />
    </button>
  )
}
