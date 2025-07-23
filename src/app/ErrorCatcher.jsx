// src/app/ErrorCatcher.jsx
'use client'

import { useEffect } from 'react'

export default function ErrorCatcher({ children }) {
  useEffect(() => {
    // older listener (you can keep or remove)
    const handler = (event) => {
      if (
        event.filename?.includes('hotModuleReplacement.js') &&
        event.message?.includes('removeChild')
      ) {
        event.preventDefault()
      }
    }
    window.addEventListener('error', handler)

    // global onerror
    const oldOnError = window.onerror
    window.onerror = (message, source) => {
      if (
        typeof source === 'string' &&
        source.includes('hotModuleReplacement.js') &&
        typeof message === 'string' &&
        message.includes('removeChild')
      ) {
        // returning true prevents it from logging
        return true
      }
      if (oldOnError) return oldOnError(message, source)
    }

    return () => {
      window.removeEventListener('error', handler)
      window.onerror = oldOnError
    }
  }, [])

  return <>{children}</>
}
