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
        <h2>Welcome to RealFramez</h2>
        <p>
          At RealFramez, we specialize in high-quality real estate photography—interior, exterior, aerial, and twilight shoots—to make your property stand out.
        </p>
      </section>
      <TeaserCarousel />
    </>
  )
}
