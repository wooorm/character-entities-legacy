/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities-legacy
 * @fileoverview Test suite for `character-entities-legacy`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var characterEntities = require('./');

/* Tests. */
test('characterEntities', function (t) {
  t.equal(characterEntities.copy, '©');
  t.equal(characterEntities.frac34, '¾');
  t.equal(characterEntities.sup1, '¹');

  t.end();
});
