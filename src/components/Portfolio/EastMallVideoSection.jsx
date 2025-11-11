import styles from './Portfolio.module.scss';
import { eastMallVideo } from '@/data/galleryImages';

export default function EastMallVideoSection() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>366 The East Mall</h2>
      <p className={styles.instruction}>Walkthrough video</p>

      <div className={styles.grid}>
        <div className={styles.thumb}>
          {/* 16:9 tile with native controls */}
          <video
            src={eastMallVideo}
            className={styles.image}
            controls
            playsInline
            preload="metadata"
            aria-label="366 The East Mall walkthrough"
          />
        </div>
      </div>
    </section>
  );
}
