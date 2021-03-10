import test from 'tape'
import {characterEntitiesLegacy} from './index.js'

test('characterEntitiesLegacy', function (t) {
  t.equal(characterEntitiesLegacy.copy, '©')
  t.equal(characterEntitiesLegacy.frac34, '¾')
  t.equal(characterEntitiesLegacy.sup1, '¹')

  t.end()
})
