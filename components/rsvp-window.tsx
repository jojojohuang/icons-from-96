'use client'

import { useState } from 'react'
import { PartyPopper } from 'lucide-react'
import { WinWindow } from './win-window'
import { event } from '@/lib/event-config'

type Attendance = 'Yes' | 'No' | 'Maybe'
type Status = 'idle' | 'submitting' | 'done' | 'error'

const DIETARY_OPTIONS = ['Vegan', 'Vegetarian', 'Gluten free', 'Dairy free'] as const

const inputClass =
  'bevel-in w-full bg-white px-2 py-[5px] font-sans text-[14px] text-black outline-none'
const labelClass = 'mb-[2px] block font-sans text-[13px] font-bold text-black'

function formatDietary(options: string[], other: string): string | undefined {
  const parts = [...options]
  const trimmedOther = other.trim()
  if (trimmedOther) parts.push(`Other: ${trimmedOther}`)
  return parts.length > 0 ? parts.join(', ') : undefined
}

function DietaryFields({
  idPrefix,
  optionName,
  otherName,
  label,
}: {
  idPrefix: string
  optionName: string
  otherName: string
  label: string
}) {
  return (
    <div className="bevel-out bg-win px-3 pb-2 pt-1">
      <p className="mb-2 font-sans text-[13px] font-bold text-black">{label}</p>
      <div className="flex flex-col gap-1">
        {DIETARY_OPTIONS.map((option) => (
          <label
            key={option}
            htmlFor={`${idPrefix}-${option}`}
            className="flex items-center gap-2 text-[14px] text-black"
          >
            <input
              id={`${idPrefix}-${option}`}
              type="checkbox"
              name={optionName}
              value={option}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="mt-2">
        <input
          id={`${idPrefix}-other`}
          name={otherName}
          placeholder="Other"
          maxLength={200}
          className={inputClass}
        />
      </div>
    </div>
  )
}

export function RsvpWindow({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [attendance, setAttendance] = useState<Attendance>('Yes')
  const [plusOne, setPlusOne] = useState(false)
  const [error, setError] = useState('')
  const [exhibit, setExhibit] = useState(42)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    setError('')

    const plusOneChecked = data.get('plusOne') === 'on'
    const guestName = String(data.get('guestName') ?? '').trim()

    if (plusOneChecked && !guestName) {
      setError('Please enter your guest\'s name.')
      setStatus('error')
      return
    }

    const dietaryOpts = data.getAll('dietary').map(String)
    const dietaryOther = String(data.get('dietaryOther') ?? '')
    const guestDietaryOpts = data.getAll('guestDietary').map(String)
    const guestDietaryOther = String(data.get('guestDietaryOther') ?? '')

    const yourDietary = formatDietary(dietaryOpts, dietaryOther)
    const guestDietaryFormatted = formatDietary(guestDietaryOpts, guestDietaryOther)

    const dietaryParts: string[] = []
    if (yourDietary) dietaryParts.push(`You: ${yourDietary}`)
    if (plusOneChecked && guestDietaryFormatted) {
      dietaryParts.push(`Guest (${guestName}): ${guestDietaryFormatted}`)
    }
    const dietary = dietaryParts.length > 0 ? dietaryParts.join(' | ') : undefined

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      attendance,
      plusOne: plusOneChecked,
      guestName: plusOneChecked ? guestName : '',
      dietary,
      message: String(data.get('message') ?? ''),
    }

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? 'Submission failed.')
      }
      setExhibit(json.exhibitNumber ?? 42)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <WinWindow
        title="RSVP Confirmed"
        labelledById="rsvp-done-title"
        icon={<PartyPopper size={14} className="text-yellow-200" aria-hidden="true" />}
        onClose={onClose}
        width={400}
      >
        <div className="text-center">
          <p className="blink font-serif text-[22px] font-black text-hween-orange">
            CONGRATULATIONS!!!
          </p>
          <p className="mt-2 font-sans text-[14px] text-black">
            Your RSVP has been saved to the archive.
          </p>
          <div className="bevel-in mx-auto mt-3 max-w-[260px] bg-white px-3 py-3 font-mono text-[13px] text-black">
            <p>You have been registered as:</p>
            <p className="my-1 text-[20px] font-black text-navy">
              EXHIBIT #{String(exhibit).padStart(3, '0')}
            </p>
            <p>
              Status: <span className="font-bold text-green-700">ACTIVE</span>
            </p>
          </div>
          <p className="mt-3 font-sans text-[15px] text-black">
            See you on Halloween
          </p>
          <div className="mt-4 flex justify-center">
            <button type="button" onClick={onClose} className="btn95 text-[14px]">
              OK
            </button>
          </div>
        </div>
      </WinWindow>
    )
  }

  return (
    <WinWindow
      title="RSVP.EXE"
      labelledById="rsvp-form-title"
      onClose={onClose}
      width={480}
    >
      <p className="mb-3 font-serif text-[14px] text-black">
        Fill out the form below to reserve your place in the {event.title} archive.
        Fields marked <span className="font-bold text-red-600">*</span> are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red-600">*</span>
          </label>
          <input id="name" name="name" required maxLength={120} className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>

        <div className="bevel-out bg-win px-3 pb-2 pt-1">
          <p className="mb-1 font-sans text-[13px] font-bold text-black">
            Attendance <span className="text-red-600">*</span>
          </p>
          <div className="flex flex-col gap-1">
            {(
              [
                ['Yes', "Yes, I'm coming!"],
                ['No', "Sorry, can't make it"],
                ['Maybe', 'Maybe'],
              ] as [Attendance, string][]
            ).map(([val, text]) => (
              <label key={val} className="flex items-center gap-2 text-[14px] text-black">
                <input
                  type="radio"
                  name="attendance"
                  value={val}
                  checked={attendance === val}
                  onChange={() => setAttendance(val)}
                />
                {text}
              </label>
            ))}
          </div>
        </div>

        <DietaryFields
          idPrefix="dietary"
          optionName="dietary"
          otherName="dietaryOther"
          label="Dietary requirements"
        />

        <label className="flex items-center gap-2 text-[14px] text-black">
          <input
            type="checkbox"
            name="plusOne"
            checked={plusOne}
            onChange={(e) => setPlusOne(e.target.checked)}
          />
          Bringing a +1?
        </label>

        {plusOne && (
          <div className="space-y-3 bevel-in bg-white p-3">
            <div>
              <label htmlFor="guestName" className={labelClass}>
                Guest name <span className="text-red-600">*</span>
              </label>
              <input
                id="guestName"
                name="guestName"
                required
                maxLength={120}
                className={inputClass}
              />
            </div>
            <DietaryFields
              idPrefix="guest-dietary"
              optionName="guestDietary"
              otherName="guestDietaryOther"
              label="Guest dietary requirements"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className={labelClass}>
            Message for the host
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={800}
            className={`${inputClass} resize-none`}
          />
        </div>

        {status === 'submitting' && (
          <div className="bevel-in bg-white px-2 py-2">
            <p className="mb-1 font-mono text-[12px] text-black">
              Saving to archive... please wait
            </p>
            <div className="bevel-in h-4 bg-white p-[2px]">
              <div className="loadbar-fill h-full bg-navy" />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="bevel-in bg-white px-2 py-2 font-mono text-[12px] text-red-700"
          >
            ERROR: {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="btn95 text-[13px]">
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn95 font-mono text-[15px] font-black text-black disabled:opacity-60"
          >
            {status === 'submitting' ? 'SAVING...' : '>>> SUBMIT RSVP <<<'}
          </button>
        </div>
      </form>
    </WinWindow>
  )
}
