import { NEXTUIPROVIDER } from '@/providers/nextui-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavbarComponent from '@/components/Navbar'
import AuthProvider from '@/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NEXTUIPROVIDER>
            <NavbarComponent />
            {children}
          </NEXTUIPROVIDER>
        </AuthProvider>
      </body>
    </html>
  )
}
