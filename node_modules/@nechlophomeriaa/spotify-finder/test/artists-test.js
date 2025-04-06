'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config')

test('should get single an artist', (t) => {
  const artistId = '6S2OmqARrzebs0tKUEyXyp'
  const response = { id: artistId, name: 'Demi Lovato' }

  nock(client.baseURL).get(`/artists/${artistId}`)
    .query({ country: 'SE' })
    .reply(200, response)

  client.getArtist(artistId).then((artist) => {
    t.equals(typeof artist, 'object', 'should be a single element')
    t.equals(artist.id, artistId, 'should retrive a artist id')
    t.end()
  })
})

test('should get an artist albums', (t) => {
  const artistId = '6S2OmqARrzebs0tKUEyXyp'
  const opts = { country: 'SE', albums: true }
  const response = { items: [] }

  nock(client.baseURL).get(`/artists/${artistId}/albums`)
    .query({ country: 'SE' })
    .reply(200, response)

  client.getArtist(artistId, opts).then((albums) => {
    t.equals(typeof albums, 'object', 'should be a single element')
    t.ok(Array.isArray(albums.items), 'should be an Array of albums')
    t.end()
  })
})

test('should get an artist top tracks', (t) => {
  const artistId = '6S2OmqARrzebs0tKUEyXyp'
  const opts = { country: 'SE', topTracks: true }
  const response = { items: [] }

  nock(client.baseURL).get(`/artists/${artistId}/top-tracks`)
    .query({ country: 'SE' })
    .reply(200, response)

  client.getArtist(artistId, opts).then((tracks) => {
    t.equals(typeof tracks, 'object', 'should be a single element')
    t.ok(Array.isArray(tracks.items), 'should be an Array of tracks')
    t.end()
  })
})

test('should get related artists with an artist', (t) => {
  const artistId = '6S2OmqARrzebs0tKUEyXyp'
  const opts = { country: 'SE', relatedArtists: true }
  const response = { items: [] }

  nock(client.baseURL).get(`/artists/${artistId}/related-artists`)
    .query({ country: 'SE' })
    .reply(200, response)

  client.getArtist(artistId, opts).then((artists) => {
    t.equals(typeof artists, 'object', 'should be a single element')
    t.ok(Array.isArray(artists.items), 'should be an Array of artists')
    t.end()
  })
})

test('should get several artists', (t) => {
  const ids = ['6S2OmqARrzebs0tKUEyXyp', '0C8ZW7ezQVs4URX5aX7Kqx']
  const response = { items: [] }

  nock(client.baseURL).get('/artists')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getArtists(ids.toString()).then((artists) => {
    t.equals(typeof artists, 'object', 'should be a single element')
    t.ok(Array.isArray(artists.items), 'should be an Array of artists')
    t.end()
  })
})

/**
 * Using Callback's
 */

test('should get single an artist and return a callback', (t) => {
  const artistId = '6S2OmqARrzebs0tKUEyXyp'
  const querys = { country: 'SE' }
  const response = { id: artistId, name: 'Demi Lovato' }

  nock(client.baseURL).get(`/artists/${artistId}`)
    .query(querys)
    .reply(200, response)

  client.getArtist(artistId, querys, (err, artist) => {
    t.error(err, 'should not be an error')
    t.equals(typeof artist, 'object', 'should be a single element')
    t.equals(artist.id, artistId, 'should retrive a artist id')
    t.end()
  })
})

test('should get several artists and return al callback', (t) => {
  const ids = ['6S2OmqARrzebs0tKUEyXyp', '0C8ZW7ezQVs4URX5aX7Kqx']
  const response = { items: [] }

  nock(client.baseURL).get('/artists')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getArtists(ids.toString(), (err, artists) => {
    t.error(err, 'should not be an error')
    t.equals(typeof artists, 'object', 'should be a single element')
    t.ok(Array.isArray(artists.items), 'should be an Array of artists')
    t.end()
  })
})
