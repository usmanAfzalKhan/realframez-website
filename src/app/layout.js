// src/app/layout.js
import '../../styles/globals.scss'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'RealFramez | Real Estate Photography',
  description: 'Premium Real Estate Photography and Media Services',
  icons: {
    icon: '/images/Logo.png',
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
        {/* Fallback favicon link */}
        <link rel="icon" href="/images/Logo.png" />
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
