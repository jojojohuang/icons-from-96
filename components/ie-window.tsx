'use client'

import type { ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Mail,
  Octagon,
  Printer,
  RefreshCw,
  Search,
  Star,
  Type,
} from 'lucide-react'
import { event } from '@/lib/event-config'

const MENUS = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Help']

function ToolButton({
  icon,
  label,
  onClick,
  title,
}: {
  icon: ReactNode
  label: string
  onClick?: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? label}
      className="btn95 flex min-w-[46px] flex-col items-center gap-[2px] !px-2 !py-1 text-[10px] text-black"
    >
      <span className="text-navy" aria-hidden="true">
        {icon}
      </span>
      <span className="hidden sm:block">{label}</span>
    </button>
  )
}

export function IeWindow({
  children,
  onRefresh,
  onSearch,
}: {
  children: ReactNode
  onRefresh?: () => void
  onSearch?: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="bevel-out bg-win p-[3px]">
        {/* Window title bar */}
        <div className="titlebar flex items-center justify-between px-1 py-[3px]">
          <div className="flex min-w-0 items-center gap-1.5 pl-1">
            <span
              aria-hidden="true"
              className="grid h-[16px] w-[16px] place-items-center bg-ie-link text-[10px] font-black text-white"
            >
              e
            </span>
            <span className="truncate text-[13px] leading-none">
              Welcome to Jo&apos;s Homepage!!! - Microsoft Internet Explorer
            </span>
          </div>
          <div className="flex items-center gap-[2px] pr-[1px]">
            <span className="btn95 grid h-[18px] w-[18px] place-items-center !p-0 text-[10px] font-bold">
              _
            </span>
            <span className="btn95 grid h-[18px] w-[18px] place-items-center !p-0 text-[10px] font-bold">
              □
            </span>
            <span className="btn95 grid h-[18px] w-[18px] place-items-center !p-0 text-[11px] font-bold">
              ×
            </span>
          </div>
        </div>

        {/* Menu bar */}
        <div className="mt-[2px] flex items-center gap-0 px-1 text-[13px] text-black">
          {MENUS.map((m) => (
            <span
              key={m}
              className="menu-item cursor-default px-2 py-[1px] leading-tight"
            >
              <u>{m[0]}</u>
              {m.slice(1)}
            </span>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-[2px] flex flex-wrap items-center gap-[3px] border-y border-win-shadow bg-win px-1 py-1">
          <ToolButton icon={<ArrowLeft size={18} />} label="Back" />
          <ToolButton icon={<ArrowRight size={18} />} label="Forward" />
          <ToolButton icon={<Octagon size={18} />} label="Stop" />
          <ToolButton
            icon={<RefreshCw size={18} />}
            label="Refresh"
            onClick={onRefresh}
          />
          <ToolButton icon={<Home size={18} />} label="Home" onClick={onRefresh} />
          <div className="mx-1 hidden h-8 w-[2px] bg-win-shadow sm:block" />
          <ToolButton icon={<Search size={18} />} label="Search" onClick={onSearch} />
          <ToolButton icon={<Star size={18} />} label="Favorites" />
          <ToolButton icon={<Printer size={18} />} label="Print" />
          <ToolButton icon={<Type size={18} />} label="Font" />
          <ToolButton icon={<Mail size={18} />} label="Mail" />
        </div>

        {/* Address bar */}
        <div className="flex items-center gap-2 bg-win px-2 py-1">
          <span className="text-[13px] text-black">Address</span>
          <div className="bevel-in flex min-w-0 flex-1 items-center gap-2 bg-white px-2 py-[3px]">
            <span
              aria-hidden="true"
              className="grid h-[16px] w-[16px] shrink-0 place-items-center bg-ie-link text-[9px] font-black text-white"
            >
              e
            </span>
            <span className="truncate font-mono text-[13px] text-black">
              {event.siteUrl}
            </span>
          </div>
          <span className="hidden text-[13px] text-black sm:block">Links</span>
        </div>

        {/* Content well */}
        <div className="bevel-in bg-white p-0">
          <div className="max-h-[none] overflow-hidden">{children}</div>
        </div>

        {/* Status bar */}
        <div className="mt-[3px] flex items-stretch gap-[3px] px-[1px] py-[1px]">
          <div className="bevel-thin-in flex-1 px-2 py-[2px] text-[12px] text-black">
            Done
          </div>
          <div className="bevel-thin-in hidden px-2 py-[2px] text-[12px] text-black sm:block">
            {event.rsvpDeadline} — RSVP deadline
          </div>
          <div className="bevel-thin-in flex items-center gap-1 px-2 py-[2px] text-[12px] text-black">
            <span
              aria-hidden="true"
              className="inline-block h-[12px] w-[12px] bg-ie-link"
            />
            Internet zone
          </div>
        </div>
      </div>
    </div>
  )
}
