'use strict';

var fs = require('fs');
var https = require('https');
var bail = require('bail');
var concat = require('concat-stream');

var url = 'https://raw.githubusercontent.com/whatwg/html/cb8445520f10e044d23cfd3ff7fc38e064edf1f1/json-entities-legacy.inc';

https.get(url, function (res) {
  res.pipe(concat(onconcat)).on('error', bail);

  function onconcat(data) {
    var entities = {};

    data = data.slice(0, -2); // Remove trailing comma.
    data = JSON.parse('{' + data + '}');

    Object.keys(data).forEach(function (key) {
      entities[key.slice(1)] = data[key].characters;
    });

    data = JSON.stringify(entities, 0, 2);

    fs.writeFile('index.json', data + '\n', bail);
  }
});
