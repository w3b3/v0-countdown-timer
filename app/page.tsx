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
    <main className="flex flex-col font-sans p-4 max-w-[300px] mx-auto">
      <h1 className="text-6xl mb-4 text-center">
        {isLoading ? '👋🏼 Hi' : greeting} Daniel S.
      </h1>

      {/* <p className="text-xl mb-8 text-center max-w-[600px]">
        Let's connect!
      </p> */}

      <div className="flex flex-col gap-3 max-w-[360px] w-full">
        <a
          href="https://www.linkedin.com/in/brasileiro?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 no-underline rounded-md transition-colors"
          style={{
            backgroundColor: 'var(--link-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--link-bg)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--link-hover)';
            e.currentTarget.style.borderColor = 'var(--link-hover)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--link-bg)';
            e.currentTarget.style.borderColor = 'var(--link-bg)';
          }}
        >
          <span className="text-lg">🔗</span>
          <span>LinkedIn</span>
        </a>

        {/* <a
          href="https://github.com/w3b3?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-[#333] hover:bg-[#333]/90 text-white no-underline rounded-md transition-colors"
        >
          <span className="text-lg">📁</span>
          <span>GitHub</span>
        </a> */}

        {/* <a
          href="https://wa.me/18199195996?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#25D366]/90 text-[#012b18] no-underline rounded-md transition-colors"
        >
          <span className="text-lg">📱</span>
          <span>WhatsApp</span>
        </a> */}

        {/* <a
          href="mailto:iam@w-b.dev?subject=Contact%20from%20Personal%20Site%20-%20utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          className="flex items-center gap-3 px-4 py-3 bg-[#b30000] hover:bg-[#b30000]/90 text-white no-underline rounded-md transition-colors"
        >
          <span className="text-lg">✉️</span>
          <span>Email</span>
        </a> */}

        <a
          href="https://tatame0.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 no-underline rounded-md transition-colors"
          style={{
            backgroundColor: 'var(--dark-link-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--dark-link-bg)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--dark-link-hover)';
            e.currentTarget.style.borderColor = 'var(--dark-link-hover)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--dark-link-bg)';
            e.currentTarget.style.borderColor = 'var(--dark-link-bg)';
          }}
        >
          <span className="text-lg">🥋</span>
          <span>Tatame0 - the best jiu-jitsu school app in the world</span>
        </a>

        <a
          href="https://willis-brown.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 no-underline rounded-md transition-colors"
          style={{
            backgroundColor: 'var(--dark-link-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--dark-link-bg)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--dark-link-hover)';
            e.currentTarget.style.borderColor = 'var(--dark-link-hover)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--dark-link-bg)';
            e.currentTarget.style.borderColor = 'var(--dark-link-bg)';
          }}
        >
          <span className="text-lg">🏢</span>
          <span>Willis Brown Inc.</span>
        </a>
      </div>
    </main>
  )
}
