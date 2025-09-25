"use client";

import { useEffect } from 'react';
import { initializePerformance, initializeAnalytics, getFirebase } from '../lib/firebase';
import { initializePerformanceTracking } from '../lib/performance';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomePage() {
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-6xl mb-4 text-center flex-1">
          👋🏼 Daniel S.
        </h1>
        <ThemeToggle />
      </div>

      {/* <p className="text-xl mb-8 text-center max-w-[600px]">
        Let's connect!
      </p> */}

      <div className="flex flex-col gap-3 max-w-[360px] w-full">
        <a
          href="https://www.linkedin.com/in/brasileiro?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-[#0077B5] hover:bg-[#0077B5]/90 text-white no-underline rounded-md transition-colors"
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
          className="flex items-center gap-3 px-4 py-3 bg-[#111827] hover:bg-[#111827]/90 text-white no-underline rounded-md transition-colors"
        >
          <span className="text-lg">🥋</span>
          <span>Tatame0 - the best jiu-jitsu school app in the world</span>
        </a>

        <a
          href="https://willis-brown.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-[#222] hover:bg-[#222]/90 text-white no-underline rounded-md transition-colors"
        >
          <span className="text-lg">🏢</span>
          <span>Willis Brown Inc.</span>
        </a>
      </div>
    </main>
  )
}
