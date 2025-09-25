'use client';

import { initializeApp, type FirebaseApp } from 'firebase/app';

let appInstance: FirebaseApp | null = null;

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


