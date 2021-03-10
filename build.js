import fs from 'fs'
import https from 'https'
import bail from 'bail'
import concat from 'concat-stream'

var own = {}.hasOwnProperty

https.get(
  'https://raw.githubusercontent.com/whatwg/html-build/HEAD/entities/json-entities-legacy.inc',
  onconnection
)

function onconnection(response) {
  response.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  var entities = {}
  var values = JSON.parse(
    '{' +
      data.slice(0, -2) + // Remove trailing comma.
      '}'
  )
  var key

  for (key in values) {
    if (own.call(values, key)) {
      entities[key.slice(1)] = values[key].characters
    }
  }

  fs.writeFile(
    'index.js',
    'export var characterEntitiesLegacy = ' +
      JSON.stringify(entities, null, 2) +
      '\n',
    bail
  )
}
