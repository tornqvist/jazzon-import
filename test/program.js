'use strict';

let resolve = require('path').resolve;
let test = require('tape');
let jazzon = require('jazzon');
let pkg = require('../package.json');
let plugin = require(resolve(__dirname, '..', pkg.main));
let partial = require('./fixtures/partial.json');
let deepPartial = require('./fixtures/deepPartial.json');

test('partial is included', assert => {
  let instance = jazzon.create();
  let json = { foo: '@{ import(fixtures/partial.json) }' };
  let expected = {
    [Object.keys(partial)[0]]: partial
  };

  instance
    .use(plugin({from: __dirname}))
    .compile(json)
    .then((result) => {
      assert.deepLooseEqual(result, expected, 'partial was injected');
      assert.end();
    }, assert.end);
});

test('partial is included recursively', assert => {
  let instance = jazzon.create();
  let json = { foo: '@{ import(fixtures/deepPartial.json) }' };
  let expected = {
    [Object.keys(json)[0]]: {
      [Object.keys(deepPartial)[0]]: partial
    }
  };

  instance
    .use(plugin({from: __dirname}))
    .compile(json)
    .then((result) => {
      assert.deepLooseEqual(result, expected, 'partial was injected');
      assert.end();
    }, assert.end);
});
