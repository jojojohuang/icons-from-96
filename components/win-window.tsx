'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        className="bevel-out mt-6 w-full bg-win p-[3px] sm:mt-16"
        style={{ maxWidth: width }}
      >
        {/* Title bar */}
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

        {/* Body */}
        <div className="px-3 py-3 text-[14px] text-black">{children}</div>
      </div>
    </div>
  )
}
