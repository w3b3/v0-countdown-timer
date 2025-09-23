"use client";

import { useEffect } from 'react';
import { getFirebase } from '@/lib/firebase';
import { logEvent, type Analytics } from 'firebase/analytics';

let firebaseAnalytics: Analytics | null = null;

async function ensureAnalyticsLoaded(): Promise<Analytics | null> {
  if (firebaseAnalytics) return firebaseAnalytics;
  const { analytics } = await getFirebase();
  firebaseAnalytics = analytics;
  return analytics;
}

// Enhanced link tracking function
async function trackLinkClick(destination: string, platform: string) {
  const timestamp = new Date().toISOString();
  const userAgent = navigator.userAgent;
  const referrer = document.referrer;

  // Send to Google Analytics (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'link_click', {
      event_category: 'engagement',
      event_label: platform,
      custom_parameter: destination,
      value: 1
    });
  }

  // Send to Firebase Analytics (if supported)
  try {
    const analytics = await ensureAnalyticsLoaded();
    if (analytics) {
      logEvent(analytics, 'link_click', {
        platform,
        destination,
        referrer,
        user_agent: userAgent,
        timestamp
      });
    }
  } catch {}

  // Send to custom analytics endpoint
  try {
    await fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination,
        platform,
        timestamp,
        userAgent,
        referrer
      })
    });
  } catch (error) {
    console.warn('Failed to send analytics data:', error);
  }

  // Log to console for development (remove in production)
  console.log(`Tracked click to ${platform}: ${destination}`);
}

export default function HomePage() {

  useEffect(() => {
    // Warm up analytics on mount
    ensureAnalyticsLoaded();
  }, []);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      padding: '1rem',
      maxWidth: '300px',
      margin: 'auto',
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        Daniel Santos
      </h1>

      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Let's connect and chat about life, work, and everything in between
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '360px',
        width: '100%'
      }}>
        <a href="https://www.linkedin.com/in/brasileiro?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           target="_blank"
           rel="noreferrer"
           onClick={() => trackLinkClick('LinkedIn', 'linkedin')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#0077B5',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🔗</span>
          LinkedIn
        </a>

        <a href="https://github.com/w3b3?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           target="_blank"
           rel="noreferrer"
           onClick={() => trackLinkClick('GitHub', 'github')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#333',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>📁</span>
          GitHub
        </a>

        <a href="https://wa.me/18199195996?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           target="_blank"
           rel="noreferrer"
           onClick={() => trackLinkClick('WhatsApp', 'whatsapp')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#25D366',
             color: '#012b18',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>📱</span>
          WhatsApp
        </a>

        <a href="mailto:iam@w-b.dev?subject=Contact%20from%20Personal%20Site%20-%20utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           onClick={() => trackLinkClick('Email', 'email')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#b30000',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>✉️</span>
          Email
        </a>

        <a href="https://tatame0.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           target="_blank"
           rel="noreferrer"
           onClick={() => trackLinkClick('Tatame0', 'tatame0')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#111827',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🥋</span>
          Tatame0
        </a>

        <a href="https://willis-brown.com?utm_source=personal-site&utm_medium=link&utm_campaign=contact-links"
           target="_blank"
           rel="noreferrer"
           onClick={() => trackLinkClick('Willis Brown', 'willis-brown')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#222',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px'
           }}>
          <span>🏢</span>
          Willis Brown
        </a>

        <a href="/analytics"
           onClick={() => trackLinkClick('Analytics Dashboard', 'analytics')}
           style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             padding: '0.9rem',
             background: '#6b46c1',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '8px',
             marginTop: '1rem',
             justifyContent: 'center'
           }}>
          <span>📊</span>
          View Analytics
        </a>
      </div>
    </main>
  )
}
