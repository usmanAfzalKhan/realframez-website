// app/layout.js
import '../../styles/globals.scss'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'Real Frames | Real Estate Media',
  description: 'Premium Real Estate Photography and Media Services',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#121624" />

        {/* Speed up DNS & TCP for your media host */}
        <link rel="preconnect" href="https://realframes.netlify.app/" />
        <link rel="dns-prefetch" href="https://realframes.netlify.app/" />

        {/* Preload first slide video */}
        <link
          rel="preload"
          href="/videos/slide1-welcome-desktop.mp4"
          as="video"
        />
        <link
          rel="preload"
          href="/videos/slide1-welcome-mobile.mp4"
          as="video"
          media="(max-width: 767px)"
        />

        {/* Preload first slide posters (WebP) */}
        <link
          rel="preload"
          href="/images/hero/slide1-welcome-desktop-poster.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/images/hero/slide1-welcome-mobile-poster.webp"
          as="image"
          media="(max-width: 767px)"
        />

        {/* Fallback favicon */}
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </head>
      <body>
        <ScrollToTop />
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
