// Server-only Notion REST helper (no SDK dependency, uses fetch).

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

// The RSVP database created for this project. Override with env if you
// recreate the database in your own workspace.
const DATABASE_ID =
  process.env.NOTION_DATABASE_ID ?? 'f45df64bcd024ce9a80797a758676ea3'

export type RsvpInput = {
  name: string
  email: string
  attendance: 'Yes' | 'No' | 'Maybe'
  plusOne: boolean
  guestName?: string
  dietary?: string
  guestDietary?: string
  message?: string
}

export type CreateRsvpResult = {
  exhibitNumber: number
  guestExhibitNumber?: number
}

function token(): string {
  const t = process.env.NOTION_TOKEN
  if (!t) {
    throw new Error('NOTION_TOKEN is not set')
  }
  return t
}

function headers() {
  return {
    Authorization: `Bearer ${token()}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  }
}

function richText(value?: string) {
  return {
    rich_text: value ? [{ type: 'text', text: { content: value.slice(0, 1900) } }] : [],
  }
}

type PersonPage = {
  name: string
  email?: string
  attendance: RsvpInput['attendance']
  dietary?: string
  message?: string
  plusOneOf?: string
  exhibitNumber: number
}

// Count existing rows so we can assign a sequential "EXHIBIT #" number.
async function countExhibits(): Promise<number> {
  try {
    const res = await fetch(`${NOTION_API}/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ page_size: 100 }),
      cache: 'no-store',
    })
    if (!res.ok) return 0
    const data = (await res.json()) as { results?: unknown[] }
    return Array.isArray(data.results) ? data.results.length : 0
  } catch {
    return 0
  }
}

async function createPersonPage(person: PersonPage): Promise<void> {
  const properties: Record<string, unknown> = {
    Name: { title: [{ type: 'text', text: { content: person.name.slice(0, 200) } }] },
    Email: { email: person.email || null },
    Attendance: { select: { name: person.attendance } },
    Dietary: richText(person.dietary),
    Message: richText(person.message),
    'Plus One Of': richText(person.plusOneOf),
    'Exhibit Number': { number: person.exhibitNumber },
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Notion create failed (${res.status}): ${detail}`)
  }
}

export async function createRsvp(input: RsvpInput): Promise<CreateRsvpResult> {
  const count = await countExhibits()
  const exhibitNumber = 42 + count
  const guestName = input.plusOne ? input.guestName?.trim() : undefined

  await createPersonPage({
    name: input.name,
    email: input.email,
    attendance: input.attendance,
    dietary: input.dietary,
    message: input.message,
    exhibitNumber,
  })

  if (!guestName) {
    return { exhibitNumber }
  }

  const guestExhibitNumber = exhibitNumber + 1
  await createPersonPage({
    name: guestName,
    attendance: input.attendance,
    dietary: input.guestDietary,
    plusOneOf: input.name,
    exhibitNumber: guestExhibitNumber,
  })

  return { exhibitNumber, guestExhibitNumber }
}
