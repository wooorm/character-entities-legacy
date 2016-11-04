'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');

/* Read. */
var data = fs.readFileSync(path.join(__dirname, 'data', 'entities.json'), 'utf8');

data = data.slice(0, -2); // Remove trailing comma.

data = JSON.parse('{' + data + '}');

/* Transform. */
var entities = {};
var key;

for (key in data) {
  entities[key.slice(1)] = data[key].characters;
}

/* Write. */
entities = JSON.stringify(entities, 0, 2) + '\n';

fs.writeFileSync(path.join(__dirname, '..', 'index.json'), entities);
