// src/app/services/page.js

import ServiceCard from '../../components/ServiceCard/ServiceCard'
import styles from './page.module.scss'
import { services } from '../../data/services'

export const metadata = {
  title: 'Services – RealFramez',
  description: 'Explore RealFramez photography packages and book your shoot today.',
}

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Our Services</h1>
  <p
    style={{
      fontFamily: `'Montserrat', sans-serif`,
      fontSize: 'clamp(1rem, 3vw, 1.125rem)',
      color: 'var(--color-neutral-light)',
      lineHeight: 1.6,
      maxWidth: '700px',
      margin: '0 auto'
    }}
  >
    Choose from our tailored real estate photography packages below and
    book a session that fits your needs.
  </p>
      </header>
      <div className={styles.grid}>
        {services.map((svc) => (
          <ServiceCard
            key={svc.slug}
            title={svc.title}
            description={svc.short}
            slug={svc.slug}
          />
        ))}
      </div>
    </main>
  )
}
