// src/components/ServicesPreview/ServicesPreview.jsx
'use client'

import styles from './ServicesPreview.module.scss'

export default function ServicesPreview() {
  const services = [
    { title: 'Interior Photography', icon: '🏠', desc: 'Showcase rooms in their best light.' },
    { title: 'Exterior Photography', icon: '🏡', desc: 'Capture curb appeal and landscaping.' },
    { title: 'Aerial Photography', icon: '🚁', desc: 'Get a bird’s‑eye view with drones.' },
    { title: 'Twilight Shoots', icon: '🌆', desc: 'Create stunning dusk‑time images.' },
  ]

  return (
    <section className={styles.preview}>
      <h2>Our Services</h2>
      <div className={styles.grid}>
        {services.map(({ title, icon, desc }) => (
          <div key={title} className={styles.card}>
            <div className={styles.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
