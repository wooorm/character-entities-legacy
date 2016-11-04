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
