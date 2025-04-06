function isUrl(url) {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

function tags2(title, artist, year, album, image) {
  const result = {
    title: title,
    artist: artist,
    year: year,
    album: album,
    image: {
      description: "Front Cover",
      imageBuffer: image
    }
  }
  return result
}

function tags(title, artist, year, album, image, track) {
  const result = {
    title: title,
    artist: artist,
    year: year,
    album: album,
    image: {
      description: "Front cover",
      imageBuffer: image
    },
    track: track
  }
  return result
}

function convertMs(duration) {
  seconds = parseInt((duration / 1000) % 60)
  minutes = parseInt((duration / (1000 * 60)) % 60)
  hours = parseInt((duration / (1000 * 60 * 60)) % 24)
  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  return hours + ":" + minutes + ":" + seconds
}

module.exports = { isUrl, tags, convertMs, tags2 }
