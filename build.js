'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')

https.get(
  'https://raw.githubusercontent.com/whatwg/html/cb84455/json-entities-legacy.inc',
  onconnection
)

function onconnection(res) {
  res.pipe(concat(onconcat)).on('error', bail)
}

function onconcat(data) {
  var entities = {}

  data = data.slice(0, -2) // Remove trailing comma.
  data = JSON.parse('{' + data + '}')

  Object.keys(data).forEach(function(key) {
    entities[key.slice(1)] = data[key].characters
  })

  data = JSON.stringify(entities, null, 2)

  fs.writeFile('index.json', data + '\n', bail)
}
