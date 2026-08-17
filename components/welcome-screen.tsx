import { event } from '@/lib/event-config'
import { Marquee } from './marquee'
import { VisitorCounter } from './visitor-counter'

export function WelcomeScreen({ onRsvp }: { onRsvp: () => void }) {
  return (
    <section className="px-4 py-5 text-center" aria-labelledby="welcome-heading">
      <p className="mb-1 font-mono text-[13px] font-bold text-black">
        <span className="blink text-red-600">*</span> WELCOME TO JO&apos;S HOMEPAGE!!!{' '}
        <span className="blink text-red-600">*</span>
      </p>

      <div className="mb-2 flex items-center justify-center gap-2">
        <span
          className="blink inline-block bg-red-600 px-2 py-[1px] text-[11px] font-black text-yellow-300"
          aria-hidden="true"
        >
          NEW!
        </span>
        <span className="font-mono text-[12px] text-black">
          Last updated: {event.lastUpdated}
        </span>
      </div>

      <h1
        id="welcome-heading"
        className="font-serif text-[34px] font-black leading-none tracking-tight text-hween-orange sm:text-[52px]"
        style={{ textShadow: '2px 2px 0 #000, 3px 3px 0 #8a2be2' }}
      >
        {event.title}
      </h1>

      <p className="mt-2 font-serif text-[18px] font-bold text-hween-purple sm:text-[22px]">
        {event.subtitle}
      </p>

      <div className="mx-auto mt-3 max-w-md">
        <div className="bevel-in bg-white px-3 py-2 text-[14px] text-black">
          <p className="font-bold">Celebrating:</p>
          <p>{event.celebrating[0]}</p>
          <p className="font-mono">+</p>
          <p>{event.celebrating[1]}</p>
        </div>
      </div>

      <div className="mt-4">
        <Marquee text="* W E L C O M E   T O   T H E   A R C H I V E *   ···   The homepage you are viewing has been offline since 1996   ···   It has now REAWAKENED for one night only   ···   Scroll down to RSVP   ···   BEST VIEWED IN INTERNET EXPLORER 3.0 AT 800x600   ···" />
      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <VisitorCounter />

        <button
          type="button"
          onClick={onRsvp}
          className="btn95 !px-6 !py-3 font-mono text-[18px] font-black text-black"
        >
          &gt;&gt;&gt; RSVP NOW &lt;&lt;&lt;
        </button>
        <p className="font-mono text-[11px] text-black">
          [ Please respond before {event.rsvpDeadline} ]
        </p>
      </div>
    </section>
  )
}
