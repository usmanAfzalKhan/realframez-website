// src/app/page.js
'use client'

import Hero from '../components/Hero/Hero'
import SpecialOffer from '../components/Offer/SpecialOffer'
import TeaserCarousel from '../components/TeaserCarousel/TeaserCarousel'

import HomeIntroSection from '../components/Home/HomeIntroSection'
import HomeServicesSection from '../components/Home/HomeServicesSection'
import HomePackagesSection from '../components/Home/HomePackagesSection'
import HomePortfolioSection from '../components/Home/HomePortfolioSection'
import HomeFaqTeaser from '../components/Home/HomeFaqTeaser'
import HomeStorySection from '../components/Home/HomeStorySection'
import HomeContactStrip from '../components/Home/HomeContactStrip'
import HomeTestimonialsSection from '../components/Home/HomeTestimonialsSection'
import HomeSocialStrip from '../components/Home/HomeSocialStrip'
import HomeServingStrip from '../components/Home/HomeServingStrip'

import styles from './page.module.scss'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpecialOffer />
      <HomeServingStrip />
      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.introInner}>
          <HomeIntroSection />
          <HomeServicesSection />
          <HomePackagesSection />
          <HomePortfolioSection />
          <HomeFaqTeaser />
          <HomeStorySection />
          <HomeContactStrip />
          <HomeTestimonialsSection />
          <HomeSocialStrip />
        </div>
      </section>
      <TeaserCarousel />
    </>
  )
}
