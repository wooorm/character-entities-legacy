'use strict'

var test = require('tape')
var characterEntities = require('.')

test('characterEntities', function (t) {
  t.equal(characterEntities.copy, '©')
  t.equal(characterEntities.frac34, '¾')
  t.equal(characterEntities.sup1, '¹')

  t.end()
})
