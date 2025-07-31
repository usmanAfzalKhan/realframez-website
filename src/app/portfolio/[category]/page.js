'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioGallery from '../../../components/Portfolio/Portfolio';
import { interiorImages, exteriorImages } from '../../../data/galleryImages';
import styles from './page.module.scss';

export default function CategoryPage() {
  const { category } = useParams();
  const heading = category === 'interior' ? 'Interior Gallery' : 'Exterior Gallery';
  const images  = category === 'interior' ? interiorImages : exteriorImages;

  return (
    <main className={styles.main}>
      <Link href="/portfolio" className={styles.backButton}>
        &larr; Back to Portfolio
      </Link>

      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.instruction}><em>Click an image to enlarge</em></p>

      <PortfolioGallery images={images} />
    </main>
  );
}
