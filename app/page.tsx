"use client";

import { useEffect } from 'react';
import { initializePerformance, initializeAnalytics, getFirebase } from '../lib/firebase';
import { initializePerformanceTracking } from '../lib/performance';
import { useLocation } from '../lib/location';

export default function HomePage() {
  const { greeting, isLoading } = useLocation();

  // Initialize Firebase services and performance tracking on mount
  useEffect(() => {
    // Initialize Firebase app (for SSR compatibility)
    getFirebase();

    // Initialize performance monitoring and analytics (client-side only)
    if (typeof window !== 'undefined') {
      initializePerformance();
      initializeAnalytics();
      initializePerformanceTracking();
    }
  }, []);

  return (
    <main>
      <div className="greeting-section">
        <h1>
          {isLoading ? '👋🏼 Hi' : greeting} Daniel S.
        </h1>
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
