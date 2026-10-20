// Проверяет формат Conventional Commits: `feat(tasks): добавить фильтр по цели`.
import { readFileSync } from 'node:fs'

const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
]
const PATTERN = new RegExp(`^(${TYPES.join('|')})(\\([a-z0-9-]+\\))?!?: \\S.*`)
// Сообщения, которые git создаёт сам.
const AUTO_GENERATED = /^(Merge|Revert|fixup!|squash!) /

const file = process.argv[2]
if (!file) {
  console.error('Не передан путь к файлу сообщения коммита.')
  process.exit(1)
}

const subject = readFileSync(file, 'utf8').split('\n')[0]?.trim() ?? ''

if (!PATTERN.test(subject) && !AUTO_GENERATED.test(subject)) {
  console.error(
    [
      `Сообщение коммита не по формату: «${subject}»`,
      'Ожидается: <тип>(<область>): <описание>, например «feat(tasks): добавить фильтр по цели».',
      `Типы: ${TYPES.join(', ')}.`,
    ].join('\n'),
  )
  process.exit(1)
}
