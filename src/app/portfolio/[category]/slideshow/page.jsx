import Link from 'next/link';
import { galleriesBySlug } from '../../../../data/galleryImages';
import SlideshowClient from './SlideshowClient';

// ✅ keep Joliffe styling so it looks identical everywhere
import styles from '../../3309-joliffe-ave/slideshow/page.module.scss';

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const gallery = slug ? galleriesBySlug[slug] : null;

  return {
    title: gallery?.address ? `${gallery.address} — Slideshow` : 'Slideshow',
  };
}

export default async function SlideshowPage({ params }) {
  const { category: slug } = await params;
  const gallery = slug ? galleriesBySlug[slug] : null;

  const hasImages = !!gallery?.images?.length;

  if (!gallery || !hasImages) {
    return (
      <main className={styles.main}>
        <div className={styles.inner}>
          <Link href="/portfolio" className={styles.backLink}>
            ← Back to Portfolio
          </Link>

          <h1 className={styles.title}>Slideshow</h1>
          <p className={styles.sub}>We couldn&apos;t find this gallery.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href={`/portfolio/${slug}`} className={styles.backLink}>
          ← Back to gallery
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>
            {gallery.address} <span className={styles.titleMuted}></span>
          </h1>
          <p className={styles.sub}>
            Use the arrows to navigate. Play/Pause toggles auto.
          </p>
        </header>

        <SlideshowClient images={gallery.images} />
      </div>
    </main>
  );
}
