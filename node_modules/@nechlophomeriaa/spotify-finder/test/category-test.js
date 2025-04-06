'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config')

test('should get an category', (t) => {
  const catId = 'toptracks'
  const response = { id: catId, name: 'toptracks' }

  nock(client.baseURL)
    .get(`/browse/categories/${catId}`)
    .reply(200, response)

  client.getCategory(catId).then((category) => {
    t.equals(typeof category, 'object', 'should be a object')
    t.equals(category.id, catId, 'should retrive a category id')
    t.end()
  })
})

test('should get the playlists from a category', (t) => {
  const catId = 'toptracks'
  const response = { playlists: [] }

  nock(client.baseURL)
    .get(`/browse/categories/${catId}/playlists?`)
    .reply(200, response)

  client.getCategory(catId, { playlists: true }).then((res) => {
    t.equals(typeof res, 'object', 'should be a object')
    t.ok(Array.isArray(res.playlists), 'should retrive an Array of playlists')
    t.end()
  })
})

/**
* Using Callback's
*/

test('should get an category and return a callback', (t) => {
  const catId = 'toptracks'
  const response = { id: catId, name: 'toptracks' }

  nock(client.baseURL)
    .get(`/browse/categories/${catId}?`)
    .reply(200, response)

  client.getCategory(catId, { playlists: false }, (err, category) => {
    t.error(err, 'should not be an error')
    t.equals(typeof category, 'object', 'should be a object')
    t.equals(category.id, catId, 'should retrive a category id')
    t.end()
  })
})
