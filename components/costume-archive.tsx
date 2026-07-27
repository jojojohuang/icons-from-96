'use client'

import { useState } from 'react'
import { Folder, FolderOpen, FileText } from 'lucide-react'
import { archive, type ArchiveFolder, type ArchiveItem } from '@/lib/event-config'
import { WinWindow } from './win-window'

export function CostumeArchive() {
  const [openFolder, setOpenFolder] = useState<ArchiveFolder | null>(null)
  const [openItem, setOpenItem] = useState<ArchiveItem | null>(null)

  return (
    <section className="px-4 py-5" aria-labelledby="archive-heading">
      <h2
        id="archive-heading"
        className="mb-1 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        1996_ARCHIVE — COSTUME INSPIRATION
      </h2>
      <p className="mb-3 text-center font-serif text-[14px] text-black">
        Double-click a folder to browse iconic things from 1996.
      </p>

      <div className="bevel-in bg-white p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {archive.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => {
                setOpenItem(null)
                setOpenFolder(folder)
              }}
              className="menu-item flex flex-col items-center gap-2 px-2 py-3 text-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black"
            >
              <Folder size={48} className="text-hween-orange" fill="#ffd27f" />
              <span className="text-[12px] font-bold leading-tight">{folder.name}</span>
              <span className="font-mono text-[10px] text-black">
                {folder.items.length} item(s)
              </span>
            </button>
          ))}
        </div>
      </div>

      {openFolder && !openItem && (
        <WinWindow
          title={`C:\\1996_ARCHIVE\\${openFolder.name}`}
          labelledById="archive-window-title"
          icon={<FolderOpen size={14} className="text-yellow-200" aria-hidden="true" />}
          onClose={() => setOpenFolder(null)}
          width={480}
        >
          <div className="bevel-in bg-white p-1">
            <div className="grid grid-cols-[1fr_auto] border-b border-win bg-win px-2 py-1 font-mono text-[11px] font-bold text-black">
              <span>NAME</span>
              <span>RELEASED</span>
            </div>
            <ul>
              {openFolder.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="menu-item flex w-full items-center gap-2 px-2 py-[6px] text-left text-black"
                  >
                    <FileText size={16} className="shrink-0 text-navy" aria-hidden="true" />
                    <span className="min-w-0 flex-1 font-sans text-[14px]">{item.name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-black">
                      {item.releaseDate ?? '—'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 font-mono text-[11px] text-black">
            {openFolder.items.length} object(s) — double-click to read details
          </p>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpenFolder(null)}
              className="btn95 text-[13px]"
            >
              Close
            </button>
          </div>
        </WinWindow>
      )}

      {openItem && openFolder && (
        <WinWindow
          title={`C:\\1996_ARCHIVE\\${openFolder.name}\\${openItem.name}`}
          labelledById="archive-item-title"
          icon={<FileText size={14} className="text-navy" aria-hidden="true" />}
          onClose={() => setOpenItem(null)}
          width={440}
        >
          <div className="bevel-in space-y-2 bg-white p-3">
            <h3 className="font-sans text-[16px] font-bold text-black">{openItem.name}</h3>
            {openItem.releaseDate && (
              <p className="font-mono text-[12px] text-black">
                Released: {openItem.releaseDate}
              </p>
            )}
            <p className="font-serif text-[14px] leading-relaxed text-black">
              {openItem.description}
            </p>
            {openItem.costumeTip && (
              <div className="bevel-out bg-win px-2 py-2">
                <p className="font-mono text-[11px] font-bold text-black">COSTUME TIP:</p>
                <p className="mt-1 font-sans text-[13px] text-black">{openItem.costumeTip}</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpenItem(null)}
              className="btn95 text-[13px]"
            >
              Back to folder
            </button>
          </div>
        </WinWindow>
      )}
    </section>
  )
}
