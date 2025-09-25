'use client'

import React from 'react';

export interface LocationInfo {
  country: string | null;
  isBrazil: boolean;
  greeting: string;
  isLoading: boolean;
}

export function useLocation(): LocationInfo {
  const [locationInfo, setLocationInfo] = React.useState<LocationInfo>({
    country: null,
    isBrazil: false,
    greeting: '👋🏼 Hi!',
    isLoading: true
  });

  React.useEffect(() => {
    const detectLocation = async () => {
      try {
        // Method 1: Check Cloudflare country header (most reliable for Cloudflare proxy)
        const cloudflareCountry = (document as unknown as { CF_IPCountry?: string }).CF_IPCountry ||
                                 (window as unknown as { CF_IPCountry?: string }).CF_IPCountry ||
                                 document.querySelector('meta[name="cf-ipcountry"]')?.getAttribute('content');

        if (cloudflareCountry) {
          const isBrazil = cloudflareCountry.toLowerCase() === 'br';
          setLocationInfo({
            country: cloudflareCountry,
            isBrazil,
            greeting: isBrazil ? '👋🏼 Oi' : '👋🏼 Hi!',
            isLoading: false
          });
          return;
        }

        // Method 2: Use IP-based geolocation API as fallback
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const isBrazil = data.country_code === 'BR' || data.country_name === 'Brazil';
          setLocationInfo({
            country: data.country_code,
            isBrazil,
            greeting: isBrazil ? '👋🏼 Oi' : '👋🏼 Hi!',
            isLoading: false
          });
          return;
        }

        // Method 3: Use browser language as last resort
        const browserLang = navigator.language || navigator.userLanguage;
        const isPortuguese = browserLang.startsWith('pt');
        setLocationInfo({
          country: 'unknown',
          isBrazil: isPortuguese, // Portuguese speakers likely to be Brazilian
          greeting: isPortuguese ? '👋🏼 Oi' : '👋🏼 Hi!',
          isLoading: false
        });

      } catch (error) {
        console.warn('Failed to detect location, using default greeting:', error);
        // Fallback to default
        setLocationInfo({
          country: 'unknown',
          isBrazil: false,
          greeting: '👋🏼 Hi!',
          isLoading: false
        });
      }
    };

    detectLocation();
  }, []);

  return locationInfo;
}
