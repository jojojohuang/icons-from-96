// ============================================================
// EDITABLE CONTENT — Icons from '96
// Change party details, archive items, gallery + messages here.
// ============================================================

export const event = {
  host: 'Jo',
  siteUrl: 'http://www.joshomepage.com/icons96',
  title: "ICONS FROM '96",
  subtitle: 'Halloween Housewarming Party',
  celebrating: ['30 years of Jo', '30 years of iconic things'],
  lastUpdated: 'October 31, 1996',
  rsvpDeadline: 'October 24, 2026',

  when: {
    date: 'Saturday 31 October 2026',
    time: '17:00 onwards',
  },
  where: {
    line1: 'Boeroehof 12',
    line2: '3531 WH Utrecht',
  },
  dressCode: {
    title: "ICONS FROM '96",
    blurb:
      'Come dressed as anything iconic from 1996: a person, movie, song, toy, trend, technology, fashion moment, or cultural phenomenon.',
  },

  // Optional subtle housewarming element
  facility: {
    construction: '1930s',
    occupants: '2026',
    reopening: 'Halloween 2026',
  },

  personalMessage:
    "You have discovered my homepage. It has been sitting on a dusty server since 1996 — and now, somehow, it is awake again. It wants you to come to a party at my new house on Halloween. Dress as something iconic. Bring your ghosts.",
} as const

// ---------- Costume inspiration archive ----------
export type ArchiveFolder = {
  id: string
  name: string
  items: string[]
}

export const archive: ArchiveFolder[] = [
  {
    id: 'movies',
    name: 'MOVIES',
    items: [
      'Ghostface / Scream',
      'Matilda',
      'Space Jam',
      'Independence Day',
      'The Craft',
      'Romeo + Juliet',
    ],
  },
  {
    id: 'music',
    name: 'MUSIC',
    items: [
      'Spice Girls',
      'Tupac',
      'Oasis',
      'TLC',
      'No Doubt',
      'Fugees',
      'Alanis Morissette',
    ],
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    items: [
      'Windows 95',
      'Dial-up internet',
      'VHS',
      'Nintendo 64',
      'Tamagotchi',
      'Nokia phone',
      'Floppy disk',
    ],
  },
  {
    id: 'toys',
    name: 'TOYS',
    items: ['Pokémon', 'Game Boy', 'Beanie Babies', 'Polly Pocket', 'LEGO'],
  },
  {
    id: 'fashion',
    name: 'FASHION',
    items: ['Chokers', 'Platform shoes', 'Overalls', 'Slip dresses', 'Butterfly clips'],
  },
  {
    id: 'trends',
    name: 'TRENDS',
    items: ['Macarena', 'Rave culture', 'AOL chatrooms', 'Mixtapes', 'Beeper codes'],
  },
]

// ---------- Image gallery ----------
export type GalleryImage = {
  src: string
  filename: string
  category: string
  uploaded: string
  alt: string
}

export const gallery: GalleryImage[] = [
  {
    src: '/gallery/win95-box.png',
    filename: 'IMAGE_001.JPG',
    category: 'CULTURAL ARTIFACT',
    uploaded: '10/31/1996',
    alt: 'Scanned photo of a Windows 95 software box',
  },
  {
    src: '/gallery/tamagotchi.png',
    filename: 'IMAGE_002.JPG',
    category: 'CULTURAL ARTIFACT',
    uploaded: '10/31/1996',
    alt: 'Scanned photo of a Tamagotchi virtual pet',
  },
  {
    src: '/gallery/n64.png',
    filename: 'IMAGE_003.JPG',
    category: 'CULTURAL ARTIFACT',
    uploaded: '10/31/1996',
    alt: 'Scanned photo of a Nintendo 64 console',
  },
  {
    src: '/gallery/floppy.png',
    filename: 'IMAGE_004.JPG',
    category: 'CULTURAL ARTIFACT',
    uploaded: '10/31/1996',
    alt: 'Scanned photo of a 3.5 inch floppy disk',
  },
]
