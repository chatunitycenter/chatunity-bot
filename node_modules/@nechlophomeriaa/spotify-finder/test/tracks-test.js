'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config')

test('should get an track', (t) => {
  const trackId = 'eGsygTp906u18L0Oimnem'
  const response = { id: trackId }

  nock(client.baseURL).get(`/tracks/${trackId}`)
    .reply(200, response)

  client.getTrack(trackId).then((track) => {
    t.equals(track.id, trackId, 'should retrive a track id')
    t.end()
  })
})

test('should get several tracks', (t) => {
  const ids = ['eGsygTp906u18L0Oimnem', 'dsadeTd465hfdg45hddsd']
  const response = { items: [] }

  nock(client.baseURL).get('/tracks')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getTracks(ids.toString()).then((tracks) => {
    t.ok(Array.isArray(tracks.items), 'should be an Array of tracks')
    t.end()
  })
})

/**
 * Using Callback's
 */

test('should get an track and return a callback', (t) => {
  const trackId = 'eGsygTp906u18L0Oimnem'
  const response = { id: trackId }

  nock(client.baseURL).get(`/tracks/${trackId}`)
    .reply(200, response)

  client.getTrack(trackId, (err, track) => {
    t.error(err, 'should not be an error')
    t.equals(track.id, trackId, 'should retrive a track id')
    t.end()
  })
})

test('should get several tracks and return an callback', (t) => {
  const ids = ['eGsygTp906u18L0Oimnem', 'dsadeTd465hfdg45hddsd']
  const response = { items: [] }

  nock(client.baseURL).get('/tracks')
    .query({ ids: ids.toString() })
    .reply(200, response)

  client.getTracks(ids.toString(), (err, tracks) => {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(tracks.items), 'should be an Array of tracks')
    t.end()
  })
})
