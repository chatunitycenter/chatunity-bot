'use strict'

const test = require('tape')
const nock = require('nock')
const Spotify = require('../lib/client')

const url = 'https://api.spotify.test'
const client = new Spotify({ url })

test('should create a client', (t) => {
  t.ok(client instanceof Spotify, 'should be instance of Spotify')
  t.end()
})

test('should fail with unknown endpoint', (t) => {
  nock(url).get('/foo')
    .reply(404)
  client.fetch('/foo', { q: 'Demi' }).catch((err) => {
    t.ok(err, 'request failed')
    t.end()
  })
})
