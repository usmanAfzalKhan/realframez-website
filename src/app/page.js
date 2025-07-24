// src/app/page.js
'use client'

import Hero from '../components/Hero/Hero'
import TeaserCarousel from '../components/TeaserCarousel/TeaserCarousel'
import styles from './page.module.scss'

export default function HomePage() {
  return (
    <>
      <Hero />
<section className={styles.intro}>
  <h2>Elevate Your Property’s Story</h2>
  <p>
    Discover how our premium real estate photography—interior, exterior, aerial, and twilight—makes listings stand out and sell fast.
  </p>
</section>

      <TeaserCarousel />
    </>
  )
}
