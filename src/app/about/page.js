// src/app/about/page.js
export const metadata = {
  title: 'About – RealFramez',
  description: 'Learn more about RealFramez and our real estate photography services.',
}

export default function AboutPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About RealFramez</h1>
      <p>
        RealFramez was founded to bring professional, high‑quality real estate
        photography within reach of every agent and homeowner. With years of
        experience capturing interiors, exteriors, aerial drone shots, and
        twilight scenes, our work helps properties stand out and sell faster.
      </p>
      <p>
        We pride ourselves on quick turnaround, attention to detail, and a
        commitment to showcasing your property in its best light. Let us help
        you make a lasting impression on potential buyers.
      </p>
    </main>
  )
}
