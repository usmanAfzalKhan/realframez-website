// src/app/services/[slug]/page.js

import Link from 'next/link'
import { getServiceBySlug } from '../../../data/services'
import styles from './ServiceDetail.module.scss'

export default function ServiceDetailPage({ params }) {
  const { slug } = params
  const svc = getServiceBySlug(slug)
  if (!svc) return <div className={styles.main}><div className={styles.notFound}>Service Not Found</div></div>

  return (
    <div className={styles.main}>
      {/* Back to Services, with extra margin-top for breathing space */}
      <div className={styles.backWrap}>
        <Link href="/services" className={styles.backBtn}>&larr; Back to Services</Link>
      </div>
      <h1>{svc.title}</h1>
      <div className={styles.album}>
        {svc.images.map((img, i) => (
          <div className={styles.imgBox} key={i}>
            <img
              src="/images/placeholder.svg"
              alt="Placeholder"
              className={styles.placeholder}
              style={{ width: 48, height: 48, objectFit: 'contain', opacity: 0.7 }}
            />
          </div>
        ))}
      </div>
      <p className={styles.desc}>{svc.description}</p>
      <div className={styles.priceBox}>
        <div className={styles.starting}>Starting from <span>${svc.price}</span></div>
        <button className={styles.bookBtn}>Book Now</button>
      </div>
    </div>
  )
}
