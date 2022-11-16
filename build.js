import fs from 'node:fs/promises'
import fetch from 'node-fetch'

const own = {}.hasOwnProperty

const response = await fetch(
  'https://raw.githubusercontent.com/whatwg/html-build/HEAD/entities/json-entities-legacy.inc'
)
const text = await response.text()

/** @type {Array<string>} */
const entities = []
/** @type {Record<string, {codepoints: Array<number>, characters: string}>} */
const values = JSON.parse(
  '{' +
    String(text).slice(0, -2) + // Remove trailing comma.
    '}'
)
/** @type {string} */
let key

for (key in values) {
  if (own.call(values, key)) {
    entities.push(key.slice(1))
  }
}

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * List of legacy HTML named character references that don’t need a trailing semicolon.',
    ' *',
    ' * @type {Array<string>}',
    ' */',
    'export const characterEntitiesLegacy = ' +
      JSON.stringify(entities.sort(), null, 2),
    ''
  ].join('\n')
)
