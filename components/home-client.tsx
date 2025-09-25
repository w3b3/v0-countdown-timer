"use client"

import React, { useEffect, useState } from 'react'
import { initializePerformance, initializeAnalytics, getFirebase } from '@/lib/firebase'
import { initializePerformanceTracking } from '@/lib/performance'

export default function HomeClient() {
  const [greeting, setGreeting] = useState('👋🏼,💻,👋🏼,🥋,👋🏼 ☕️')

  useEffect(() => {
    // Initialize Firebase app (client-safe)
    getFirebase()

    if (typeof window !== 'undefined') {
      initializePerformance()
      initializeAnalytics()
      initializePerformanceTracking()
    }

    // Detect location and update greeting
    const detectLocation = async () => {
      try {
        // Method 1: Check Cloudflare country header (most reliable for Cloudflare proxy)
        const cloudflareCountry = (document as unknown as { CF_IPCountry?: string }).CF_IPCountry ||
                                 (window as unknown as { CF_IPCountry?: string }).CF_IPCountry ||
                                 document.querySelector('meta[name="cf-ipcountry"]')?.getAttribute('content')

        if (cloudflareCountry) {
          const isBrazil = cloudflareCountry.toLowerCase() === 'br'
          setGreeting(isBrazil ? '👋🏼 Oi, eu sou o Daniel' : '👋🏼 Hi, I\'m Daniel')
          return
        }

      } catch (error) {
        console.warn('Failed to detect location, using default greeting:', error)
        // Keep default greeting
      }
    }

    detectLocation()
  }, [])

  return (
    <main>
      <div className="greeting-section">
        <h1>{greeting}</h1>
      </div>

      <div className="links-section">
        <a
          href="https://www.linkedin.com/in/brasileiro?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="linkedin-link"
        >
          <span className="emoji">🔗</span>
          <span className="text">LinkedIn</span>
        </a>

        <a
          href="https://tatame0.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="secondary-link"
        >
          <span className="emoji">🥋</span>
          <span className="text">Tatame0 - the best jiu-jitsu school app in the world</span>
        </a>

        <a
          href="https://willis-brown.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="secondary-link"
        >
          <span className="emoji">🏢</span>
          <span className="text">Willis Brown Inc.</span>
        </a>
      </div>
    </main>
  )
}
