// app/layout.js
import Script from 'next/script'
import '../../styles/globals.scss'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  metadataBase: new URL('https://www.realframes.ca'),
  title: 'Real Frames | Real Estate Media',
  description: 'Premium Real Estate Photography and Media Services',

  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },

  openGraph: {
    title: 'Real Frames | Real Estate Media',
    description: 'Premium Real Estate Photography and Media Services',
    url: 'https://www.realframes.ca',
    siteName: 'Real Frames',
    images: [
      {
        url: '/images/hero/1.webp',
        width: 1200,
        height: 630,
        alt: 'Real Frames real estate photography and media',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Real Frames | Real Estate Media',
    description: 'Premium Real Estate Photography and Media Services',
    images: ['/images/hero/1.webp'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({ children }) {
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Real Frames | Real Estate Media',
    url: 'https://www.realframes.ca',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://www.realframes.ca/images/hero/1.webp',
    },
  }

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

        {/* Preferred Google search thumbnail */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

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
        {/* Google tag - only loads after you add NEXT_PUBLIC_GOOGLE_TAG_ID in Netlify */}
        {googleTagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-tag"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${googleTagId}');
                `,
              }}
            />
          </>
        )}

        <ScrollToTop />
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}