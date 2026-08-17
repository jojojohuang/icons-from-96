import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, '.v0')
const file = join(dir, 'inject-built-with-v0.mjs')

mkdirSync(dir, { recursive: true })
writeFileSync(
  file,
  `console.log('[v0] inject-built-with-v0: skipped (not a v0-hosted build)')\n`,
)
