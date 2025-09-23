'use client';

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

let appInstance: FirebaseApp | null = null;
let analyticsInstance: Analytics | null = null;

export async function getFirebase(): Promise<{ app: FirebaseApp; analytics: Analytics | null }> {
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

  if (!analyticsInstance && typeof window !== 'undefined') {
    try {
      if (await isSupported()) {
        analyticsInstance = getAnalytics(appInstance);
      }
    } catch {
      analyticsInstance = null;
    }
  }

  return { app: appInstance, analytics: analyticsInstance };
}


