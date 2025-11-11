'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioGallery from '../../../components/Portfolio/Portfolio';
import { interiorImages, exteriorImages, eastMallVideo, eastMallPoster } from '../../../data/galleryImages';
import styles from './page.module.scss';

export default function CategoryPage() {
  const { category } = useParams();

  const isEastMall = category === 'eastmall';
  const heading =
    isEastMall
      ? '137-366 The East Mall'
      : category === 'interior'
      ? 'Interior Gallery'
      : 'Exterior Gallery';

  const images = isEastMall
    ? []
    : category === 'interior'
    ? interiorImages
    : exteriorImages;

  return (
    <main className={styles.main}>
      <Link href="/portfolio" className={styles.backButton}>
        &larr; Back to Portfolio
      </Link>

      <h1 className={styles.heading}>{heading}</h1>

      {isEastMall ? (
        <div className={styles.videoWrap}>
          <video
            src={eastMallVideo}
            poster={eastMallPoster}
            className={styles.video}
            controls
            playsInline
            preload="metadata"
            aria-label="137-366 The East Mall walkthrough"
          />
        </div>
      ) : (
        <>
          <p className={styles.instruction}><em>Click an image to enlarge</em></p>
          <PortfolioGallery images={images} />
        </>
      )}
    </main>
  );
}
