'use client'

import { useState } from 'react'
import { IeWindow } from '@/components/ie-window'
import { WelcomeScreen } from '@/components/welcome-screen'
import { EventInfo } from '@/components/event-info'
import { CostumeArchive } from '@/components/costume-archive'
import { Gallery } from '@/components/gallery'
import { FooterEggs } from '@/components/footer-eggs'
import { RsvpWindow } from '@/components/rsvp-window'
import { WinWindow } from '@/components/win-window'
import { SnakeGame } from '@/components/eggs/snake'
import { MinesweeperGame } from '@/components/eggs/minesweeper'
import { DialUpGame } from '@/components/eggs/dialup'
import { getIconById } from '@/lib/click-registry'
import { event } from '@/lib/event-config'

function Divider() {
  return <div className="h-[3px] w-full bg-win-shadow" style={{ boxShadow: '0 1px 0 #fff' }} />
}

type DialogState = { title: string; message: string } | null

const EGG_TITLES: Record<string, string> = {
  snake: 'Snake96.exe',
  minesweeper: 'Minesweeper96.exe',
  dialup: 'DialUp.exe',
}

export default function Home() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [activeEgg, setActiveEgg] = useState<string | null>(null)
  const [dialog, setDialog] = useState<DialogState>(null)

  function handleIconClick(id: string) {
    const icon = getIconById(id)
    if (!icon) return

    const { action } = icon
    if (action.type === 'navigate') {
      if (action.target === 'rsvp') setRsvpOpen(true)
      if (action.target === 'refresh') window.location.reload()
      if (action.target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (action.type === 'egg') {
      setActiveEgg(action.eggId)
      return
    }
    if (action.type === 'dialog') {
      setDialog({ title: action.title ?? 'Message', message: action.message })
    }
  }

  return (
    <main className="min-h-screen w-full px-2 py-3 sm:px-4 sm:py-6">
      <IeWindow
        onRefresh={() => window.location.reload()}
        onSearch={() => setRsvpOpen(true)}
        onIconClick={handleIconClick}
      >
        <div className="bg-white">
          <WelcomeScreen onRsvp={() => setRsvpOpen(true)} />
          <Divider />

          <section className="px-4 py-5" aria-labelledby="msg-heading">
            <h2
              id="msg-heading"
              className="mb-3 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
            >
              A MESSAGE FROM THE ARCHIVE
            </h2>
            <div className="bevel-in bg-white px-4 py-3">
              <p className="font-serif text-[16px] leading-relaxed text-black">
                {event.personalMessage}
              </p>
              <p className="mt-2 text-right font-serif text-[15px] font-bold text-black">
                — {event.host}
              </p>
            </div>
          </section>
          <Divider />

          <EventInfo />
          <Divider />

          <CostumeArchive />
          <Divider />

          <Gallery />
          <Divider />

          <FooterEggs />
        </div>
      </IeWindow>

      {rsvpOpen && <RsvpWindow onClose={() => setRsvpOpen(false)} />}

      {activeEgg === 'snake' && (
        <WinWindow
          title={EGG_TITLES.snake}
          labelledById="egg-snake"
          onClose={() => setActiveEgg(null)}
          width={280}
        >
          <SnakeGame />
        </WinWindow>
      )}

      {activeEgg === 'minesweeper' && (
        <WinWindow
          title={EGG_TITLES.minesweeper}
          labelledById="egg-minesweeper"
          onClose={() => setActiveEgg(null)}
          width={260}
        >
          <MinesweeperGame />
        </WinWindow>
      )}

      {activeEgg === 'dialup' && (
        <WinWindow
          title={EGG_TITLES.dialup}
          labelledById="egg-dialup"
          onClose={() => setActiveEgg(null)}
          width={360}
        >
          <DialUpGame />
        </WinWindow>
      )}

      {dialog && (
        <WinWindow
          title={dialog.title}
          labelledById="egg-dialog"
          onClose={() => setDialog(null)}
          width={340}
        >
          <p className="font-sans text-[14px] text-black">{dialog.message}</p>
          <div className="mt-4 flex justify-center">
            <button type="button" onClick={() => setDialog(null)} className="btn95 text-[13px]">
              OK
            </button>
          </div>
        </WinWindow>
      )}
    </main>
  )
}
