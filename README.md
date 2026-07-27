# icons-from-96

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_kemqNlg53xOsNfRrfkBrFGAOlLyD)

## Getting Started

### 1. Install Node.js

This project needs **Node.js 22+** (see `.nvmrc`).

```bash
# with nvm
nvm install
nvm use

# or install from https://nodejs.org
```

### 2. Install dependencies

This repo uses **pnpm** (see `pnpm-lock.yaml`):

```bash
pnpm install
```

If you don't have pnpm yet:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Or use npm instead:

```bash
npm install
```

### 3. Configure environment variables

RSVP submissions are saved to a **Notion database** via `/api/rsvp`.

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

| Variable | Required | Description |
| --- | --- | --- |
| `NOTION_TOKEN` | Yes | Secret token from a [Notion integration](https://www.notion.so/my-integrations) |
| `NOTION_DATABASE_ID` | No | RSVP database ID (defaults to the one bundled with this project) |

**Notion setup:**

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create an internal integration.
2. Copy the **Internal Integration Secret** into `NOTION_TOKEN` in `.env.local`.
3. Open the RSVP database in Notion, click **⋯ → Connections**, and connect your integration with **Can edit** access.
4. If you use your own database instead of the default, copy its ID from the URL (`notion.so/.../<database_id>?v=...`) into `NOTION_DATABASE_ID`.

The database should have these properties: `Name` (title), `Email`, `Attendance` (select: Yes/No/Maybe), `Plus One` (checkbox), `Guest Name`, `Dietary`, `Costume Idea`, `Message`, `Exhibit Number` (number).

Without `NOTION_TOKEN`, the site still runs locally, but RSVP submissions will fail with a "not connected yet" message.

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Deploying (Vercel)

Add the same environment variables in your Vercel project settings:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID` (optional)

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
