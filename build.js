import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concatStream from 'concat-stream'

const own = {}.hasOwnProperty

https.get(
  'https://raw.githubusercontent.com/whatwg/html-build/HEAD/entities/json-entities-legacy.inc',
  (response) => {
    response.pipe(concatStream(onconcat)).on('error', bail)
  }
)

/**
 * @param {Buffer} buf
 */
function onconcat(buf) {
  /** @type {Record<string, string>} */
  const entities = {}
  /** @type {Record<string, {codepoints: number[], characters: string}>} */
  const values = JSON.parse(
    '{' +
      String(buf).slice(0, -2) + // Remove trailing comma.
      '}'
  )
  /** @type {string} */
  let key

  for (key in values) {
    if (own.call(values, key)) {
      entities[key.slice(1)] = values[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    [
      '/**',
      ' * Map of legacy HTML named character references that don’t need a trailing semicolon.',
      ' *',
      ' * @type {Record<string, string>}',
      ' */',
      'export const characterEntitiesLegacy = ' +
        JSON.stringify(entities, null, 2),
      ''
    ].join('\n'),
    bail
  )
}
