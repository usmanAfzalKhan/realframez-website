'use client'
import { useState } from 'react'
import styles from './Faq.module.scss'
import faq from '../../data/faq'

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className={styles.main}>
      <h1>Frequently Asked Questions</h1>
      <p className={styles.intro}>
        Got a question? We’re here to help. Click any question to expand.
      </p>
      <div className={styles.faqList}>
        {faq.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.faqItem} ${openIdx === idx ? styles.open : ''}`}
          >
            <button
              className={styles.question}
              aria-expanded={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {item.question}
              <span className={styles.toggleIcon}>
                {openIdx === idx ? '−' : '+'}
              </span>
            </button>
            <div
              className={styles.answerWrap}
              style={{
                maxHeight: openIdx === idx ? '400px' : '0',
                opacity: openIdx === idx ? 1 : 0,
              }}
            >
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
