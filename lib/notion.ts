// Server-only Notion REST helper (no SDK dependency, uses fetch).

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'
const NOTION_VERSION_DATABASE = '2025-09-03'

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

function headers(version = NOTION_VERSION) {
  return {
    Authorization: `Bearer ${token()}`,
    'Notion-Version': version,
    'Content-Type': 'application/json',
  }
}

function richText(value: string) {
  return {
    rich_text: [{ type: 'text', text: { content: value.slice(0, 1900) } }],
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

let cachedDataSourceId: string | undefined

async function getDataSourceId(): Promise<string> {
  if (process.env.NOTION_DATA_SOURCE_ID) return process.env.NOTION_DATA_SOURCE_ID
  if (cachedDataSourceId) return cachedDataSourceId

  const res = await fetch(`${NOTION_API}/databases/${DATABASE_ID}`, {
    headers: headers(NOTION_VERSION_DATABASE),
    cache: 'no-store',
  })
  const data = (await res.json()) as { data_sources?: { id: string }[] }
  const id = data.data_sources?.[0]?.id
  if (!id) {
    throw new Error('Could not resolve Notion data source for the RSVP database')
  }
  cachedDataSourceId = id
  return id
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

async function createPersonPage(person: PersonPage, dataSourceId: string): Promise<void> {
  const properties: Record<string, unknown> = {
    Name: { title: [{ type: 'text', text: { content: person.name.slice(0, 200) } }] },
    Attendance: { select: { name: person.attendance } },
    'Exhibit Number': { number: person.exhibitNumber },
  }
  if (person.email) properties.Email = { email: person.email }
  if (person.dietary) properties.Dietary = richText(person.dietary)
  if (person.message) properties.Message = richText(person.message)
  if (person.plusOneOf) properties['Plus One Of'] = richText(person.plusOneOf)

  const res = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: dataSourceId },
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
  const [count, dataSourceId] = await Promise.all([countExhibits(), getDataSourceId()])
  const exhibitNumber = 42 + count
  const guestName = input.plusOne ? input.guestName?.trim() : undefined

  await createPersonPage(
    {
      name: input.name,
      email: input.email,
      attendance: input.attendance,
      dietary: input.dietary,
      message: input.message,
      exhibitNumber,
    },
    dataSourceId,
  )

  if (!guestName) {
    return { exhibitNumber }
  }

  const guestExhibitNumber = exhibitNumber + 1
  await createPersonPage(
    {
      name: guestName,
      attendance: input.attendance,
      dietary: input.guestDietary,
      plusOneOf: input.name,
      exhibitNumber: guestExhibitNumber,
    },
    dataSourceId,
  )

  return { exhibitNumber, guestExhibitNumber }
}
