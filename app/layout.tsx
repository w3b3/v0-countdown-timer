import './globals.css'

export const metadata = {
  title: 'Daniel Santos',
  description: "Let's connect and chat about life, work, and everything in between",
  keywords: 'Daniel Santos, contact, portfolio, jiu-jitsu, software development',
  authors: [{ name: 'Daniel Santos' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Daniel Santos - Let\'s Connect',
    description: "Let's connect and chat about life, work, and everything in between",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Santos - Let\'s Connect',
    description: "Let's connect and chat about life, work, and everything in between",
  },
  manifest: '/manifest.json',
  // Cloudflare-specific optimizations
  other: {
    'cf-mobile-redirect': 'false', // Prevent automatic mobile redirects
    'cf-polish': 'lossless', // Enable Cloudflare Polish for images
    'cf-mirage': 'true', // Optimize for mobile performance
    'cf-cache-everything': 'true', // Cache everything at edge
    'cf-railgun': 'true', // Enable Railgun for faster connections
    'cf-minify': 'js,css,html', // Minify at edge
    'amp-google-client-id-api': 'googleanalytics', // AMP optimization
  },
}

import { ThemeProvider } from '@/components/theme-provider'
import { ThemeColor } from '@/components/theme-color'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/placeholder-logo.svg" />
        <meta name="theme-color" content="#0077B5" />

        {/* Cloudflare Web Analytics - Privacy-focused alternative to GA */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "your-cloudflare-analytics-token"}'
        />

        {/* Cloudflare performance optimizations */}
        <link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
        <link rel="preconnect" href="//static.cloudflareinsights.com" />

        {/* Cloudflare Mirage optimization for mobile */}
        <meta name="cf-mirage" content="true" />

        {/* Cloudflare performance and security */}
        <meta name="cf-polish" content="lossless" />
        <meta name="cf-cache-everything" content="true" />
        <meta name="cf-minify" content="js,css,html" />

        {/* Mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* Cloudflare country detection for localization */}
        <meta name="cf-ipcountry" content="" />

        {/* Theme color - will be dynamically updated by ThemeColor component */}
        <ThemeColor />
      </head>
      <body className="min-h-screen flex items-center justify-center" style={{colorScheme: 'light dark'}}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}