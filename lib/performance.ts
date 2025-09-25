'use client';

// Core Web Vitals tracking
export function trackCoreWebVitals() {
  if (typeof window === 'undefined') return;

  // Track Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        const lcp = entry.startTime;
        console.log('LCP:', lcp);

        // Send to analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lcp),
            event_category: 'Web Vitals'
          });
        }
      }
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // Track First Input Delay (FID)
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fid = entry.processingStart - entry.startTime;
      console.log('FID:', fid);

      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
          name: 'FID',
          value: Math.round(fid),
          event_category: 'Web Vitals'
        });
      }
    }
  }).observe({ type: 'first-input', buffered: true });

  // Track Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name: 'CLS',
        value: Math.round(clsValue * 1000),
        event_category: 'Web Vitals'
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });
}

// Track page load performance
export function trackPageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;

      console.log('Page Load Time:', loadTime);
      console.log('DOM Content Loaded:', domContentLoaded);

      // Send to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_performance', {
          load_time: Math.round(loadTime),
          dom_content_loaded: Math.round(domContentLoaded),
          page_location: window.location.href
        });
      }
    }
  });
}

// Initialize all performance tracking
export function initializePerformanceTracking() {
  trackCoreWebVitals();
  trackPageLoad();
}
