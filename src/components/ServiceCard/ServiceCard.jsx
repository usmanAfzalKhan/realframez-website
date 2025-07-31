'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getServiceBySlug } from '../../data/services';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({ title, description, slug }) {
  const svc = getServiceBySlug(slug);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // pick exterior for card
  const cardImgs = svc.cardImages ?? svc.images;
  const src = isMobile ? cardImgs[1] : cardImgs[0];

  return (
    <Link href={`/services/${slug}`} className={styles.svcCard}>
      <div className={styles.svcImageWrap}>
        <Image
          src={src}
          alt={svc.title}
          fill
          className={styles.image}
          priority
        />
        <div className={styles.logoOverlay}>
          <Image
            src="/images/logo.png"
            alt="RealFramez Logo"
            width={28}
            height={28}
            priority
          />
        </div>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className={styles.viewBtn}>View Details</button>
    </Link>
  );
}
