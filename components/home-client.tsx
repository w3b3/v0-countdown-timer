"use client"

import React, { useEffect, useState } from 'react'
import { initializePerformance, initializeAnalytics, getFirebase } from '@/lib/firebase'
import { initializePerformanceTracking } from '@/lib/performance'

export default function HomeClient() {
  const [greeting, setGreeting] = useState('👋🏼 Hi')

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
          setGreeting(isBrazil ? '👋🏼 Oi' : '👋🏼 Hi!')
          return
        }

        // Method 2: Use IP-based geolocation API as fallback
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          const isBrazil = data.country_code === 'BR' || data.country_name === 'Brazil'
          setGreeting(isBrazil ? '👋🏼 Oi' : '👋🏼 Hi!')
          return
        }

        // Method 3: Use browser language as last resort
        const browserLang = navigator.language || navigator.userLanguage
        const isPortuguese = browserLang.startsWith('pt')
        setGreeting(isPortuguese ? '👋🏼 Oi' : '👋🏼 Hi!')

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
        <h1>{greeting} Daniel S.</h1>
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
