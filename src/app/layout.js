// src/app/layout.js
import '../../styles/globals.scss'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const metadata = {
  title: 'RealFramez',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{
          minHeight: 'calc(100vh - 180px)',
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
