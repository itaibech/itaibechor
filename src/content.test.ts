import { expect, test } from 'vitest'
import { degrees, impact, jobs, principles, projects, testimonials, ui } from './content.ts'

const shape = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v

test('Hebrew UI has exactly the same keys and list lengths as English', () => {
  expect(shape(ui.he)).toEqual(shape(ui.en))
})

test('all bilingual content is translated', () => {
  const texts = [...jobs.flatMap((j) => [j.role, ...j.points]), ...degrees.flatMap((d) => [d.school, d.title]),
    ...[...principles, ...impact].flatMap((c) => [c.title, c.body]),
    ...projects.map((p) => p.body),
    ...testimonials.map((q) => q.relation),
  ]
  for (const t of texts) expect(t.he.trim(), t.en).not.toBe('')
})
