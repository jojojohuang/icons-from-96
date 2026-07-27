'use client'

import { useEffect } from 'react'

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const scrollY = window.scrollY
    const { style: bodyStyle } = document.body
    const { style: htmlStyle } = document.documentElement
    const prev = {
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      bodyOverflow: bodyStyle.overflow,
      htmlOverflow: htmlStyle.overflow,
    }

    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    htmlStyle.overflow = 'hidden'

    return () => {
      bodyStyle.position = prev.bodyPosition
      bodyStyle.top = prev.bodyTop
      bodyStyle.width = prev.bodyWidth
      bodyStyle.overflow = prev.bodyOverflow
      htmlStyle.overflow = prev.htmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [active])
}
