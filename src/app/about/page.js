import styles from './About.module.scss'
import aboutContent from './aboutContent'

export const metadata = {
  title: 'About – RealFramez',
  description: 'Learn about RealFramez and our dedication to stunning real estate photography.'
}

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1>{aboutContent.heading}</h1>
      <p className={styles.mission}>{aboutContent.mission}</p>
      <div className={styles.sections}>
        {aboutContent.sections.map(({ title, text }, i) => (
          <section key={i} className={styles.section}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
