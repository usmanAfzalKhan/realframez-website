// src/components/Offer/SpecialOffer.jsx
import styles from './Offer.module.scss'

export default function SpecialOffer() {
  return (
    <section className={styles.specialOffer}>
      <div className={styles.offerInner}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2>Special Offer</h2>
            <div className={styles.badge}>Limited Time</div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.text}>
            <h3>First-time clients</h3>
            <p>
              Get <span className={styles.amount}>$50 off</span> any real estate media package.
            </p>
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <a href="/contact?special=first-time-client" className={styles.cta}>
            Book Now
          </a>
        </div>
      </div>
    </section>
  )
}
