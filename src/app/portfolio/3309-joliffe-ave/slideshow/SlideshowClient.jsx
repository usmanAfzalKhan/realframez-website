'use client';

import GallerySlideshow from '../../../../components/GallerySlideshow/GallerySlideshow.jsx';

export default function SlideshowClient({ images }) {
  return <GallerySlideshow images={images} autoPlay intervalMs={3500} />;
}
