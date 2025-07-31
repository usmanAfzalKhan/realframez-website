'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { interiorImages, exteriorImages } from '../../data/galleryImages';
import styles from './PortfolioLanding.module.scss';

const PREVIEW_COUNT = 3;
const ROTATE_INTERVAL = 6000;

function RotatingCard({ href, title, description, images }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <Link href={href} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            key={idx}
            src={images[idx]}
            alt={`${title} preview ${idx + 1}`}
            fill
            sizes="(min-width:640px) 45vw, 90vw"
            className={styles.image}
            priority={idx === 0}
          />
          <div className={styles.cardLogo}>
            <Image
              src="/images/logo.png"
              alt="RealFramez Logo"
              width={40}
              height={40}
              priority
            />
          </div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardSubtitle}>{description}</p>
        </div>
      </article>
    </Link>
  );
}

export default function PortfolioLanding() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfolio</h1>
      <div className={styles.cards}>
        <RotatingCard
          href="/portfolio/interior"
          title="Interior Gallery"
          description="Showcase rooms with natural lighting and meticulous composition."
          images={interiorImages.slice(0, PREVIEW_COUNT)}
        />
        <RotatingCard
          href="/portfolio/exterior"
          title="Exterior Gallery"
          description="Capture the curb appeal and landscape of the property."
          images={exteriorImages.slice(0, PREVIEW_COUNT)}
        />
      </div>
    </main>
  );
}
