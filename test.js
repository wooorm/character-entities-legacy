import test from 'tape'
import {characterEntitiesLegacy} from './index.js'

test('characterEntitiesLegacy', function (t) {
  t.ok(characterEntitiesLegacy.includes('copy'))
  t.ok(characterEntitiesLegacy.includes('frac34'))
  t.ok(characterEntitiesLegacy.includes('sup1'))

  t.end()
})
