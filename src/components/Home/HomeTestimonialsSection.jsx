// src/components/Home/HomeTestimonialsSection.jsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import styles from '../../app/page.module.scss'

export default function HomeTestimonialsSection() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // pull the same reviews the /review page uses: latest 8
    const q = query(
      collection(db, 'reviews'),
      orderBy('timestamp', 'desc'),
      limit(8)
    )

    const unsub = onSnapshot(q, snapshot => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setReviews(docs)
    })

    return () => unsub()
  }, [])

  const marqueeReviews = reviews.length > 0 ? [...reviews, ...reviews] : []

  return (
    <>
      {/* Testimonials */}
      <h3 className={styles.reviewsHeading}>Testimonials</h3>
      <p className={styles.reviewsCopy}>
        What GTA agents and homeowners say after working with Real Frames.
      </p>

      {marqueeReviews.length > 0 && (
        <div className={styles.reviewsMarquee} aria-label="Client testimonials">
          <div className={styles.reviewsTrack}>
            {marqueeReviews.map((review, idx) => (
              <figure
                key={`${review.id ?? 'review'}-${idx}`}   // ✅ unique even when duplicated
                className={styles.reviewCard}
              >
                <blockquote className={styles.reviewText}>“{review.text}”</blockquote>
                <figcaption className={styles.reviewAuthor}>— {review.name}</figcaption>
                <p
                  className={styles.reviewRating}
                  aria-label={`${review.rating ?? 5} out of 5 stars`}
                >
                  {'★'.repeat(review.rating ?? 5)}
                </p>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className={styles.reviewCtaWrap}>
        <Link href="/review?showForm=1#add-review" className={styles.reviewCtaBtn}>
          View More Reviews
        </Link>
      </div>
    </>
  )
}
