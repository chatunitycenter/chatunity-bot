const axios = require('axios');
const urls = require('./urls');

let apiKey = process.env.MUSICMATCH_API_KEY;

/**
 * Looks for lyrics of an artist's track.
 * @public
 * @param {string} artist The artist's name.
 * @param {string} track The track's name.
 */
const getLyrics = async (artist, track) => {
  if (!apiKey) return new Error("MusicMatch API key required");
  if (!artist) return new Error("Artist name required");
  if (!track) return new Error("Track name required");

  return axios({
      'method': 'get',
      'url': `${urls.urlGet}apikey=${apiKey}&q_artist=${encodeURIComponent(artist)}&q_track=${encodeURIComponent(track)}`,
      'headers': {
          'content-type': 'application/json',
          'accepts': 'application/json',
      }
  }).then(({data}) => {
      const {explicit, lyrics_body} = data?.message?.body?.lyrics ?? {};
      if (!lyrics_body) return null;
      return {explicit: !!explicit, lyrics: lyrics_body}
  }).catch(console.error);
}

/**
 * Looks for the data about a track.
 * @public
 * @param {string} name A track's name.
 * @param {boolean} includeLyrics If you want to include lyrics for each result. (Default to false)
 */
const getTracks = async (name, includeLyrics = false) => {
    if (!name) return new Error("Track name required");

    const searchResults = await axios({
        'method': 'get',
        'url': `${urls.urlSearch}${encodeURIComponent(name)}`,
        'headers': {
            'content-type': 'application/json',
            'accepts': 'application/json',
        }
    }).then(response => {
        const data = response?.data?.data ?? [];
        return data.map(({artist, title, preview, album}) => ({
            preview,
            title,
            artist: artist.name,
            album: {
                title: album.title,
                artwork: album.cover_xl,
            },
        }));
    }).catch(console.error);

    return Promise.all((searchResults || []).map(async ({title, artist, preview, album}, index) => {
        const track = {id: index, title, artist, preview, album}
        if (includeLyrics) {
            track.lyrics = await getLyrics(artist, title);
        }

        return track;
    }));
}

/**
 * Sets MusicMatch API key.
 * @public
 * @param {string} key API key.
 */
const setApiKey = (key) => {
    apiKey = key;
}

module.exports = {
    getTracks,
    getLyrics,
    setApiKey,
};