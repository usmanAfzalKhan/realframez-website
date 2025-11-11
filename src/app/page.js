// src/app/page.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '../components/Hero/Hero'
import SpecialOffer from '../components/Offer/SpecialOffer'
import TeaserCarousel from '../components/TeaserCarousel/TeaserCarousel'
import packagesContent from './packages/packagesContent'
import { interiorImages, exteriorImages } from '../data/galleryImages'
import styles from './page.module.scss'

// ✅ reviews (just seeded more, same structure)
const reviews = [
  { name: 'Sarah', text: 'RealFramez delivered stunning photos that sold my listing in days!', rating: 5 },
  { name: 'Mike', text: 'Very professional, friendly, and the twilight shots were 🔥.', rating: 5 },
  { name: 'Ayesha Khan', text: 'Turnaround was same-day and the edits were super clean. I booked again.', rating: 5 },
  { name: 'Arjun Mehta', text: 'They understood the space and shot it wide without making it look fake.', rating: 5 },
  { name: 'Gurpreet Singh', text: 'On time, polite, and the drone shots helped me win the listing.', rating: 5 },
  { name: 'Hamza Siddiqui', text: 'Booked for a MLS condo — photos came out crisp, lighting was on point.', rating: 4 },
  { name: 'Priya Sharma', text: 'Client loved the virtual staging. Makes empty units look premium.', rating: 5 },
  { name: 'Jordan Williams', text: 'They made my listing look like a showhome. Worth it.', rating: 5 },
  { name: 'Danielle Brown', text: 'Easy to work with, sent everything in the right formats.', rating: 5 },
  { name: 'Jason Miller', text: 'Clean, consistent, and exactly what I needed for my rental portfolio.', rating: 5 },
]

export default function HomePage() {
  const [openPackage, setOpenPackage] = useState(null)

  // pull from real packages page
  const miniPackages = packagesContent.sections.map((pkg) => ({
    id: pkg.title.toLowerCase(),
    title: pkg.title,
    price: pkg.price,
    oldPrice: pkg.value,
    tagline: pkg.tagline,
    features: pkg.features,
  }))

  const togglePackage = (id) => {
    setOpenPackage((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <Hero />
      <SpecialOffer />

      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.introInner}>
          <h2 id="intro-title">Elevate Your Property’s Story</h2>

          <p className={styles.copy}>
            Discover how our premium real estate photography—interior, exterior, aerial, and twilight—makes listings
            stand out and sell fast. Clean compositions, true-to-life colours, and MLS-ready exports mean you can publish
            right away.
          </p>

          <div className={styles.whySection}>
            <p className={styles.sectionLabel}>WHY REALFRAMES</p>
            <p className={styles.why}>
              RealFrames is built for GTA realtors and property marketers who need fast, consistent media that actually
              flatters the space.
            </p>
            <p className={styles.why}>
              Photo, aerial, twilight, video, and virtual staging stay in one flow—so you can send the listing the same
              day or next day.
            </p>
          </div>

          {/* SERVICES */}
          <h3 className={styles.servicesHeading}>Our Services</h3>
          <ul className={styles.servicesGrid} role="list" aria-label="Popular services">
            <li className={`${styles.serviceCard} ${styles.photography}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Interior / Exterior</h3>
                <p className={styles.serviceDesc}>Clean angles, bright edits, curb appeal.</p>
              </div>
              <Link href="/services/photography" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.aerial}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Aerial Photography</h3>
                <p className={styles.serviceDesc}>Lot, surroundings, neighbourhood context.</p>
              </div>
              <Link href="/services/aerial-photography" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.twilight}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Twilight Shoots</h3>
                <p className={styles.serviceDesc}>Warm, premium, scroll-stopping dusk.</p>
              </div>
              <Link href="/services/twilight-shoots" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.video}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Video Production</h3>
                <p className={styles.serviceDesc}>Cinematic walk-throughs + drone.</p>
              </div>
              <Link href="/services/video-production" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.virtualTour}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>360° Virtual Tours</h3>
                <p className={styles.serviceDesc}>Immersive Matterport-style walkthroughs.</p>
              </div>
              <Link href="/services/matterport-360-tour" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.aerialVideo}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Aerial Video</h3>
                <p className={styles.serviceDesc}>Bird’s-eye views in motion.</p>
              </div>
              <Link href="/services/drone-aerial-video" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.virtualStaging}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Virtual Staging</h3>
                <p className={styles.serviceDesc}>Empty rooms → lived-in spaces.</p>
              </div>
              <Link href="/services/virtual-staging" className={styles.serviceLink}>View Details</Link>
            </li>

            <li className={`${styles.serviceCard} ${styles.socialReel}`}>
              <div className={styles.serviceMedia} aria-hidden="true" />
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceTitle}>Social Media Reel w/ Realtor</h3>
                <p className={styles.serviceDesc}>Platform-ready promo reel.</p>
              </div>
              <Link href="/services/social-media-reel-with-realtor" className={styles.serviceLink}>View Details</Link>
            </li>
          </ul>

          {/* PACKAGES MINI */}
          <h3 className={styles.packagesHeading}>Packages</h3>
          <p className={styles.packagesCopy}>
            Fast, bundled options based on what GTA agents book the most. Pick one, or view all packages.
          </p>

          <ul className={styles.packagesGrid} role="list">
            {miniPackages.map((pkg) => {
              const isOpen = openPackage === pkg.id
              return (
                <li
                  key={pkg.id}
                  className={`${styles.packageCard} ${styles[`package-${pkg.id}`]} ${isOpen ? styles.packageOpen : ''}`}
                >
                  <div className={styles.packageTop}>
                    <p className={styles.packageTitle}>{pkg.title}</p>
                    <p className={styles.packagePriceBlock}>
                      <span className={styles.packagePriceLabel}>Starting from</span>
                      <span className={styles.packagePrice}>{pkg.price}</span>
                      {pkg.oldPrice && <span className={styles.packageOld}>{pkg.oldPrice}</span>}
                    </p>
                  </div>

                  <div className={`${styles.packageBody} ${isOpen ? styles.packageBodyOpen : ''}`}>
                    <p className={styles.packageText}>{pkg.features[0]}</p>

                    {isOpen && (
                      <ul className={styles.packageList}>
                        {pkg.features.slice(1).map((feat) => (
                          <li key={feat}>{feat}</li>
                        ))}
                      </ul>
                    )}

                    {isOpen && (
                      <div className={styles.packageActions}>
                        <p className={styles.packageTagline}>{pkg.tagline}</p>
                        <Link href={`/contact?package=${pkg.id}`} className={styles.packageBook}>
                          Book now
                        </Link>
                      </div>
                    )}
                  </div>

                  {!isOpen && <div className={styles.packageFade} aria-hidden="true" />}

                  <button type="button" className={styles.packageSeeMore} onClick={() => togglePackage(pkg.id)}>
                    {isOpen ? 'Hide details' : 'See more'}
                    <span className={styles.packageSeeMoreArrow}>{isOpen ? '▲' : '▼'}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* PORTFOLIO TEASER */}
          <h3 className={styles.portfolioHeading}>Portfolio</h3>
          <p className={styles.portfolioCopy}>
            Interior and exterior galleries shot for GTA listings. See full sets on the portfolio page.
          </p>

          <div className={styles.portfolioGrid}>
            <article className={styles.portfolioCard}>
              <Link href="/portfolio/interior" className={styles.portfolioLink}>
                <div className={styles.portfolioThumb}>
                  <Image
                    src={interiorImages[0]}
                    alt="Interior gallery preview"
                    fill
                    sizes="(min-width: 900px) 45vw, 90vw"
                    className={styles.portfolioImg}
                    priority
                  />
                  <span className={styles.portfolioBadge}>Interior</span>
                </div>
                <div className={styles.portfolioBody}>
                  <h4 className={styles.portfolioTitle}>Interior Spaces</h4>
                  <p className={styles.portfolioDesc}>Kitchens, living rooms, bedrooms — shot bright and MLS-ready.</p>
                  <span className={styles.portfolioCta}>View interior gallery →</span>
                </div>
              </Link>
            </article>

            <article className={styles.portfolioCard}>
              <Link href="/portfolio/exterior" className={styles.portfolioLink}>
                <div className={styles.portfolioThumb}>
                  <Image
                    src={exteriorImages[0]}
                    alt="Exterior gallery preview"
                    fill
                    sizes="(min-width: 900px) 45vw, 90vw"
                    className={styles.portfolioImg}
                  />
                  <span className={styles.portfolioBadge}>Exterior</span>
                </div>
                <div className={styles.portfolioBody}>
                  <h4 className={styles.portfolioTitle}>Exteriors & Aerials</h4>
                  <p className={styles.portfolioDesc}>Curb appeal, drone angles, and neighbourhood context.</p>
                  <span className={styles.portfolioCta}>View exterior gallery →</span>
                </div>
              </Link>
            </article>

            {/* NEW: East Mall video card */}
            <article className={styles.portfolioCard}>
              <Link href="/portfolio/eastmall" className={styles.portfolioLink}>
                <div className={styles.portfolioThumb}>
                  <Image
                    src="/images/gallery/eastmall/thumbnail.jpg"
                    alt="137-366 The East Mall video thumbnail"
                    fill
                    sizes="(min-width: 900px) 45vw, 90vw"
                    className={styles.portfolioImg}
                  />
                  <span className={styles.portfolioBadge}>Video</span>
                </div>
                <div className={styles.portfolioBody}>
                  <h4 className={styles.portfolioTitle}>137-366 The East Mall</h4>
                  <p className={styles.portfolioDesc}>Cinematic walkthrough. Tap to play.</p>
                  <span className={styles.portfolioCta}>View the video →</span>
                </div>
              </Link>
            </article>
          </div>

          {/* FAQ STRIP */}
          <div className={styles.faqTeaser}>
            <h3 className={styles.faqHeading}>Got questions about our services?</h3>
            <p className={styles.faqCopy}>
              Turnaround times, travel zones, video add-ons — it’s all answered on our FAQ page.
            </p>
            <Link href="/faq" className={styles.faqLink}>Visit our FAQ →</Link>
          </div>

          {/* Our Story */}
          <div className={styles.storySection}>
            <h3 className={styles.storyHeading}>Our Story</h3>
            <p className={styles.storyCopy}>
              RealFrames started as a one-person photo service in the GTA, shooting condos and townhomes, and grew into
              a full real estate media partner — interiors, exteriors, aerials, video, and virtual staging — so agents
              don’t have to juggle 5 vendors.
            </p>
            <Link href="/about" className={styles.storyBtn}>Continue getting to know us →</Link>
          </div>

          {/* Contact strip */}
          <div className={styles.contactStrip}>
            <div className={styles.contactText}>
              <h3 className={styles.contactHeading}>Need to book a shoot or ask a quick question?</h3>
              <p className={styles.contactCopy}>
                Tell us the address, the package or services you want, and your date — we’ll reply fast.
              </p>
            </div>
            <div className={styles.contactActions}>
              <Link href="/contact" className={styles.contactBtnPrimary}>Book / Contact →</Link>
            </div>
          </div>

          {/* Testimonials */}
          <h3 className={styles.reviewsHeading}>Testimonials</h3>
          <p className={styles.reviewsCopy}>What GTA agents and homeowners say after working with RealFrames.</p>
          <div className={styles.reviewsMarquee} aria-label="Client testimonials">
            <div className={styles.reviewsTrack}>
              {[...reviews, ...reviews].map((review, idx) => (
                <figure key={idx} className={styles.reviewCard}>
                  <blockquote className={styles.reviewText}>“{review.text}”</blockquote>
                  <figcaption className={styles.reviewAuthor}>— {review.name}</figcaption>
                  <p className={styles.reviewRating} aria-label={`${review.rating} out of 5 stars`}>
                    {'★'.repeat(review.rating)}
                  </p>
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.reviewCtaWrap}>
            <Link href="/review?showForm=1#add-review" className={styles.reviewCtaBtn}>View More Reviews</Link>
          </div>

          {/* Social strip */}
          <div className={styles.socialStrip} aria-label="Follow RealFrames on social">
            <div className={styles.socialBrand}>
              <Image src="/images/logo.png" alt="RealFrames" width={44} height={44} className={styles.socialLogo} />
              <div className={styles.socialMeta}>
                <span className={styles.socialLabel}>Follow RealFrames</span>
                <h3 className={styles.socialHeading}>BTS, edits & new shoots</h3>
              </div>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/realframes.ca/"
                className={`${styles.socialPill} ${styles.socialIg}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.75-3.2a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" />
                  </svg>
                </span>
                <span>@realframes.ca</span>
              </a>
              <a
                href="https://www.tiktok.com/@realframes.ca?is_from_webapp=1&sender_device=pc"
                className={`${styles.socialPill} ${styles.socialTt}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.5 3c.2 1.5 1.3 3.2 3.6 3.3v2.4c-1.2 0-2.3-.3-3.6-1v5.3c0 3.2-2.1 4.5-4.2 4.5a4 4 0 0 1-4.1-4c0-2.3 1.8-3.4 3.6-3.4.4 0 .8.1 1.1.2v2.4c-.2-.1-.5-.2-.9-.2-.8 0-1.5.5-1.5 1.4 0 .9.7 1.4 1.4 1.4.8 0 1.5-.5 1.5-1.4V3h3.1z" />
                  </svg>
                </span>
                <span>TikTok @realframes.ca</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <TeaserCarousel />
    </>
  )
}
