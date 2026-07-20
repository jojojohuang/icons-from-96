'use client'

import { useState } from 'react'
import { Folder, FolderOpen, FileText } from 'lucide-react'
import { archive, type ArchiveFolder } from '@/lib/event-config'
import { WinWindow } from './win-window'

export function CostumeArchive() {
  const [open, setOpen] = useState<ArchiveFolder | null>(null)

  return (
    <section className="px-4 py-5" aria-labelledby="archive-heading">
      <h2
        id="archive-heading"
        className="mb-1 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        📁 1996_ARCHIVE — COSTUME INSPIRATION
      </h2>
      <p className="mb-3 text-center font-serif text-[14px] text-black">
        Double-click a folder to browse iconic things from 1996.
      </p>

      <div className="bevel-in bg-white p-3">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {archive.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => setOpen(folder)}
              className="menu-item flex flex-col items-center gap-1 px-1 py-2 text-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
            >
              <Folder size={40} className="text-hween-orange" fill="#ffd27f" />
              <span className="text-[12px] font-bold leading-tight">
                {folder.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <WinWindow
          title={`C:\\1996_ARCHIVE\\${open.name}`}
          labelledById="archive-window-title"
          icon={<FolderOpen size={14} className="text-yellow-200" aria-hidden="true" />}
          onClose={() => setOpen(null)}
          width={420}
        >
          <div className="bevel-in bg-white p-2">
            <ul className="divide-y divide-win">
              {open.items.map((item) => (
                <li key={item} className="flex items-center gap-2 py-[5px]">
                  <FileText size={16} className="shrink-0 text-navy" aria-hidden="true" />
                  <span className="font-sans text-[14px] text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 font-mono text-[11px] text-black">
            {open.items.length} object(s) — read only
          </p>
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={() => setOpen(null)} className="btn95 text-[13px]">
              OK
            </button>
          </div>
        </WinWindow>
      )}
    </section>
  )
}
