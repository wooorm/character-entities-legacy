/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module character-entities-legacy
 * @fileoverview Test suite for `character-entities-legacy`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var characterEntitiesLegacy = require('./');

/*
 * Tests.
 */

test('characterEntitiesLegacy', function (t) {
    t.equal(characterEntitiesLegacy.copy, '©');
    t.equal(characterEntitiesLegacy.frac34, '¾');
    t.equal(characterEntitiesLegacy.sup1, '¹');

    t.end();
});
