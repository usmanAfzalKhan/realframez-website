// src/app/page.js
'use client'

import Hero from '../components/Hero/Hero'
import TeaserCarousel from '../components/TeaserCarousel/TeaserCarousel'
import Footer from '../components/Footer/Footer'
import styles from './page.module.scss'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Intro */}
      <section className={styles.intro}>
        <h2>Welcome to RealFramez</h2>
        <p>
          At RealFramez, we specialize in high-quality real estate photography—
          interior, exterior, aerial, and twilight shoots—to make your property
          stand out.
        </p>
      </section>

      {/* Teaser Carousel */}
      <TeaserCarousel />

      {/* Footer */}
      <Footer />
    </>
  )
}
