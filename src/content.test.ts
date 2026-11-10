import { expect, test } from 'vitest'
import { degrees, jobs, ui } from './content.ts'

const shape = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v

test('Hebrew UI has exactly the same keys and list lengths as English', () => {
  expect(shape(ui.he)).toEqual(shape(ui.en))
})

test('every job and degree is translated', () => {
  const texts = [...jobs.flatMap((j) => [j.role, ...j.points]), ...degrees.flatMap((d) => [d.school, d.title])]
  for (const t of texts) expect(t.he.trim(), t.en).not.toBe('')
})
