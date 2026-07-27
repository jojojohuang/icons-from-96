# Clickable icons registry

Living inventory of interactive elements on the site.

| Status | Meaning |
| --- | --- |
| **Live** | Wired — does something real |
| **Easter egg** | Opens joke dialog or mini game |
| **TODO** | Not yet implemented |

---

## Live

| ID | Label | Location | Action |
| --- | --- | --- | --- |
| `ie-refresh` | Refresh | IE toolbar | Reload page |
| `ie-home` | Home | IE toolbar | Scroll to top |
| `ie-search` | Search | IE toolbar | Open RSVP modal |
| `welcome-rsvp` | RSVP NOW | Welcome screen | Open RSVP modal |
| `footer-view-source` | VIEW SOURCE | Footer | View Source easter egg dialog |
| `footer-my-computer` | MY COMPUTER | Footer | Warning dialog easter egg |
| `footer-guestbook` | SIGN MY GUESTBOOK | Footer | Guestbook modal |
| `archive-folder` | Folder icons | Costume archive grid | Open folder window |
| `archive-item` | File rows | Archive folder window | Open item detail window |
| `gallery-prev` | Previous | Gallery carousel | Previous image |
| `gallery-next` | Next | Gallery carousel | Next image |

---

## Easter egg

| ID | Label | Location | Action |
| --- | --- | --- | --- |
| `ie-back` | Back | IE toolbar | "Cannot go back. This is 1996." dialog |
| `ie-forward` | Forward | IE toolbar | "Cannot go forward. This is 1996." dialog |
| `ie-stop` | Stop | IE toolbar | Snake mini game |
| `ie-favorites` | Favorites | IE toolbar | Fake favorites list dialog |
| `ie-print` | Print | IE toolbar | Minesweeper96 mini game |
| `ie-font` | Font | IE toolbar | DialUp simulator |
| `ie-mail` | Mail | IE toolbar | "Outlook Express not installed" dialog |
| `ie-menu-*` | File–Help | IE menu bar | Random 1996 error message |
| `footer-my-computer` | MY COMPUTER | Footer | Nostalgia overload warning |

---

## TODO

| ID | Label | Location | Notes |
| --- | --- | --- | --- |
| `ie-minimize` | _ | IE title bar | Minimize joke (future) |
| `ie-maximize` | □ | IE title bar | Maximize joke (future) |
| `ie-close` | × | IE title bar | Close joke (future) |
| `visitor-counter` | Visitor counter | Welcome screen | Click to increment? |
| `marquee` | Marquee banner | Welcome screen | Click to pause? |

---

## Mini games

| Game ID | Trigger | Component |
| --- | --- | --- |
| `snake` | `ie-stop` | `components/eggs/snake.tsx` |
| `minesweeper` | `ie-print` | `components/eggs/minesweeper.tsx` |
| `dialup` | `ie-font` | `components/eggs/dialup.tsx` |

Update this file when wiring new icons or changing status.
