import '../../styles/globals.scss'
import Header from '../components/Header/Header'

export const metadata = {
  title: 'RealFramez',
  description: 'Professional real estate photography portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
