import { Cairo } from 'next/font/google'
import './globals.css'

const inter = Cairo({ subsets: ['latin', 'arabic'] })

export const metadata = {
  title: 'Alex Assets',
  description: 'عرض تفاعلي مع خرائط لعرض أُصول الإسكندرية',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}