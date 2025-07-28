// src/app/contact/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Contact.module.scss'
import { services } from '../../data/services'

export default function ContactPage() {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    name: '',
    phone: '',
    services: [],     // will fill in useEffect if ?service=…
    date: today,
    referred: 'No',
    referredBy: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')       // '', 'ERROR', 'SENT'
  const [loading, setLoading] = useState(false)
  const [submittedPhone, setSubmittedPhone] = useState('')

  // parse ?service=slug on client
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pre = params.get('service')
    if (pre) {
      setForm(f => ({ ...f, services: [pre] }))
    }
  }, [])

  // Strip non‑digits and format as XXX‑XXX‑XXXX if 10 digits
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    return value
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!/^(\d{3}-\d{3}-\d{4})$/.test(form.phone))
      errs.phone = 'Enter a valid 10‑digit phone number.'
    if (form.services.length === 0)
      errs.services = 'Select at least one service.'
    if (!form.date) errs.date = 'Please choose a date.'
    if (new Date(form.date) < new Date(today))
      errs.date = 'Date cannot be in the past.'
    if (form.referred === 'Yes' && !form.referredBy.trim())
      errs.referredBy = 'Please tell us who referred you.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const handlePhoneBlur = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setForm(f => ({ ...f, phone: formatted }))
  }

  const handleServiceChange = (e) => {
    const { value, checked } = e.target
    setForm(f => ({
      ...f,
      services: checked
        ? [...f.services, value]
        : f.services.filter(s => s !== value),
    }))
    if (errors.services) setErrors(e => ({ ...e, services: '' }))
  }

  const handleSelectAll = (e) => {
    setForm(f => ({
      ...f,
      services: e.target.checked ? services.map(s => s.slug) : [],
    }))
    if (errors.services) setErrors(e => ({ ...e, services: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setStatus('')
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmittedPhone(form.phone)
      setStatus('SENT')
      setForm({
        name: '',
        phone: '',
        services: [],
        date: today,
        referred: 'No',
        referredBy: '',
        message: '',
      })
    } catch {
      setStatus('ERROR')
    } finally {
      setLoading(false)
    }
  }

  // === Thank you screen ===
  if (status === 'SENT') {
    return (
      <section className={styles.main}>
        <Image
          src="/images/Logo.png"
          alt="RealFrames Logo"
          width={120}
          height={120}
          className={styles.thankLogo}
        />
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.intro}>
          We appreciate you taking the time to reach out. A member of our team will contact you
          at <strong>{submittedPhone}</strong> within the next 2–3 business days.
        </p>
        <p className={styles.intro}>
          If you need immediate assistance, please call us at <strong>647‑123‑4567</strong>.
        </p>
      </section>
    )
  }

  // === Form screen ===
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.intro}>
        You can call 647‑123‑4567 or DM us on Instagram at @realframes
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <label className={styles.label} htmlFor="name">
          <span className={styles.req}>*</span> Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        {/* Phone */}
        <label className={styles.label} htmlFor="phone">
          <span className={styles.req}>*</span> Phone
        </label>
        <div className={styles.phoneRow}>
          <div className={styles.plusOne}>+1</div>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={styles.input}
            value={form.phone}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            placeholder="6477452016"
            required
          />
        </div>
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}

        {/* Services */}
        <p className={styles.label}>
          <span className={styles.req}>*</span> Services Required
        </p>
        <div className={styles.servicesGrid}>
          {services.map(svc => {
            const id = `service-${svc.slug}`
            return (
              <div key={id}>
                <input
                  type="checkbox"
                  id={id}
                  name="services"
                  value={svc.slug}
                  checked={form.services.includes(svc.slug)}
                  onChange={handleServiceChange}
                />
                <label className={styles.checkboxLabel} htmlFor={id}>
                  {svc.title}
                </label>
              </div>
            )
          })}
          <div>
            <input
              type="checkbox"
              id="service-all"
              name="selectAll"
              checked={form.services.length === services.length}
              onChange={handleSelectAll}
            />
            <label className={styles.checkboxLabel} htmlFor="service-all">
              Select All
            </label>
          </div>
        </div>
        {errors.services && <p className={styles.error}>{errors.services}</p>}

        {/* Date */}
        <label className={styles.label} htmlFor="date">
          <span className={styles.req}>*</span> Appointment Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className={styles.input}
          value={form.date}
          onChange={handleChange}
          min={today}
          required
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}

        {/* Referral */}
        <div className={styles.radioGroup}>
          <p className={styles.label}>
            <span className={styles.req}>*</span> How did you hear about us?
          </p>
          {['Yes', 'No'].map(val => (
            <div key={val}>
              <input
                type="radio"
                id={`ref-${val}`}
                name="referred"
                value={val}
                checked={form.referred === val}
                onChange={handleChange}
              />
              <label htmlFor={`ref-${val}`}>{val}</label>
            </div>
          ))}
        </div>

        {form.referred === 'Yes' && (
          <>
            <label className={styles.label} htmlFor="referredBy">
              <span className={styles.req}>*</span> Who referred you?
            </label>
            <input
              id="referredBy"
              name="referredBy"
              type="text"
                  className={styles.input}
              value={form.referredBy}
              onChange={handleChange}
              required
            />
            {errors.referredBy && <p className={styles.error}>{errors.referredBy}</p>}
          </>
        )}

        {/* Message */}
        <label className={styles.label} htmlFor="message">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        {/* Submit */}
        <div className={styles.addBtnWrap}>
          <button type="submit" className={styles.addBtn} disabled={loading}>
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </div>

        {status === 'ERROR' && (
          <p className={styles.error}>❌ Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  )
}
