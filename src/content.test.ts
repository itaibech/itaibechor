import { expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { degrees, games, impact, jobs, principles, projects, testimonials, ui, weatherUrl } from './content.ts'

const shape = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v

test('Hebrew UI has exactly the same keys and list lengths as English', () => {
  expect(shape(ui.he)).toEqual(shape(ui.en))
})

test('all bilingual content is translated', () => {
  const texts = [...jobs.flatMap((j) => [j.role, ...j.points]), ...degrees.flatMap((d) => [d.school, d.title]),
    ...[...principles, ...impact].flatMap((c) => [c.title, c.body]),
    ...projects.flatMap((p) => [p.body, ...p.highlights]),
    ...testimonials.map((q) => q.relation),
    ...games.map((g) => g.body),
  ]
  for (const t of texts) expect(t.he.trim(), t.en).not.toBe('')
})

test('every game origin is allowed by the CSP frame-src', () => {
  const frameSrc = /frame-src ([^;]+)/.exec(readFileSync('vite.config.ts', 'utf8'))?.[1] ?? ''
  for (const g of games) expect(frameSrc.split(' '), g.name).toContain(new URL(g.src).origin)
})

test('weather API origin is allowed by the CSP connect-src', () => {
  const connectSrc = /connect-src ([^;]+)/.exec(readFileSync('vite.config.ts', 'utf8'))?.[1] ?? ''
  expect(connectSrc.split(' ')).toContain(new URL(weatherUrl).origin)
})
