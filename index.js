'use strict';

let fs = require('mz/fs');
let path = require('path');

function plugin(options) {
  options = (options || {});

  if (!options.from) {
    throw (new Error('The "from" option is required'));
  }

  return function (value, name, args) {
    switch (name) {
    case 'import':
      let file = path.resolve(options.from, args[0]);
      return fs.readFile(file, 'utf-8').then(JSON.parse);
    default:
      return Promise.resolve(value);
    }
  };
}

module.exports = plugin;
