'use client'

import { useState } from 'react'
import { Code2, MonitorSmartphone, BookOpen, AlertTriangle } from 'lucide-react'
import { WinWindow } from './win-window'
import { event } from '@/lib/event-config'

type Egg = 'source' | 'error' | 'guestbook' | null

type GuestEntry = { name: string; message: string; date: string }

const SEED_GUESTBOOK: GuestEntry[] = [
  { name: 'xX_CyberGhost_Xx', message: 'kool site!!! signing ur guestbook :)', date: '11/02/1996' },
  { name: 'DialUpDiva', message: 'took 4 minutes to load but worth it. see u halloween!', date: '11/03/1996' },
  { name: 'Webmaster_Rob', message: 'awesome page dude. add more midi music!!', date: '11/05/1996' },
]

const FAKE_SOURCE = `<HTML>
<HEAD>
<TITLE>Welcome to Jo's Homepage!!!</TITLE>
<META NAME="generator" CONTENT="Notepad">
</HEAD>
<BODY BGCOLOR="#008080" TEXT="#000000" LINK="#0000EE">
<CENTER>
<H1><BLINK>+ ICONS FROM '96 +</BLINK></H1>
<MARQUEE>you found the source code. hello from 1996.</MARQUEE>
<IMG SRC="under_construction.gif">
<!-- TODO: buy a domain that is not free -->
<!-- the party is real. please RSVP. -->
</CENTER>
</BODY>
</HTML>`

function EggButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn95 flex items-center gap-2 text-[13px] text-black"
    >
      <span className="text-navy" aria-hidden="true">
        {icon}
      </span>
      {label}
    </button>
  )
}

export function FooterEggs() {
  const [egg, setEgg] = useState<Egg>(null)
  const [entries, setEntries] = useState<GuestEntry[]>(SEED_GUESTBOOK)

  function signGuestbook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('gname') ?? '').trim()
    const message = String(data.get('gmsg') ?? '').trim()
    if (!name || !message) return
    setEntries((prev) => [
      { name, message, date: '10/31/2026' },
      ...prev,
    ])
    form.reset()
  }

  return (
    <section className="px-4 py-5" aria-labelledby="misc-heading">
      <h2
        id="misc-heading"
        className="mb-3 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
      >
        SYSTEM &amp; ARCHIVE TOOLS
      </h2>

      {/* Housewarming facility status */}
      <div className="bevel-in mb-4 bg-white p-3">
        <p className="mb-1 font-mono text-[13px] font-bold text-black">FACILITY STATUS:</p>
        <table className="font-mono text-[13px] text-black">
          <tbody>
            <tr>
              <td className="pr-4">Original construction:</td>
              <td>{event.facility.construction}</td>
            </tr>
            <tr>
              <td className="pr-4">New occupants:</td>
              <td>{event.facility.occupants}</td>
            </tr>
            <tr>
              <td className="pr-4">Archive reopening:</td>
              <td className="font-bold text-hween-orange">{event.facility.reopening}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <EggButton icon={<Code2 size={16} />} label="VIEW SOURCE" onClick={() => setEgg('source')} />
        <EggButton
          icon={<MonitorSmartphone size={16} />}
          label="MY COMPUTER"
          onClick={() => setEgg('error')}
        />
        <EggButton
          icon={<BookOpen size={16} />}
          label="SIGN MY GUESTBOOK!!!"
          onClick={() => setEgg('guestbook')}
        />
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-black">
        {event.siteUrl} · Best viewed in Internet Explorer 3.0 · Made with Notepad ·{' '}
        {event.lastUpdated}
      </p>

      {egg === 'source' && (
        <WinWindow
          title="Source - Notepad"
          labelledById="source-title"
          icon={<Code2 size={14} className="text-yellow-200" aria-hidden="true" />}
          onClose={() => setEgg(null)}
          width={520}
        >
          <div className="bevel-in max-h-[50vh] overflow-auto bg-white p-2">
            <pre className="whitespace-pre-wrap font-mono text-[12px] leading-snug text-black">
              {FAKE_SOURCE}
            </pre>
          </div>
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={() => setEgg(null)} className="btn95 text-[13px]">
              Close
            </button>
          </div>
        </WinWindow>
      )}

      {egg === 'error' && (
        <WinWindow
          title="Warning"
          labelledById="error-title"
          onClose={() => setEgg(null)}
          width={360}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle size={40} className="shrink-0 text-hween-orange" aria-hidden="true" />
            <div className="font-sans text-[14px] text-black">
              <p className="font-bold">1996 nostalgia overload detected.</p>
              <p className="mt-1">The system is stable. You may continue.</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <button type="button" onClick={() => setEgg(null)} className="btn95 text-[13px]">
              OK
            </button>
            <button type="button" onClick={() => setEgg(null)} className="btn95 text-[13px]">
              Continue
            </button>
          </div>
        </WinWindow>
      )}

      {egg === 'guestbook' && (
        <WinWindow
          title="Guestbook"
          labelledById="guestbook-title"
          icon={<BookOpen size={14} className="text-yellow-200" aria-hidden="true" />}
          onClose={() => setEgg(null)}
          width={460}
        >
          <p className="blink mb-2 text-center font-serif text-[18px] font-black text-hween-purple">
            SIGN MY GUESTBOOK!!!
          </p>

          <form onSubmit={signGuestbook} className="mb-3 space-y-2">
            <input
              name="gname"
              required
              maxLength={40}
              placeholder="Your name / handle"
              className="bevel-in w-full bg-white px-2 py-[5px] font-sans text-[14px] text-black outline-none"
            />
            <textarea
              name="gmsg"
              required
              rows={2}
              maxLength={200}
              placeholder="Leave a message..."
              className="bevel-in w-full resize-none bg-white px-2 py-[5px] font-sans text-[14px] text-black outline-none"
            />
            <div className="flex justify-end">
              <button type="submit" className="btn95 text-[13px]">
                Sign it!
              </button>
            </div>
          </form>

          <div className="bevel-in max-h-[40vh] space-y-2 overflow-auto bg-white p-2">
            {entries.map((entry, i) => (
              <div key={i} className="border-b border-win pb-2 last:border-0">
                <p className="font-mono text-[13px] font-bold text-navy">
                  {entry.name}{' '}
                  <span className="font-normal text-black">— {entry.date}</span>
                </p>
                <p className="font-serif text-[14px] text-black">{entry.message}</p>
              </div>
            ))}
          </div>
        </WinWindow>
      )}
    </section>
  )
}
