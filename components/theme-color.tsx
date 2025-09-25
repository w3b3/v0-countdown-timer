'use client'

import { useEffect } from 'react'

export function ThemeColor() {
  useEffect(() => {
    const updateThemeColor = () => {
      // Always use system theme - no manual override
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      const themeColor = isDarkMode ? '#111827' : '#ffffff'

      // Update or create theme-color meta tag
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }

      metaThemeColor.content = themeColor

      // Also update apple-mobile-web-app-status-bar-style
      let metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (!metaStatusBar) {
        metaStatusBar = document.createElement('meta')
        metaStatusBar.name = 'apple-mobile-web-app-status-bar-style'
        document.head.appendChild(metaStatusBar)
      }

      metaStatusBar.content = isDarkMode ? 'black-translucent' : 'default'
    }

    updateThemeColor()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => updateThemeColor()

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return null
}
