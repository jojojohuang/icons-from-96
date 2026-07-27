import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Welcome to Jo's Homepage!!! - Icons from '96",
  description:
    "A recovered 1996 personal homepage. Icons from '96 — a Halloween housewarming party. RSVP now before the archive closes.",
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#008080',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body style={{ backgroundColor: '#008080' }}>
        <div className="site-content">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
