import assert from 'node:assert/strict'
import test from 'node:test'
import {characterEntitiesLegacy} from './index.js'

test('characterEntitiesLegacy', function () {
  assert.ok(characterEntitiesLegacy.includes('copy'))
  assert.ok(characterEntitiesLegacy.includes('frac34'))
  assert.ok(characterEntitiesLegacy.includes('sup1'))
})
