import { NEXTUIPROVIDER } from '@/providers/nextui-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/auth-provider'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from '@/providers/socket-provider'

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
          <Toaster />
          <SocketProvider>
            <AuthProvider>
              <NEXTUIPROVIDER>
                {children}
              </NEXTUIPROVIDER>
            </AuthProvider>
          </SocketProvider>
        </main>
      </body>
    </html>
  )
}
