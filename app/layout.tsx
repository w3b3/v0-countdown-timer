import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daniel Santos',
  description: 'Let\'s connect and chat about life, work, and everything in between',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        {children}
      </body>
    </html>
  )
}
