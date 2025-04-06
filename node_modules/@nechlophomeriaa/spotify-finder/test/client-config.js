const Spotify = require('../lib/client')

const config = {
  url: 'https://api.spotify.test',
  auth: 'https://accounts.spotify.test/api/token',
  consumer: {
    key: 'NgA6ZcYIixn8bUQ',
    secret: 'ixn8bUQNgA6ZcYI'
  }
}

const _extends = function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source) {
      target[key] = source[key]
    }
  }

  return target
}

const encode = new Buffer(`${config.consumer.key}:${config.consumer.secret}`).toString('base64')
exports.headers = { 'Authorization': `Basic ${encode}` }

exports.clientBad = new Spotify({
  auth: 'https://accounts.spotify.test/api/token'
})

exports['default'] = new Spotify(config)

module.exports = _extends(exports['default'], exports)
