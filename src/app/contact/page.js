'use client'
import { useState } from 'react'
import styles from './Contact.module.scss'
import { services } from '../../data/services'

export default function ContactPage() {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    name: '',
    phone: '',
    services: [],
    date: '',
    referred: '',        // "yes" or "no"
    referredBy: '',      // who referred you
    message: '',
  })
  const [showReferredBy, setShowReferredBy] = useState(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        services: checked
          ? [...f.services, value]
          : f.services.filter(s => s !== value),
      }))
    } else if (name === 'referred') {
      setForm(f => ({
        ...f,
        referred: value,
        referredBy: value === 'yes' ? f.referredBy : '',
      }))
      setShowReferredBy(value === 'yes')
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (form.referred === 'yes' && !form.referredBy.trim()) {
      alert('Please provide who referred you.')
      return
    }
    alert('Booking request submitted!\n\n' + JSON.stringify(form, null, 2))
    // TODO: send to backend/service
  }

  return (
    <div className={styles.main}>
      <h1>Contact / Book Appointment</h1>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <label>
          Name*
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </label>

        <label>
          Phone* (Canadian only)
          <input
            name="phone"
            required
            pattern="^(?:\+1)?[2-9]\d{2}[2-9](?!11)\d{6}$|^(?:\+1)?\s*\(?[2-9]\d{2}\)?[-.\s]?[2-9](?!11)\d{2}[-.\s]?\d{4}$"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 6471234567"
            maxLength={14}
            title="Enter a valid Canadian phone number"
            autoComplete="tel"
          />
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Services Required* <span className={styles.legendHint}>(Select all that apply)</span></legend>
          <div className={styles.checkboxGrid}>
            {services.map(s => (
              <label key={s.slug} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="services"
                  value={s.title}
                  checked={form.services.includes(s.title)}
                  onChange={handleChange}
                  required={form.services.length === 0}
                />
                {s.title}
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Preferred Date*
          <input
            type="date"
            name="date"
            required
            value={form.date}
            min={today}
            onChange={handleChange}
          />
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Have you been referred?*</legend>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="referred"
                value="yes"
                checked={form.referred === 'yes'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="referred"
                value="no"
                checked={form.referred === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </fieldset>

        {form.referred === 'yes' && (
          <label>
            Who referred you?*
            <input
              name="referredBy"
              value={form.referredBy}
              onChange={handleChange}
              required
              placeholder="Enter name"
              maxLength={32}
            />
          </label>
        )}

        <label>
          Additional Message (optional)
          <textarea
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Any details..."
          />
        </label>

        <button type="submit" className={styles.submitBtn}>Book Now</button>
      </form>
    </div>
  )
}
