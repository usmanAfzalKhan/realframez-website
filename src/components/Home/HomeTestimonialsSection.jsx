'use client'

import Link from 'next/link'
import styles from '../../app/page.module.scss'

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

export default function HomeTestimonialsSection() {
  return (
    <>
      {/* Testimonials */}
      <h3 className={styles.reviewsHeading}>Testimonials</h3>
      <p className={styles.reviewsCopy}>
        What GTA agents and homeowners say after working with RealFrames.
      </p>
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
        <Link href="/review?showForm=1#add-review" className={styles.reviewCtaBtn}>
          View More Reviews
        </Link>
      </div>
    </>
  )
}
