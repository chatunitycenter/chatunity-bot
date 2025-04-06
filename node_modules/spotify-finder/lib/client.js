'use strict'

const request = require('request-promise')
const Promise = require('bluebird')
const qs = require('querystring')
const localStorageExp = require('./localStorageExp')

class Client {
  /**
   * @param {Object} [opts] - Setup custom's endpoints
   */
  constructor (opts) {
    this.baseURL = opts && opts.url ? opts.url : 'https://api.spotify.com/v1'
    this.authURL = opts && opts.auth ? opts.auth : 'https://accounts.spotify.com/api/token'
    this.consumer = opts && opts.consumer ? opts.consumer : null
    this.endpoints = {
      search: `${this.baseURL}/search`,
      albums: `${this.baseURL}/albums`,
      artists: `${this.baseURL}/artists`,
      tracks: `${this.baseURL}/tracks`,
      browse: `${this.baseURL}/browse`,
      auth: this.authURL
    }
  }

  /**
   * @param {string} path - endpoint to send request
   * @param {Object} [params] - querystrings
   */
  fetch (path, params) {
    path = params ? `${path}?${qs.encode(params)}` : path

    return new Promise((resolve, reject) => {
      this.getToken()
        .then((token) => {
          const opts = {
            method: 'GET',
            uri: path,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            json: true
          }

          resolve(request(opts))
        })
        .catch((err) => reject(new Error(err)))
    })
  }

  getToken () {
    /* istanbul ignore else  */
    if (!this.consumer) {
      return Promise.reject('Client credentials are not provided')
    }

    const key = this.consumer.key
    const secret = this.consumer.secret
    const encode = new Buffer(`${key}:${secret}`).toString('base64')

    const opts = {
      method: 'POST',
      url: this.endpoints.auth,
      form: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': `Basic ${encode}`
      },
      json: true
    }

    const token = localStorageExp.load('token')
    /* istanbul ignore else  */
    if (token) {
      return Promise.resolve(token)
    }

    return Promise.resolve(
      request(opts).then((data) => {
        localStorageExp.save('token', data.access_token, 50)
        return data.access_token
      })
    )
  }

  /**
   * @param {Object} params - Options for the find
   * @param {string} params.q - Query for the find
   * @param {string} [params.type='artist,albums,track'] - Type of find
   * @param {string} [params.limit=20] - Limit of find
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  search (params, callback) {
    /* istanbul ignore else  */
    if (params) {
      params.type = !params.type ? 'artist,album,track' : params.type
    }

    if (callback) {
      return Promise
        .resolve(this.fetch(this.endpoints.search, params))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(this.endpoints.search, params))
  }

  /**
   * @param {string} id - id of an album spotify
   * @param {Object} [opts] - Options for the find
   * @param {Boolean} [opts.tracks=false] - get only tracks
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getAlbum (id, opts, callback) {
    let url = `${this.endpoints.albums}/${id}`
    url = opts && opts.tracks ? `${url}/tracks` : url

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(url))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(url))
  }

  /**
   * @param {Array} array_ids - ids of albums spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getAlbums (array_ids, callback) {
    const ids = array_ids.toString()

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(this.endpoints.albums, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(this.endpoints.albums, { ids }))
  }

  /**
   * @param {string} id - id of an artists spotify
   * @param {Object} [opts] - Options for the find
   * @param {string} [opts.country] - country market
   * @param {Boolean} [opts.albums] - get only albums of artist
   * @param {Boolean} [opts.topTracks] - get only top-tracks of artist
   * @param {Boolean} [opts.relatedArtists] - get only related-artists of artist
   */
  getArtist (id, opts, callback) {
    let params
    let url = `${this.endpoints.artists}/${id}`
    const country = opts && opts.country ? opts.country : 'SE'

    if (opts) {
      if (opts.albums) {
        url += '/albums'
        delete opts.albums
      } else if (opts.topTracks) {
        url += '/top-tracks'
        delete opts.topTracks
      } else if (opts.relatedArtists) {
        url += '/related-artists'
        delete opts.relatedArtists
      }
      params = Object.assign(opts, { country })
    }

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(url, params))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(url, params))
  }

  /**
   * @param {Array} array_ids - ids of artists spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getArtists (array_ids, callback) {
    const ids = array_ids.toString()

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(this.endpoints.artists, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(this.endpoints.artists, { ids }))
  }

  /**
   * @param {string} id - id of a track spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getTrack (id, callback) {
    const url = `${this.endpoints.tracks}/${id}`

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(url))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(url))
  }

  /**
   * @param {Array} array_ids - ids of tracks spotify
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getTracks (array_ids, callback) {
    const ids = array_ids.toString()

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(this.endpoints.tracks, { ids }))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(this.endpoints.tracks, { ids }))
  }

  /**
   * @param {Object} params - query parameters
   * @param {Object} params.to - navigate to where
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  browse (params, callback) {
    const permitted = ['featured-playlists', 'new-releases', 'categories']
    const index = permitted.indexOf(params.to)
    let url = this.endpoints.browse

    /* istanbul ignore else  */
    if (index >= 0) {
      url += `/${permitted[index]}`
    }

    delete params.to

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(url, params))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(url, params))
  }

  /**
   * @param {string} id - id of an category spotify
   * @param {Object} [opts] - options for request
   * @param {requestCallback} [callback] -The callback that handles the response
   */
  getCategory (id, opts, callback) {
    let url = `${this.endpoints.browse}/categories/${id}`
    url = opts && opts.playlists ? `${url}/playlists` : url

    /* istanbul ignore else  */
    if (opts && opts.hasOwnProperty('playlists')) {
      delete opts.playlists
    }

    /* istanbul ignore else  */
    if (callback) {
      return Promise
        .resolve(this.fetch(url, opts))
        .asCallback(callback)
    }

    return Promise.resolve(this.fetch(url, opts))
  }
}

module.exports = Client
