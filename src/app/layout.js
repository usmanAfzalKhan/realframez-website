// src/app/layout.js
import '../../styles/globals.scss'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'RealFramez | Real Estate Photography',
  description: 'Premium Real Estate Photography and Media Services',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

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
        {/* Fallback favicon */}
        <link rel="icon" href="/images/logo.png" sizes="any" />

        {/* Preload first slide's video + poster */}
        <link
          rel="preload"
          href="/videos/slide1-welcome-desktop.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/images/hero/slide1-desktop.png"
          as="image"
        />
      </head>
      <body>
        <ScrollToTop />
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
