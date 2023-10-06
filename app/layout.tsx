import { NEXTUIPROVIDER } from '@/providers/nextui-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
        <main className='h-full'>
        <AuthProvider>
          <NEXTUIPROVIDER>
            {children}
          </NEXTUIPROVIDER>
        </AuthProvider>
        </main>
      </body>
    </html>
  )
}
