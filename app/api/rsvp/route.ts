import { type NextRequest, NextResponse } from 'next/server'
import { createRsvp, type RsvpInput } from '@/lib/notion'

export const runtime = 'nodejs'

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return bad('Invalid request body.')
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const attendanceRaw = String(body.attendance ?? '').trim()

  if (!name) return bad('Please enter your name.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Please enter a valid email.')
  if (!['Yes', 'No', 'Maybe'].includes(attendanceRaw)) {
    return bad('Please choose an attendance option.')
  }

  const input: RsvpInput = {
    name: name.slice(0, 200),
    email,
    attendance: attendanceRaw as RsvpInput['attendance'],
    plusOne: Boolean(body.plusOne),
    guestName: String(body.guestName ?? '').trim() || undefined,
    dietary: String(body.dietary ?? '').trim() || undefined,
    costumeIdea: String(body.costumeIdea ?? '').trim() || undefined,
    message: String(body.message ?? '').trim() || undefined,
  }

  try {
    const { exhibitNumber } = await createRsvp(input)
    return NextResponse.json({ ok: true, exhibitNumber })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    if (msg.includes('NOTION_TOKEN')) {
      return bad(
        'The archive is not connected yet (missing NOTION_TOKEN). Please try again later.',
        503,
      )
    }
    console.log('[v0] RSVP error:', msg)
    return bad('Could not save your RSVP. Please try again.', 502)
  }
}
