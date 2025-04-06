'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config.js')

test('should search artist, album, track', (t) => {
  const querys = {
    q: 'Demi Lovato',
    limit: 5,
    type: 'artist,album,track'
  }

  const response = { artists: [], albums: [], tracks: [] }

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(client.baseURL).get('/search')
    .query(querys)
    .reply(200, response)

  client.search(querys).then((res) => {
    t.equals(typeof res, 'object', '[res] should be a object')
    t.ok(Array.isArray(res.artists), '[res.artists] should be an Array')
    t.ok(Array.isArray(res.albums), '[res.albums] should be an Array')
    t.ok(Array.isArray(res.tracks), '[res.tracks] should be an Array')
    t.end()
  })
})

test('should search only artists', (t) => {
  const querys = {
    q: 'Demi Lovato',
    limit: 5,
    type: 'artist'
  }

  const response = { artists: [] }

  nock(client.baseURL).get('/search')
    .query(querys)
    .reply(200, response)

  client.search(querys).then((res) => {
    t.equals(typeof res, 'object', '[res] should be a obejct')
    t.equals(Object.keys(res).length, 1, 'should have only element')
    t.ok(Array.isArray(res.artists), '[res.artists] should be an Array')
    t.end()
  })
})

test('should do search and return a callback', (t) => {
  const querys = {
    q: 'Demi Lovato',
    limit: 5
  }

  const response = { artists: [] }

  nock(client.baseURL).get('/search')
    .query(querys)
    .query({ type: 'artist,album,track' })
    .reply(200, response)

  client.search(querys, (err, res) => {
    t.error(err, 'should not be an error')
    t.equals(typeof res, 'object', '[res] should be a obejct')
    t.end()
  })
})
