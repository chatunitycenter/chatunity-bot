'use strict'

const test = require('tape')
const nock = require('nock')
const client = require('./client-config.js')
const headers = require('./client-config.js').headers
const clientBad = require('./client-config.js').clientBad

const response = { access_token: 'xxx-xxxx-xxx' }

test('should return an access token', (t) => {
  nock(client.authURL, { reqheaders: headers })
    .post('')
    .reply(200, response)

  client.getToken().then((token) => {
    t.equals(typeof token, 'string', 'should be a string')
    t.end()
  })
})

test('should fail without client credentials', (t) => {
  nock(client.authURL, { reqheaders: headers })
    .post('/')
    .reply(200, response)

  clientBad.getToken().catch((err) => {
    t.equals(err, 'Client credentials are not provided', 'should return a error')
    t.end()
  })
})
