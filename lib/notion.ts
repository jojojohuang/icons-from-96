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
  message?: string
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

export async function createRsvp(input: RsvpInput): Promise<{ exhibitNumber: number }> {
  const exhibitNumber = 42 + (await countExhibits())

  const properties: Record<string, unknown> = {
    Name: { title: [{ type: 'text', text: { content: input.name.slice(0, 200) } }] },
    Email: { email: input.email || null },
    Attendance: { select: { name: input.attendance } },
    'Plus One': { checkbox: input.plusOne },
    'Guest Name': richText(input.guestName),
    Dietary: richText(input.dietary),
    Message: richText(input.message),
    'Exhibit Number': { number: exhibitNumber },
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

  return { exhibitNumber }
}
