import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concatStream from 'concat-stream'

const own = {}.hasOwnProperty

https.get(
  'https://raw.githubusercontent.com/whatwg/html-build/HEAD/entities/json-entities-legacy.inc',
  onconnection
)

function onconnection(response) {
  response.pipe(concatStream(onconcat)).on('error', bail)
}

function onconcat(data) {
  const entities = {}
  const values = JSON.parse(
    '{' +
      data.slice(0, -2) + // Remove trailing comma.
      '}'
  )
  let key

  for (key in values) {
    if (own.call(values, key)) {
      entities[key.slice(1)] = values[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    'export const characterEntitiesLegacy = ' +
      JSON.stringify(entities, null, 2) +
      '\n',
    bail
  )
}
