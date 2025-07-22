'use client'
import { useState } from 'react'
import styles from './Review.module.scss'
import initialReviews from '../../data/reviews'

function StarRating({ value, onChange, readOnly = false }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={i <= value ? styles.starActive : styles.star}
          onClick={() => !readOnly && onChange(i)}
          style={{ cursor: readOnly ? 'default' : 'pointer' }}
          aria-label={`${i} star`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', text: '', rating: 0 })
  const [error, setError] = useState('')

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value })
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim() || !form.rating) {
      setError('All fields required including a star rating.')
      return
    }
    setReviews([{ ...form }, ...reviews])
    setForm({ name: '', text: '', rating: 0 })
    setModalOpen(false)
  }

  return (
    <div className={styles.main}>
      <h1>What Our Clients Say</h1>
      <p className={styles.intro}>See how RealFramez has helped real clients get results.</p>
      <div className={styles.reviewGrid}>
        {reviews.slice(0, 6).map((r, idx) => (
          <div className={styles.reviewCard} key={idx}>
            <StarRating value={r.rating} readOnly />
            <div className={styles.reviewText}>{r.text}</div>
            <div className={styles.reviewName}>— {r.name}</div>
          </div>
        ))}
      </div>
      <button className={styles.addBtn} onClick={() => setModalOpen(true)}>
        Add a Review
      </button>

      {modalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <form
            className={styles.modalForm}
            onClick={e => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2>Add Your Review</h2>
            <label>
              Name
              <input
                type="text"
                value={form.name}
                maxLength={22}
                onChange={e => handleFormChange('name', e.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Your Review
              <textarea
                rows={3}
                maxLength={180}
                value={form.text}
                onChange={e => handleFormChange('text', e.target.value)}
                placeholder="Write a few words about your experience"
                required
              />
            </label>
            <label>
              Rating
              <StarRating value={form.rating} onChange={v => handleFormChange('rating', v)} />
            </label>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formActions}>
              <button type="button" onClick={() => setModalOpen(false)} className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
