'use client';

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from 'firebase/analytics';

let appInstance: FirebaseApp | null = null;
let performanceInstance: ReturnType<typeof getPerformance> | null = null;
let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

export function getFirebase(): FirebaseApp {
  if (!appInstance) {
    appInstance = initializeApp({
      apiKey: 'AIzaSyCBiCKj-dMrsG7Uj8U789vpChOuhyXTCqg',
      authDomain: 'daniel-santos-simplest.firebaseapp.com',
      projectId: 'daniel-santos-simplest',
      storageBucket: 'daniel-santos-simplest.firebasestorage.app',
      messagingSenderId: '403830184710',
      appId: '1:403830184710:web:2ab7d1ba7f70311e199c87',
      measurementId: 'G-PWXVXCF29B'
    });
  }

  return appInstance;
}

// Initialize performance monitoring (only in browser)
export function initializePerformance() {
  if (typeof window !== 'undefined' && !performanceInstance) {
    try {
      const app = getFirebase();
      performanceInstance = getPerformance(app);
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }
  return performanceInstance;
}

// Initialize analytics (only in browser)
export function initializeAnalytics() {
  if (typeof window !== 'undefined' && !analyticsInstance) {
    try {
      const app = getFirebase();
      analyticsInstance = getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }
  return analyticsInstance;
}

