'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from '@/lib/use-scroll-lock'

type WinWindowProps = {
  title: string
  icon?: ReactNode
  onClose: () => void
  children: ReactNode
  width?: number
  labelledById?: string
}

export function WinWindow({
  title,
  icon,
  onClose,
  children,
  width = 460,
  labelledById,
}: WinWindowProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useScrollLock(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    overlayRef.current?.scrollTo(0, 0)
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 cursor-default border-0 bg-black/35 p-0"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex min-h-full items-center justify-center p-3 sm:p-6"
        style={{ minHeight: '100dvh' }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledById}
          className="bevel-out my-4 w-full bg-win p-[3px]"
          style={{ maxWidth: width }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="titlebar flex items-center justify-between px-1 py-[3px]">
            <div className="flex min-w-0 items-center gap-1.5 pl-1">
              {icon}
              <span id={labelledById} className="truncate text-[13px] leading-none">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-[2px] pr-[1px]">
              <button
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                className="btn95 grid h-[18px] w-[18px] place-items-center !p-0 text-[10px] font-bold"
              >
                _
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close window"
                className="btn95 grid h-[18px] w-[18px] place-items-center !p-0 text-[11px] font-bold leading-none"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto px-3 py-3 text-[14px] text-black">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
