// src/app/review/page.js

'use client'

import { useState, useRef, useEffect } from 'react'
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../../firebase'
import styles from './Review.module.scss'

// basic profanity check
const PROFANITY = new RegExp(
  `\\b(?:fuck|shit|bitch|asshole|bastard|dick|pussy|cunt|slut|whore|nigga|nigger|paki|chink|spic)\\b`,
  'i'
)

export default function ReviewPage() {
  const [reviews, setReviews] = useState([])          // ← start empty
  const [showForm, setShowForm] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [lastRating, setLastRating] = useState(0)

  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const [error, setError] = useState('')

  const textareaRef = useRef(null)

  // 1) On mount: fetch the latest 8 once, then set up listener
  useEffect(() => {
    let unsub = () => {}

    // fetch top 8 immediately
    (async () => {
      const initialSnap = await getDocs(
        query(collection(db, 'reviews'), orderBy('timestamp', 'desc'), limit(8))
      )
      setReviews(initialSnap.docs.map(d => ({ id: d.id, ...d.data() })))

      // then listen for real‑time updates (keeps it in sync)
      unsub = onSnapshot(
        query(collection(db, 'reviews'), orderBy('timestamp', 'desc'), limit(8)),
        snap => {
          setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      )
    })()

    return () => unsub()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    // validation
    if (!name.trim() || !text.trim() || rating === 0) {
      setError('All fields are required.')
      return
    }
    if (PROFANITY.test(name) || PROFANITY.test(text)) {
      setError('Please remove profanity before submitting.')
      return
    }
    if (text.length > 200) {
      setError('Review must be 200 characters or less.')
      return
    }

    // show thank you
    setHasSubmitted(true)
    setLastRating(rating)
    setShowForm(false)

    // only persist good reviews
    if (rating < 4) return

    try {
      // add the new review
      await addDoc(collection(db, 'reviews'), {
        name: name.trim(),
        text: text.trim(),
        rating,
        timestamp: serverTimestamp()
      })

      // prune extras (9th+)
      const allSnap = await getDocs(
        query(collection(db, 'reviews'), orderBy('timestamp', 'desc'))
      )
      const toDelete = allSnap.docs.slice(8)
      await Promise.all(
        toDelete.map(d => deleteDoc(doc(db, 'reviews', d.id)))
      )
    } catch {
      setError('Submission failed. Please try again.')
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>What Our Clients Say</h1>
        <p className={styles.intro}>
          See how RealFramez has helped real clients get results.
        </p>
      </div>

      <div className={styles.reviewGrid}>
        {reviews.map((r, i) => (
          <div className={styles.reviewCard} key={r.id || i}>
            <div className={styles.stars}>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  className={n <= r.rating ? styles.starActive : styles.star}
                >
                  ★
                </span>
              ))}
            </div>
            <p className={styles.reviewText}>{r.text}</p>
            <div className={styles.reviewName}>— {r.name}</div>
          </div>
        ))}
      </div>

      {!showForm && !hasSubmitted && (
        <div className={styles.addBtnWrap}>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(true)}
          >
            Add a Review
          </button>
        </div>
      )}

      {hasSubmitted && (
        <div className={styles.thankMsg}>
          Thank you for your review!
        </div>
      )}

      {showForm && !hasSubmitted && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name<span className={styles.req}>*</span>
            <input
              className={styles.input}
              type="text"
              maxLength={22}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className={styles.label}>
            Your Review<span className={styles.req}>*</span>
            <textarea
              className={styles.textarea}
              ref={textareaRef}
              maxLength={200}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write a few words..."
            />
          </label>

          <div className={styles.counter}>{text.length}/200</div>

          <label className={`${styles.label} ${styles.ratingLabel}`}>
            Rating<span className={styles.req}>*</span>
            <div className={styles.starsInput}>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  className={n <= rating ? styles.starFilled : styles.starEmpty}
                  onClick={() => setRating(n)}
                  tabIndex={0}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRating(n)}
                  aria-label={`${n} star`}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => { setShowForm(false); setError('') }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
