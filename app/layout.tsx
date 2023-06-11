import { Footer, NavBar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'Freneticar',
  description: 'We got the car for your journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
