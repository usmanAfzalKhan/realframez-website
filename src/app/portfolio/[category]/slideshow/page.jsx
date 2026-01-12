import Link from 'next/link';
import { galleriesBySlug } from '../../../../data/galleryImages';
import { servicesBySlug } from '../../../../data/serviceGalleries';
import { services } from '../../../../data/services';
import SlideshowClient from './SlideshowClient';

// ✅ keep Joliffe styling so it looks identical everywhere
import styles from '../../3309-joliffe-ave/slideshow/page.module.scss';

function fallbackServiceGallery(slug) {
  if (!slug || !Array.isArray(services)) return null;
  const svc = services.find((s) => s?.slug === slug);
  if (!svc) return null;

  return {
    slug: svc.slug,
    title: svc.title,
    images: Array.isArray(svc.images) ? svc.images : [],
  };
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const gallery =
    slug ? (galleriesBySlug[slug] || servicesBySlug[slug] || fallbackServiceGallery(slug)) : null;

  const title = gallery?.address || gallery?.title;

  return {
    title: title ? `${title} — Slideshow` : 'Slideshow',
  };
}

export default async function SlideshowPage({ params }) {
  const { category: slug } = await params;
  const gallery =
    slug ? (galleriesBySlug[slug] || servicesBySlug[slug] || fallbackServiceGallery(slug)) : null;

  const hasImages = !!gallery?.images?.length;
  const title = gallery?.address || gallery?.title || 'Slideshow';

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
            {title} <span className={styles.titleMuted}></span>
          </h1>
          <p className={styles.sub}>Use the arrows to navigate. Play/Pause toggles auto.</p>
        </header>

        <SlideshowClient images={gallery.images} />
      </div>
    </main>
  );
}
