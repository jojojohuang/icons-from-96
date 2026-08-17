export type ClickAction =
  | { type: 'navigate'; target: 'rsvp' | 'refresh' | 'home' }
  | { type: 'egg'; eggId: string }
  | { type: 'dialog'; message: string; title?: string }

export type ClickableIcon = {
  id: string
  label: string
  location: string
  status: 'live' | 'easter-egg' | 'todo'
  action: ClickAction
}

export const CLICKABLE_ICONS: ClickableIcon[] = [
  { id: 'ie-back', label: 'Back', location: 'IE toolbar', status: 'easter-egg', action: { type: 'dialog', title: 'Internet Explorer', message: 'Cannot go back. This is 1996.' } },
  { id: 'ie-forward', label: 'Forward', location: 'IE toolbar', status: 'easter-egg', action: { type: 'dialog', title: 'Internet Explorer', message: 'Cannot go forward. This is 1996.' } },
  { id: 'ie-stop', label: 'Stop', location: 'IE toolbar', status: 'easter-egg', action: { type: 'egg', eggId: 'snake' } },
  { id: 'ie-refresh', label: 'Refresh', location: 'IE toolbar', status: 'live', action: { type: 'navigate', target: 'refresh' } },
  { id: 'ie-home', label: 'Home', location: 'IE toolbar', status: 'live', action: { type: 'navigate', target: 'home' } },
  { id: 'ie-search', label: 'Search', location: 'IE toolbar', status: 'live', action: { type: 'navigate', target: 'rsvp' } },
  { id: 'ie-favorites', label: 'Favorites', location: 'IE toolbar', status: 'easter-egg', action: { type: 'dialog', title: 'Favorites', message: "Added Jo's Homepage to your Favorites. You now have 1 favorite." } },
  { id: 'ie-print', label: 'Print', location: 'IE toolbar', status: 'easter-egg', action: { type: 'egg', eggId: 'minesweeper' } },
  { id: 'ie-font', label: 'Font', location: 'IE toolbar', status: 'easter-egg', action: { type: 'egg', eggId: 'dialup' } },
  { id: 'ie-mail', label: 'Mail', location: 'IE toolbar', status: 'easter-egg', action: { type: 'dialog', title: 'Outlook Express', message: 'Outlook Express is not installed. Please insert Setup Disk 3.' } },
  { id: 'ie-menu', label: 'Menu', location: 'IE menu bar', status: 'easter-egg', action: { type: 'dialog', title: 'Error', message: 'This menu item is not yet implemented. Error 404: Not Found.' } },
  { id: 'welcome-rsvp', label: 'RSVP NOW', location: 'Welcome screen', status: 'live', action: { type: 'navigate', target: 'rsvp' } },
]

export function getIconById(id: string): ClickableIcon | undefined {
  return CLICKABLE_ICONS.find((icon) => icon.id === id)
}

export function getIconsByStatus(status: ClickableIcon['status']): ClickableIcon[] {
  return CLICKABLE_ICONS.filter((icon) => icon.status === status)
}
