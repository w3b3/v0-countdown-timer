'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeColor() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const updateThemeColor = () => {
      const currentTheme = theme === 'system' ? systemTheme : theme
      const themeColor = currentTheme === 'dark' ? '#111827' : '#0077B5'

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

      metaStatusBar.content = currentTheme === 'dark' ? 'black-translucent' : 'default'
    }

    updateThemeColor()
  }, [theme, systemTheme])

  return null
}
