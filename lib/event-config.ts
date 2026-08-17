// ============================================================
// EDITABLE CONTENT — Icons from '96
// Change party details, archive items, gallery + messages here.
// ============================================================

export const event = {
  host: 'Jo',
  siteUrl: 'http://www.joshomepage.com/icons96',
  title: "ICONS FROM '96",
  subtitle: '30th Birthday x Halloween x Housewarming',
  celebrating: ['30 years of Iconic Things', 'Jo'],
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

  facility: {
    construction: '1930s',
    occupants: '2026',
    reopening: 'Halloween 2026',
  },

  personalMessage:
    "You have discovered my homepage. It has been sitting on a dusty server since 1996 — and now, somehow, it is awake again. It wants you to come to a party at my new house on Halloween. Dress as something iconic. Bring your ghosts.",
} as const

// ---------- Costume inspiration archive ----------
export type ArchiveItem = {
  id: string
  name: string
  releaseDate?: string
  description: string
  costumeTip?: string
}

export type ArchiveFolder = {
  id: string
  name: string
  items: ArchiveItem[]
}

export const archive: ArchiveFolder[] = [
  {
    id: 'movies',
    name: 'MOVIES',
    items: [
      {
        id: 'scream',
        name: 'Ghostface / Scream',
        releaseDate: 'December 1996',
        description:
          'Wes Craven\'s slasher revival. Ghostface mask + black robe = instant recognition.',
        costumeTip: 'Drawn-on phone cord optional. Never reveal which killer you are.',
      },
      {
        id: 'matilda',
        name: 'Matilda',
        releaseDate: 'August 1996',
        description:
          'Roald Dahl\'s telekinetic bookworm, brought to life by Danny DeVito.',
        costumeTip: 'Blue dress, red ribbon, stack of library books, fierce stare.',
      },
      {
        id: 'space-jam',
        name: 'Space Jam',
        releaseDate: 'November 1996',
        description: 'Michael Jordan teams up with the Looney Tunes to beat the Monstars.',
        costumeTip: 'Bugs Bunny, Jordan #23 Bulls jersey, or a Monstar — pick your lane.',
      },
      {
        id: 'independence-day',
        name: 'Independence Day',
        releaseDate: 'July 1996',
        description: 'Earth fights back on July 4th. The biggest blockbuster of the summer.',
        costumeTip: 'President Whitmore flight suit, alien grey, or Area 51 scientist.',
      },
      {
        id: 'the-craft',
        name: 'The Craft',
        releaseDate: 'May 1996',
        description: 'Four teenage witches discover power has a price. Peak 90s goth energy.',
        costumeTip: 'Plaid skirt, cross necklace, smudged eyeliner, Catholic school chaos.',
      },
      {
        id: 'romeo-juliet',
        name: 'Romeo + Juliet',
        releaseDate: 'November 1996',
        description: 'Baz Luhrmann\'s MTV-speed Shakespeare. Verona Beach never looked so cool.',
        costumeTip: 'Floral shirt + gun holster, angel wings, or a Hawaiian shirt at a masquerade.',
      },
    ],
  },
  {
    id: 'music',
    name: 'MUSIC',
    items: [
      {
        id: 'spice-girls',
        name: 'Spice Girls',
        releaseDate: 'July 1996',
        description:
          '"Wannabe" hit #1 worldwide. Girl power became a global slogan overnight.',
        costumeTip: 'Pick a Spice: platform boots, Union Jack dress, or Sporty tracksuit.',
      },
      {
        id: '2pac',
        name: '2Pac',
        releaseDate: 'September 1996',
        description:
          'All Eyez on Me dropped in February; Shakur\'s legacy loomed over the year.',
        costumeTip: 'Bandana, nose ring, "Thug Life" tattoo, West Coast swagger.',
      },
      {
        id: 'oasis',
        name: 'Oasis',
        releaseDate: 'August 1996',
        description:
          '(What\'s the Story) Morning Glory? was already a phenomenon; Knebworth was the peak.',
        costumeTip: 'Parka, round Lennon glasses, Gallagher scowl. Definitely maybe.',
      },
      {
        id: 'tlc',
        name: 'TLC',
        releaseDate: 'November 1996',
        description: 'CrazySexyCool kept R&B at the centre of pop culture all year.',
        costumeTip: 'Baggy overalls (one strap down), condom accessories, bold attitude.',
      },
      {
        id: 'no-doubt',
        name: 'No Doubt',
        releaseDate: 'October 1996',
        description: 'Tragic Kingdom and "Don\'t Speak" dominated MTV through the fall.',
        costumeTip: 'Bindis, red lipstick, cargo pants, Gwen Stefani energy.',
      },
      {
        id: 'fugees',
        name: 'Fugees',
        releaseDate: 'February 1996',
        description: 'The Score blended hip-hop, reggae, and soul into a global hit machine.',
        costumeTip: 'Dreadlocks, leather jacket, Lauryn Hill grace or Wyclef flair.',
      },
      {
        id: 'alanis',
        name: 'Alanis Morissette',
        releaseDate: 'June 1996',
        description: 'Jagged Little Pill won Album of the Year at the Grammys in 1996.',
        costumeTip: 'Messy hair, oversized shirt, raw emotional intensity. It\'s ironic.',
      },
    ],
  },
  {
    id: 'technology',
    name: 'TECHNOLOGY',
    items: [
      {
        id: 'windows-95',
        name: 'Windows 95',
        releaseDate: 'August 1995',
        description:
          'The OS that defined the decade. Start button, taskbar, and that startup sound.',
        costumeTip: 'Grey box PC, Start button badge, or dress as the rolling hills wallpaper.',
      },
      {
        id: 'dial-up',
        name: 'Dial-up internet',
        releaseDate: '1990s',
        description: 'Modem screech, tied-up phone lines, and AOL free trial discs everywhere.',
        costumeTip: 'Cardboard modem, coiled phone cord, "Connecting..." sign around your neck.',
      },
      {
        id: 'vhs',
        name: 'VHS',
        releaseDate: '1970s–1990s',
        description: 'Be kind, rewind. Blockbuster runs and fuzzy tracking lines.',
        costumeTip: 'Cardboard tape shell, handwritten label, "RETURN BY" sticker.',
      },
      {
        id: 'n64',
        name: 'Nintendo 64',
        releaseDate: 'June 1996 (Japan) / September 1996 (US)',
        description: 'Three-pronged controller, cartridge games, GoldenEye multiplayer legends.',
        costumeTip: 'Grey console box, trident controller, or Mario 64 plumber fit.',
      },
      {
        id: 'tamagotchi',
        name: 'Tamagotchi',
        releaseDate: 'November 1996',
        description: 'Bandai\'s virtual pet keychain. Neglect it and it dies. Parents hated it.',
        costumeTip: 'Egg-shaped cardboard around your neck, pixel face, beep occasionally.',
      },
      {
        id: 'nokia',
        name: 'Nokia phone',
        releaseDate: '1996',
        description: 'The 8110 "banana phone" and indestructible 3310 were still to come — Nokia ruled.',
        costumeTip: 'Giant cardboard phone, Snake high score displayed, antenna optional.',
      },
      {
        id: 'floppy',
        name: 'Floppy disk',
        releaseDate: '1980s–1990s',
        description: '1.44 MB of storage glory. The save icon that outlived the medium.',
        costumeTip: 'Square blue cardboard with metal slider tab. Label it "ESSAY_FINAL.doc".',
      },
    ],
  },
  {
    id: 'toys',
    name: 'TOYS',
    items: [
      {
        id: 'pokemon',
        name: 'Pokémon',
        releaseDate: 'February 1996 (Japan)',
        description: 'Red and Green launched in Japan. The global phenomenon was just beginning.',
        costumeTip: 'Ash Ketchura cap, Pikachu onesie, or dress as a Poké Ball.',
      },
      {
        id: 'game-boy',
        name: 'Game Boy',
        releaseDate: '1989',
        description: 'Still going strong in 1996 — Pokémon and Tetris kept it essential.',
        costumeTip: 'Grey handheld box, green screen, D-pad drawn on in marker.',
      },
      {
        id: 'beanie-babies',
        name: 'Beanie Babies',
        releaseDate: '1993',
        description: 'By 1996 the collecting craze was in full hysteria. Tag protection required.',
        costumeTip: 'Stuffed animal, heart tag in plastic sleeve, investment-broker seriousness.',
      },
      {
        id: 'polly-pocket',
        name: 'Polly Pocket',
        releaseDate: '1989',
        description: 'Tiny compacts that opened into whole worlds. Easy to lose, impossible to forget.',
        costumeTip: 'Oversized compact case, pastel everything, miniature vibes.',
      },
      {
        id: 'lego',
        name: 'LEGO',
        releaseDate: '1932',
        description: 'Timeless bricks. In 1996, Space and Aquazone sets were peak playtime.',
        costumeTip: 'Primary colours, rectangular torso, claw hands. Everything is awesome.',
      },
    ],
  },
  {
    id: 'fashion',
    name: 'FASHION',
    items: [
      {
        id: 'chokers',
        name: 'Chokers',
        releaseDate: '1990s',
        description: 'Tattoo chokers, velvet bands, plastic spirals — necks were never bare.',
        costumeTip: 'Stack three. Pair with dark lipstick and existential angst.',
      },
      {
        id: 'platform-shoes',
        name: 'Platform shoes',
        releaseDate: '1990s',
        description: 'Spice Girls made towering soles mandatory. Ankle stability not included.',
        costumeTip: 'The higher the platform, the closer to girl power.',
      },
      {
        id: 'overalls',
        name: 'Overalls',
        releaseDate: '1990s',
        description: 'One strap up, one strap down. Denim or corduroy. Always a statement.',
        costumeTip: 'Add a crop top underneath. Bonus points for paint splatters.',
      },
      {
        id: 'slip-dresses',
        name: 'Slip dresses',
        releaseDate: '1990s',
        description: 'Kate Moss made underwear-as-outerwear the look of the decade.',
        costumeTip: 'Silk slip, leather jacket over shoulders, minimal jewellery.',
      },
      {
        id: 'butterfly-clips',
        name: 'Butterfly clips',
        releaseDate: '1990s',
        description: 'Tiny plastic butterflies holding back tiny sections of hair. Everywhere.',
        costumeTip: 'Minimum six clips. Arrange symmetrically. Crimped hair optional.',
      },
    ],
  },
  {
    id: 'trends',
    name: 'TRENDS',
    items: [
      {
        id: 'macarena',
        name: 'Macarena',
        releaseDate: 'August 1996',
        description: 'Los Del Rio\'s dance craze took over weddings, school discos, and sports stadiums.',
        costumeTip: 'Demonstrate the full routine at all times. Do not stop.',
      },
      {
        id: 'rave',
        name: 'Rave culture',
        releaseDate: '1990s',
        description: 'Warehouse parties, glow sticks, and pacifiers. UK acid house meets US underground.',
        costumeTip: 'Wide-leg phat pants, furry backpack, UV face paint, whistle on a string.',
      },
      {
        id: 'aol',
        name: 'AOL chatrooms',
        releaseDate: '1990s',
        description: '"You\'ve got mail." Free trial CDs shipped more units than almost anything else.',
        costumeTip: 'AOL CD as a shield, screen name badge: xX_CyberGhost_Xx.',
      },
      {
        id: 'mixtapes',
        name: 'Mixtapes',
        releaseDate: '1980s–1990s',
        description: 'Curated love letters on cassette. Handwritten track lists required.',
        costumeTip: 'Walkman, TDK cassette, Sharpie-scrawled track list on the insert card.',
      },
      {
        id: 'beeper-codes',
        name: 'Beeper codes',
        releaseDate: '1990s',
        description: '143 = I love you. Pagers were the original text message.',
        costumeTip: 'Clip a pager to your belt. Only communicate in numbers.',
      },
    ],
  },
]

// ---------- Image gallery ----------
export type GalleryImage = {
  id: string
  title: string
  src: string
  releaseDate: string
  category: string
  alt: string
  description?: string
}

export const gallery: GalleryImage[] = [
  {
    id: 'win95',
    title: 'Windows 95',
    src: '/gallery/win95.jpg',
    releaseDate: 'August 1995',
    category: 'TECHNOLOGY',
    alt: 'Windows 95 software box and startup screen',
    description: 'The operating system that changed how the world used computers.',
  },
  {
    id: 'tamagotchi',
    title: 'Tamagotchi',
    src: '/gallery/tamagotchi.jpg',
    releaseDate: 'November 1996',
    category: 'TOYS',
    alt: 'Tamagotchi virtual pet keychain',
    description: 'Bandai\'s pocket pet that teachers confiscated across the globe.',
  },
  {
    id: 'n64',
    title: 'Nintendo 64',
    src: '/gallery/n64.jpg',
    releaseDate: 'September 1996',
    category: 'TECHNOLOGY',
    alt: 'Nintendo 64 console with controller',
    description: 'Three-pronged controller, cartridge games, GoldenEye multiplayer legends.',
  },
  {
    id: 'scream',
    title: 'Scream',
    src: '/gallery/scream.jpg',
    releaseDate: 'December 1996',
    category: 'MOVIES',
    alt: 'Ghostface mask from Scream',
    description: 'Wes Craven\'s slasher revival that made horror cool again.',
  },
  {
    id: 'spice-girls',
    title: 'Spice Girls',
    src: '/gallery/spice-girls.jpg',
    releaseDate: 'July 1996',
    category: 'MUSIC',
    alt: 'Spice Girls promotional photo',
    description: '"Wannabe" went #1 in 37 countries. Girl power became a slogan.',
  },
  {
    id: 'pokemon',
    title: 'Pokémon Red & Green',
    src: '/gallery/pokemon.jpg',
    releaseDate: 'February 1996',
    category: 'TOYS',
    alt: 'Pokémon Red and Green game packaging',
    description: 'Game Freak\'s RPG launched in Japan — the beginning of a global empire.',
  },
  {
    id: 'space-jam',
    title: 'Space Jam',
    src: '/gallery/space-jam.jpg',
    releaseDate: 'November 1996',
    category: 'MOVIES',
    alt: 'Space Jam movie poster art',
    description: 'Michael Jordan and the Looney Tunes vs. the Monstars.',
  },
  {
    id: 'macarena',
    title: 'Macarena',
    src: '/gallery/macarena.jpg',
    releaseDate: 'August 1996',
    category: 'TRENDS',
    alt: 'Los Del Rio Macarena single',
    description: 'The dance craze that took over every wedding and school disco.',
  },
  {
    id: 'aol',
    title: 'AOL Free Trial CD',
    src: '/gallery/aol.jpg',
    releaseDate: '1990s',
    category: 'TECHNOLOGY',
    alt: 'AOL free trial CD-ROM disc',
    description: 'Shiny discs that arrived in the mail by the billion. "You\'ve got mail."',
  },
  {
    id: 'choker',
    title: 'Tattoo Choker',
    src: '/gallery/choker.jpg',
    releaseDate: '1990s',
    category: 'FASHION',
    alt: 'Black tattoo-style choker necklace',
    description: 'The essential neck accessory of the decade. Usually worn three at a time.',
  },
]
