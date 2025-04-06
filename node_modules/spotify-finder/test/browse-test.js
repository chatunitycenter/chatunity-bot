'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config')

test('should get new releases', (t) => {
  const opts = { to: 'new-releases', country: 'SE' }
  const response = { albums: [] }

  nock(client.baseURL)
    .get('/browse/new-releases')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.albums), 'should be an Array of albums')
    t.end()
  })
})

test('should get featured playlists', (t) => {
  const opts = { to: 'featured-playlists', country: 'SE' }
  const response = { playlists: [] }

  nock(client.baseURL)
    .get('/browse/featured-playlists')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.playlists), 'should be an Array of playlists')
    t.end()
  })
})

test('should get categories', (t) => {
  const opts = { to: 'categories', country: 'SE' }
  const response = { categories: [] }

  nock(client.baseURL)
    .get('/browse/categories')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.categories), 'should be an Array of categories')
    t.end()
  })
})

/**
 * Using Callback's
 */

test('should get new releases and return a callback', (t) => {
  const opts = { to: 'new-releases', country: 'SE' }
  const response = { albums: [] }

  nock(client.baseURL)
    .get('/browse/new-releases')
    .query({ country: 'SE' })
    .reply(200, response)

  client.browse(opts, (err, res) => {
    t.error(err, 'should not be an error')
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.albums), 'should be an Array of albums')
    t.end()
  })
})
