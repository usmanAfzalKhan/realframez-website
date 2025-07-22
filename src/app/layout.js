// src/app/layout.js
import '@styles/globals.scss'

export const metadata = {
  title: 'RealFramez',
  description: 'Professional real estate photography portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>  
    </html>
  )
}
