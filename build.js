'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')

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

  data = JSON.stringify(entities, null, 2)

  fs.writeFile('index.json', data + '\n', bail)
}
