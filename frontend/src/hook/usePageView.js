import { useEffect, useRef } from 'react'
import { trackPageVisit } from '../utils/trackVisitor'

export default function usePageView (pageName) {
  const trackedRef = useRef(false)

  useEffect(() => {
    if (trackedRef.current) return

    trackedRef.current = true
    trackPageVisit(pageName)
  }, [pageName])
}
