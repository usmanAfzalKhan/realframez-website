import Link from 'next/link';
import GallerySlideshow from '../../../../components/GallerySlideshow/GallerySlideshow';
import AgentContactCard from '../../../../components/AgentContactCard/AgentContactCard';
import { galleriesBySlug } from '../../../../data/galleryImages';
import styles from './page.module.scss';

export const metadata = {
  title: '3309 Joliffe Ave — Slideshow',
};

export default function JoliffeSlideshowPage() {
  const gallery = galleriesBySlug['3309-joliffe-ave'];

  if (!gallery) {
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
        <Link href="/portfolio/3309-joliffe-ave" className={styles.backLink}>
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

        <GallerySlideshow images={gallery.images} autoPlay intervalMs={3500} />

        <AgentContactCard
          photoSrc="/images/gallery/3309-joliffe-ave/ghuman.webp"
          brokerage="HomeLife/Miracle Realty Ltd"
          name="Surjit Ghuman"
          website="https://www.surjitghuman.ca"
          websiteLabel="www.surjitghuman.ca"
          phone="416.841.1900"
          phoneTel="+14168411900"
          email="surjitghuman@gmail.com"
        />
      </div>
    </main>
  );
}
