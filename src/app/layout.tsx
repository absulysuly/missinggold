import React from 'react'
import { Metadata, Viewport } from 'next'
import { getServerSession } from 'next-auth'
import './globals.css'
import { ClientLayout } from './components/ClientLayout'
import { authOptions } from '@/lib/auth'

/**
 * Root Layout - Optimized Performance Architecture
 * 
 * Improvements:
 * - Error boundaries for graceful error handling
 * - Suspense boundaries for smooth loading states
 * - Optimized font loading with font-display: swap
 * - RTL support with proper direction handling
 * - Performance hints (preconnect, dns-prefetch)
 * - Security headers
 */

// Metadata configuration for SEO
export const metadata: Metadata = {
  title: {
    default: 'IraqEvents - Discover Events, Hotels & Tourism in Iraq',
    template: '%s | IraqEvents'
  },
  description: 'The leading event management and venue platform for Iraq & Kurdistan. Discover amazing events, hotels, restaurants, and tourism activities.',
  keywords: ['Iraq events', 'Kurdistan events', 'Baghdad hotels', 'Iraq tourism', 'event management', 'venues Iraq'],
  authors: [{ name: 'IraqEvents Team' }],
  creator: 'IraqEvents',
  publisher: 'IraqEvents',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_IQ', 'ku_IQ'],
    url: '/',
    siteName: 'IraqEvents',
    title: 'IraqEvents - Discover Events & Venues in Iraq',
    description: 'The leading event management and venue platform for Iraq & Kurdistan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IraqEvents - Discover Events & Venues in Iraq',
    description: 'The leading event management and venue platform for Iraq & Kurdistan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0019' },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Get the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Performance Hints - Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Font Loading with font-display: swap for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
        {/* Arabic/Kurdish font for RTL support */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Security - Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      
      {/* 
        Suppress hydration warnings caused by:
        - Browser extensions (Grammarly, password managers)
        - Client-only attributes (theme, language direction)
        - Third-party scripts
      */}
      <body 
        suppressHydrationWarning
        className="antialiased min-h-screen"
        style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
        }}
      >
        {/* Client-side providers and error handling */}
        <ClientLayout session={session}>
          {children}
        </ClientLayout>
        
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
      </body>
    </html>
  )
}
