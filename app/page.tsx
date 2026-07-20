'use client'

import { useState } from 'react'
import { IeWindow } from '@/components/ie-window'
import { WelcomeScreen } from '@/components/welcome-screen'
import { EventInfo } from '@/components/event-info'
import { CostumeArchive } from '@/components/costume-archive'
import { Gallery } from '@/components/gallery'
import { FooterEggs } from '@/components/footer-eggs'
import { RsvpWindow } from '@/components/rsvp-window'
import { event } from '@/lib/event-config'

function Divider() {
  return <div className="h-[3px] w-full bg-win-shadow" style={{ boxShadow: '0 1px 0 #fff' }} />
}

export default function Home() {
  const [rsvpOpen, setRsvpOpen] = useState(false)

  return (
    <main className="min-h-screen w-full px-2 py-3 sm:px-4 sm:py-6">
      <IeWindow
        onRefresh={() => window.location.reload()}
        onSearch={() => setRsvpOpen(true)}
      >
        <div className="bg-white">
          <WelcomeScreen onRsvp={() => setRsvpOpen(true)} />
          <Divider />

          {/* A message from the archive */}
          <section className="px-4 py-5" aria-labelledby="msg-heading">
            <h2
              id="msg-heading"
              className="mb-3 bg-navy px-2 py-1 text-center font-sans text-[16px] font-bold text-white"
            >
              ✉ A MESSAGE FROM THE ARCHIVE
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
    </main>
  )
}
