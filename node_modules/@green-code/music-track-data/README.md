# Music Track Data API
A simple JavaScript music track data search API.

## Installing
```
npm install @green-code/music-track-data
```

## Get Tracks
```javascript
const {getTracks} = require("@green-code/music-track-data");

getTracks("Times Like These")
    .then(console.log)
    .catch(console.log);
```

The method returns an array of objects in the format below. Each object is data of a track found by the Deezer API.
If the API doesn't find any data, you will get an empty array.

You don't require an API key to use this method.

```json
[
  {
    "id": 0,
    "artist": "Foo Fighters",
    "title": "Times Like These",
    "preview": "http://cdn-preview-9.deezer.com/stream/c-9516e9507adaaf3f0fa2354c816adeb8-5.mp3",
    "album": {
      "title": "Greatest Hits",
      "artwork": "http://e-cdn-images.dzcdn.net/images/cover/266f01f1c7a04843d11cd08f9c07d11f/1000x1000-000000-80-0-0.jpg"
    }
  }
]
```

## Get Lyrics
```javascript
const {getLyrics} = require("@green-code/music-track-data");

getLyrics("Foo Fighters", "Times Like These")
    .then(console.log)
    .catch(console.log);
```
The method returns an object in the format below or `null` if no lyrics were found.

This method call uses MusicMatch and requires an API key. Set yours with the var name of `MUSICMATCH_API_KEY`

```json
{
  "explicit": false,
  "lyrics": "I, I'm a one way motorway\nI'm the one that drives away\nThen follows you back home\nI, I'm a street light shining\nI'm a wild light blinding bright\nBurning off alone..."
}
```

### Info
* Large thanks to [MusicMatch](https://www.musixmatch.com/) and [Deezer](https://deezer.com/).
* Author: [beningreenjam](https://github.com/beningreenjam).
* Forked from [s0ftik3/lyrics-api](https://github.com/s0ftik3/lyrics-api).