//Fatto da Gab x Chatunity :)

import { createCanvas, loadImage } from 'canvas'
import fetch from 'node-fetch'
import fs from 'fs'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new sqlite3.Database(path.join(__dirname, '..', 'lastfm_enhanced.db'))

db.run(`CREATE TABLE IF NOT EXISTS lastfm_users (
  user_id TEXT PRIMARY KEY,
  lastfm_username TEXT NOT NULL,
  privacy_mode INTEGER DEFAULT 0,
  notifications INTEGER DEFAULT 1,
  premium INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.run(`CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT,
  date DATE,
  scrobbles INTEGER,
  unique_artists INTEGER,
  unique_albums INTEGER,
  listening_hours REAL,
  PRIMARY KEY (user_id, date)
)`)

db.run(`CREATE TABLE IF NOT EXISTS group_leaderboards (
  group_id TEXT,
  user_id TEXT,
  week_start DATE,
  scrobbles INTEGER,
  position INTEGER,
  PRIMARY KEY (group_id, user_id, week_start)
)`)

db.run(`CREATE TABLE IF NOT EXISTS user_achievements (
  user_id TEXT,
  achievement_id TEXT,
  unlocked_at DATETIME,
  PRIMARY KEY (user_id, achievement_id)
)`)

db.run(`CREATE TABLE IF NOT EXISTS listening_parties (
  group_id TEXT,
  creator_id TEXT,
  track_name TEXT,
  artist_name TEXT,
  start_time DATETIME,
  participants TEXT,
  status TEXT DEFAULT 'active'
)`)

db.run(`CREATE TABLE IF NOT EXISTS user_recommendations (
  user_id TEXT,
  recommended_track TEXT,
  recommended_artist TEXT,
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const LASTFM_API_KEY = '36f859a1fc4121e7f0e931806507d5f9'
const SPOTIFY_CLIENT_ID = 'your_spotify_client_id'
const SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret'
const GENIUS_API_KEY = 'your_genius_api_key'

const cache = new Map()
const CACHE_DURATION = 300000

let spotifyToken = null
let tokenExpiry = 0

function getCacheKey(method, params) {
  return `${method}_${JSON.stringify(params)}`
}

function getFromCache(key) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  cache.delete(key)
  return null
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

function getLastfmUsername(userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM lastfm_users WHERE user_id = ?', [userId], (err, row) => {
      if (err) reject(err)
      else resolve(row)
    })
  })
}

function setLastfmUsername(userId, username) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT OR REPLACE INTO lastfm_users 
            (user_id, lastfm_username, created_at, last_active) 
            VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, 
            [userId, username], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function updateUserActivity(userId) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE lastfm_users SET last_active = CURRENT_TIMESTAMP WHERE user_id = ?', 
           [userId], (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function getSpotifyToken() {
  if (spotifyToken && Date.now() < tokenExpiry) {
    return spotifyToken
  }
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    })
    
    const data = await response.json()
    if (data.access_token) {
      spotifyToken = data.access_token
      tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000
      return spotifyToken
    }
  } catch (e) {
    console.error('Spotify token error:', e)
  }
  return null
}

async function makeLastFmRequest(method, params = {}) {
  const cacheKey = getCacheKey(method, params)
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  const url = new URLSearchParams({
    method,
    api_key: LASTFM_API_KEY,
    format: 'json',
    ...params
  })

  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${url}`)
  const data = await response.json()
  
  if (data.error) throw new Error(data.message)
  
  setCache(cacheKey, data)
  return data
}

async function getRecentTrack(username) {
  const data = await makeLastFmRequest('user.getrecenttracks', { user: username, limit: 1 })
  return data?.recenttracks?.track?.[0]
}

async function getRecentTracks(username, limit = 10, from = null, to = null) {
  const params = { user: username, limit }
  if (from) params.from = from
  if (to) params.to = to
  
  const data = await makeLastFmRequest('user.getrecenttracks', params)
  return data?.recenttracks?.track || []
}

async function getUserInfo(username) {
  const data = await makeLastFmRequest('user.getinfo', { user: username })
  return data?.user
}

async function getTopArtists(username, period = '7day', limit = 10) {
  const data = await makeLastFmRequest('user.gettopartists', { 
    user: username, 
    period, 
    limit 
  })
  return data?.topartists?.artist || []
}

async function getTopAlbums(username, period = '7day', limit = 10) {
  const data = await makeLastFmRequest('user.gettopalbums', { 
    user: username, 
    period, 
    limit 
  })
  return data?.topalbums?.album || []
}

async function getTopTracks(username, period = '7day', limit = 10) {
  const data = await makeLastFmRequest('user.gettoptracks', { 
    user: username, 
    period, 
    limit 
  })
  return data?.toptracks?.track || []
}

async function getArtistInfo(artist) {
  const data = await makeLastFmRequest('artist.getinfo', { artist })
  return data?.artist
}

async function getTrackInfo(artist, track, username = null) {
  const params = { artist, track }
  if (username) params.username = username
  
  const data = await makeLastFmRequest('track.getinfo', params)
  return data?.track
}

async function searchTrack(query, limit = 10) {
  const data = await makeLastFmRequest('track.search', { track: query, limit })
  return data?.results?.trackmatches?.track || []
}

async function searchArtist(query, limit = 10) {
  const data = await makeLastFmRequest('artist.search', { artist: query, limit })
  return data?.results?.artistmatches?.artist || []
}

async function getSpotifyTrack(artist, track) {
  try {
    const token = await getSpotifyToken()
    if (!token) return null
    
    const query = encodeURIComponent(`${track} ${artist}`)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    const spotifyTrack = data?.tracks?.items?.[0]
    
    if (spotifyTrack) {
      return {
        url: spotifyTrack.external_urls?.spotify,
        preview: spotifyTrack.preview_url,
        image: spotifyTrack.album?.images?.[0]?.url,
        name: spotifyTrack.name,
        artist: spotifyTrack.artists?.[0]?.name
      }
    }
  } catch (e) {
    console.error('Spotify search error:', e)
  }
  return null
}

async function getLyrics(artist, track) {
  try {
    const query = encodeURIComponent(`${artist} ${track}`)
    const response = await fetch(`https://api.genius.com/search?q=${query}`, {
      headers: {
        'Authorization': `Bearer ${GENIUS_API_KEY}`
      }
    })
    const data = await response.json()
    return data?.response?.hits?.[0]?.result
  } catch (e) {
    return null
  }
}

async function compareUsers(user1, user2, period = '7day') {
  const [artists1, artists2, tracks1, tracks2, albums1, albums2] = await Promise.all([
    getTopArtists(user1, period),
    getTopArtists(user2, period),
    getTopTracks(user1, period),
    getTopTracks(user2, period),
    getTopAlbums(user1, period),
    getTopAlbums(user2, period)
  ])

  const artistMap1 = new Map(artists1.map(a => [a.name.toLowerCase(), a]))
  const artistMap2 = new Map(artists2.map(a => [a.name.toLowerCase(), a]))
  
  const trackMap1 = new Map(tracks1.map(t => [`${t.artist.name}_${t.name}`.toLowerCase(), t]))
  const trackMap2 = new Map(tracks2.map(t => [`${t.artist.name}_${t.name}`.toLowerCase(), t]))

  const commonArtists = [...artistMap1.keys()].filter(name => artistMap2.has(name))
  const commonTracks = [...trackMap1.keys()].filter(name => trackMap2.has(name))

  const compatibility = ((commonArtists.length + commonTracks.length) / 
                        (artists1.length + tracks1.length)) * 100

  return {
    compatibility: Math.round(compatibility),
    commonArtists: commonArtists.map(name => ({
      name: artistMap1.get(name).name,
      user1Playcount: artistMap1.get(name).playcount,
      user2Playcount: artistMap2.get(name).playcount
    })),
    commonTracks: commonTracks.map(key => ({
      name: trackMap1.get(key).name,
      artist: trackMap1.get(key).artist.name
    }))
  }
}

async function getRecommendations(username) {
  const [topArtists, topTracks] = await Promise.all([
    getTopArtists(username, '1month', 5),
    getTopTracks(username, '1month', 5)
  ])

  const recommendations = []
  
  for (const artist of topArtists) {
    try {
      const similarArtists = await makeLastFmRequest('artist.getsimilar', { 
        artist: artist.name, 
        limit: 3 
      })
      
      if (similarArtists?.similarartists?.artist) {
        recommendations.push(...similarArtists.similarartists.artist.map(a => ({
          type: 'artist',
          name: a.name,
          reason: `Simile a ${artist.name}`,
          image: a.image?.[2]?.['#text']
        })))
      }
    } catch (e) {}
  }

  return recommendations.slice(0, 10)
}

async function getArtistImageFromSpotify(artistName) {
  try {
    const token = await getSpotifyToken()
    if (!token) return null
    
    const query = encodeURIComponent(artistName)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 5000
    })
    
    const data = await response.json()
    const artist = data?.artists?.items?.[0]
    return artist?.images?.[0]?.url || null
  } catch (e) {
    return null
  }
}

async function getValidArtistImage(item, type) {
  let imgUrl = null
  
  if (type === 'Artists') {
    try {
      const artistInfo = await getArtistInfo(item.name)
      if (artistInfo?.image && Array.isArray(artistInfo.image)) {
        const imageObj = artistInfo.image.find(img => img.size === 'extralarge') ||
                        artistInfo.image.find(img => img.size === 'large') ||
                        artistInfo.image.find(img => img.size === 'medium')
        imgUrl = imageObj?.['#text']
      }
    } catch (e) {}
    
    if (!imgUrl || imgUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
      imgUrl = await getArtistImageFromSpotify(item.name)
    }
  } else {
    if (item.image && Array.isArray(item.image)) {
      const imageObj = item.image.find(img => img.size === 'extralarge') ||
                      item.image.find(img => img.size === 'large') ||
                      item.image.find(img => img.size === 'medium') ||
                      item.image[item.image.length - 1]
      imgUrl = imageObj?.['#text']
    }
  }
  
  return imgUrl
}

async function generateAdvancedCollage(items, username, type, grid = 3, theme = 'dark') {
  const size = 300
  const headerHeight = 80
  const footerHeight = 50
  const canvas = createCanvas(size * grid, size * grid + headerHeight + footerHeight)
  const ctx = canvas.getContext('2d')

  const themes = {
    dark: { bg: '#0a0a0a', text: '#ffffff', accent: '#00ff88' },
    light: { bg: '#ffffff', text: '#000000', accent: '#ff6b00' },
    neon: { bg: '#1a0033', text: '#ff00ff', accent: '#00ffff' },
    vintage: { bg: '#2d1810', text: '#f4e4bc', accent: '#d4af37' }
  }
  
  const currentTheme = themes[theme] || themes.dark

  ctx.fillStyle = currentTheme.bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = currentTheme.accent
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`${username}'s Top ${type}`, canvas.width / 2, 40)
  
  ctx.fillStyle = currentTheme.text
  ctx.font = '16px Arial'
  ctx.fillText(`Generated by CHATUNITY Bot`, canvas.width / 2, 65)

  for (let i = 0; i < Math.min(grid * grid, items.length); i++) {
    const item = items[i]
    const x = (i % grid) * size
    const y = Math.floor(i / grid) * size + headerHeight

    const imgUrl = await getValidArtistImage(item, type)
    
    let imageLoaded = false
    
    if (imgUrl && imgUrl.trim() !== '' && !imgUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
      try {
        const response = await fetch(imgUrl, {
          headers: {
            'User-Agent': 'CHATUNITY-Bot/1.0',
            'Accept': 'image/*'
          },
          timeout: 10000
        })
        
        if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
          const buffer = await response.buffer()
          if (buffer.length > 0) {
            const img = await loadImage(buffer)
            ctx.save()
            ctx.drawImage(img, x, y, size, size)
            ctx.restore()
            imageLoaded = true
          }
        }
      } catch (error) {
        console.log(`Failed to load image for ${item.name}: ${error.message}`)
      }
    }
    
    if (!imageLoaded) {
      const gradient = ctx.createLinearGradient(x, y, x + size, y + size)
      gradient.addColorStop(0, currentTheme.accent + '60')
      gradient.addColorStop(1, currentTheme.accent + '20')
      ctx.fillStyle = gradient
      ctx.fillRect(x, y, size, size)
      
      ctx.fillStyle = currentTheme.text
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('♪', x + size/2, y + size/2 + 16)
    }

    ctx.strokeStyle = currentTheme.accent
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, size, size)

    const gradient = ctx.createLinearGradient(x, y + size - 90, x, y + size)
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.9)')
    ctx.fillStyle = gradient
    ctx.fillRect(x, y + size - 90, size, 90)

    ctx.fillStyle = currentTheme.text
    ctx.font = 'bold 18px Arial'
    ctx.textAlign = 'left'
    
    const name = item.name || 'Unknown'
    const truncatedName = name.length > 18 ? name.slice(0, 15) + '...' : name
    ctx.fillText(truncatedName, x + 8, y + size - 55)

    if (item.artist && item.artist.name && item.artist.name !== name) {
      ctx.font = '14px Arial'
      ctx.fillStyle = currentTheme.text + 'CC'
      const artist = item.artist.name.length > 18 ? item.artist.name.slice(0, 15) + '...' : item.artist.name
      ctx.fillText(artist, x + 8, y + size - 35)
    }

    ctx.font = 'bold 14px Arial'
    ctx.fillStyle = currentTheme.accent
    ctx.textAlign = 'right'
    const playcount = item.playcount || '0'
    ctx.fillText(`${playcount} plays`, x + size - 8, y + size - 8)

    ctx.fillStyle = 'rgba(0,0,0,0.8)'
    ctx.fillRect(x + 5, y + 5, 50, 35)
    
    ctx.fillStyle = currentTheme.accent
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`#${i + 1}`, x + 30, y + 30)
  }

  ctx.fillStyle = currentTheme.text + '80'
  ctx.font = '14px Arial'
  ctx.textAlign = 'left'
  const date = new Date().toLocaleDateString('it-IT')
  ctx.fillText(`Generated on ${date}`, 10, canvas.height - 20)
  
  ctx.textAlign = 'right'
  ctx.fillText(`333 x ChatUnity`, canvas.width - 10, canvas.height - 20)

  return canvas.toBuffer('image/png', { quality: 0.95 })
}

async function generateStatsChart(username, period = '7day') {
  const canvas = createCanvas(800, 600)
  const ctx = canvas.getContext('2d')
  
  return canvas.toBuffer('image/png')
}

const achievements = {
  'first_scrobble': { name: 'First Steps', description: 'Register your first Last.fm account' },
  'music_lover': { name: 'Music Lover', description: 'Scrobble 1000 tracks' },
  'explorer': { name: 'Explorer', description: 'Listen to 100 different artists' },
  'dedicated': { name: 'Dedicated', description: 'Use the bot for 30 days' },
  'social': { name: 'Social Butterfly', description: 'Compare with 10 different users' }
}

function checkAchievements(userId) {
  return new Promise((resolve) => {
    resolve([])
  })
}

async function createGroupLeaderboard(groupId) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT u.lastfm_username, 
             COALESCE(SUM(l.scrobbles), 0) as total_scrobbles,
             ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(l.scrobbles), 0) DESC) as position
      FROM lastfm_users u
      LEFT JOIN group_leaderboards l ON u.user_id = l.user_id 
        AND l.group_id = ? 
        AND l.week_start >= date('now', '-7 days')
      GROUP BY u.user_id, u.lastfm_username
      ORDER BY total_scrobbles DESC
      LIMIT 10
    `, [groupId], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

const handler = async (m, { conn, args, usedPrefix, text, command, groupMetadata }) => {
  try {
    if (command === 'setuser') {
      const username = text.trim()
      if (!username) {
        return conn.sendMessage(m.chat, { 
          text: `❌ *Uso corretto:* ${usedPrefix}setuser <username>\n\n🔗 Non hai Last.fm? Registrati su last.fm e collega Spotify!\n\n333 x ChatUnity` 
        })
      }

      try {
        const userInfo = await getUserInfo(username)
        if (!userInfo) {
          return conn.sendMessage(m.chat, { 
            text: `❌ Username "${username}" non trovato su Last.fm!\n\nControlla che sia corretto e riprova.\n\n333 x ChatUnity` 
          })
        }

        await setLastfmUsername(m.sender, username)
        
        const welcomeMsg = `✅ *Account collegato con successo!*\n\n` +
                          `👤 Username: *${username}*\n` +
                          `📊 Scrobbles totali: *${userInfo.playcount?.toLocaleString() || '0'}*\n` +
                          `📅 Account creato: *${new Date(userInfo.registered?.unixtime * 1000).toLocaleDateString() || 'N/A'}*\n\n` +
                          `🎵 *Comandi disponibili:*\n` +
                          `• ${usedPrefix}cur - Traccia corrente\n` +
                          `• ${usedPrefix}stats - Statistiche dettagliate\n` +
                          `• ${usedPrefix}top - Top artisti/album/brani\n` +
                          `• ${usedPrefix}discover - Scopri nuova musica\n\n` +
                          `333 x ChatUnity`

        await conn.sendMessage(m.chat, { text: welcomeMsg })
        return
      } catch (error) {
        return conn.sendMessage(m.chat, { 
          text: `❌ Errore durante la registrazione. Riprova più tardi.\n\n333 x ChatUnity` 
        })
      }
    }

    const userRecord = await getLastfmUsername(m.sender)
    if (!userRecord) {
      const registerMsg = `🎵 *Registrazione richiesta*\n\n` +
                         `@${m.sender.split('@')[0]}, devi registrare il tuo username Last.fm per usare i comandi musicali.\n\n` +
                         `📱 *Comando:* ${usedPrefix}setuser <username>\n\n` +
                         `💡 *Non hai Last.fm?*\n` +
                         `1. Vai su last.fm e crea un account\n` +
                         `2. Collega Spotify o il tuo player preferito\n` +
                         `3. Inizia a fare scrobbling!\n\n` +
                         `333 x ChatUnity`

      return conn.sendMessage(m.chat, {
        text: registerMsg,
        mentions: [m.sender]
      })
    }

    const username = userRecord.lastfm_username
    await updateUserActivity(m.sender)

    if (command === 'cur' || command === 'current') {
      const track = await getRecentTrack(username)
      if (!track) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessuna traccia trovata. Assicurati di star ascoltando musica!\n\n333 x ChatUnity' 
        })
      }

      const [detailedTrack, spotifyTrack] = await Promise.all([
        getTrackInfo(track.artist['#text'], track.name, username).catch(() => null),
        getSpotifyTrack(track.artist['#text'], track.name).catch(() => null)
      ])

      const isPlaying = track['@attr']?.nowplaying === 'true'
      const userPlaycount = parseInt(detailedTrack?.userplaycount) || 0
      const globalListeners = parseInt(detailedTrack?.listeners) || 0
      const globalPlaycount = parseInt(detailedTrack?.playcount) || 0
      const image = track.image?.find(img => img.size === 'extralarge')?.['#text'] || 
                   spotifyTrack?.image

      let caption = `${isPlaying ? '🎧 In riproduzione' : '⏹️ Ultima traccia'} • @${m.sender.split('@')[0]}\n\n` +
                   `🎵 *${track.name}*\n` +
                   `🎤 ${track.artist['#text']}\n` +
                   `💿 ${track.album?.['#text'] || 'Album sconosciuto'}\n\n` +
                   `📊 *Statistiche:*\n` +
                   `• ${userPlaycount} tuoi ascolti\n` +
                   `• ${globalPlaycount.toLocaleString()} ascolti globali\n` +
                   `• ${globalListeners.toLocaleString()} ascoltatori unici\n`

      if (detailedTrack?.toptags?.tag?.length) {
        const tags = detailedTrack.toptags.tag.slice(0, 5).map(t => `#${t.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')}`).join(' ')
        caption += `\n🏷️ ${tags}\n`
      } else {
        const artistTag = track.artist['#text'].replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        caption += `\n🏷️ #music #${artistTag} #nowplaying\n`
      }

      if (spotifyTrack?.url) {
        caption += `\n🎧 [Ascolta su Spotify](${spotifyTrack.url})\n`
      }

      if (spotifyTrack?.preview) {
        caption += `🔊 Anteprima disponibile\n`
      }

      caption += `\n333 x ChatUnity`

      if (image && !image.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
        await conn.sendMessage(m.chat, {
          image: { url: image },
          caption,
          mentions: conn.parseMention(caption)
        }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, {
          text: caption,
          mentions: conn.parseMention(caption)
        }, { quoted: m })
      }
      return
    }

    if (command === 'stats' || command === 'statistiche') {
      const userInfo = await getUserInfo(username)
      if (!userInfo) {
        return conn.sendMessage(m.chat, { text: '❌ Impossibile recuperare le statistiche.\n\n333 x ChatUnity' })
      }

      const [topArtists, topTracks, topAlbums, recentTracks] = await Promise.all([
        getTopArtists(username, '7day', 5),
        getTopTracks(username, '7day', 5),
        getTopAlbums(username, '7day', 5),
        getRecentTracks(username, 50)
      ])

      const statsMsg = `📊 *Statistiche di ${username}*\n\n` +
                      `🎵 *Totale scrobbles:* ${userInfo.playcount?.toLocaleString()}\n` +
                      `🎤 *Artisti unici:* ${userInfo.artist_count?.toLocaleString() || 'N/A'}\n` +
                      `💿 *Album unici:* ${userInfo.album_count?.toLocaleString() || 'N/A'}\n` +
                      `📅 *Membro dal:* ${new Date(userInfo.registered?.unixtime * 1000).toLocaleDateString()}\n\n` +
                      `🔥 *Top 5 artisti (7 giorni):*\n${topArtists.map((a, i) => `${i+1}. ${a.name} (${a.playcount})`).join('\n')}\n\n` +
                      `🎵 *Top 5 brani (7 giorni):*\n${topTracks.map((t, i) => `${i+1}. ${t.name} - ${t.artist.name} (${t.playcount})`).join('\n')}\n\n` +
                      `333 x ChatUnity`

      await conn.sendMessage(m.chat, { text: statsMsg }, { quoted: m })
      return
    }

    if (command === 'discover' || command === 'scopri') {
      const recommendations = await getRecommendations(username)
      
      if (!recommendations.length) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessuna raccomandazione trovata. Ascolta più musica e riprova!\n\n333 x ChatUnity' 
        })
      }

      const discoverMsg = `🔍 *Scopri nuova musica, ${username}!*\n\n` +
                         recommendations.slice(0, 8).map((r, i) => 
                           `${i+1}. *${r.name}*\n   ${r.reason}\n`
                         ).join('\n') +
                         `\n💡 Raccomandazioni basate sui tuoi ascolti recenti\n\n333 x ChatUnity`

      await conn.sendMessage(m.chat, { text: discoverMsg }, { quoted: m })
      return
    }

    if (command === 'search' || command === 'cerca') {
      if (!text) {
        return conn.sendMessage(m.chat, { 
          text: `❌ *Uso:* ${usedPrefix}search <artista o brano>\n\n333 x ChatUnity` 
        })
      }

      const [tracks, artists] = await Promise.all([
        searchTrack(text, 5),
        searchArtist(text, 3)
      ])

      if (!tracks.length && !artists.length) {
        return conn.sendMessage(m.chat, { 
          text: `❌ Nessun risultato trovato per "${text}"\n\n333 x ChatUnity` 
        })
      }

      if (tracks.length > 0) {
        const topTrack = tracks[0]
        
        const [detailedTrack, spotifyResult] = await Promise.all([
          getTrackInfo(topTrack.artist, topTrack.name).catch(() => null),
          getSpotifyTrack(topTrack.artist, topTrack.name).catch(() => null)
        ])

        let image = null
        
        if (detailedTrack?.album?.image) {
          image = detailedTrack.album.image.find(img => img.size === 'extralarge')?.['#text'] ||
                  detailedTrack.album.image.find(img => img.size === 'large')?.['#text']
        }
        
        if (!image && topTrack.image) {
          image = topTrack.image.find(img => img.size === 'extralarge')?.['#text'] ||
                  topTrack.image.find(img => img.size === 'large')?.['#text']
        }
        
        if (!image && spotifyResult?.image) {
          image = spotifyResult.image
        }

        let searchMsg = `🔍 *Risultato per: "${text}"*\n\n` +
                       `🎵 **${topTrack.name}**\n` +
                       `🎤 ${topTrack.artist}\n` +
                       `👥 ${parseInt(topTrack.listeners || 0).toLocaleString()} ascoltatori\n`

        if (detailedTrack?.album?.title) {
          searchMsg += `💿 ${detailedTrack.album.title}\n`
        }

        if (detailedTrack?.toptags?.tag?.length) {
          const tags = detailedTrack.toptags.tag.slice(0, 3).map(t => `#${t.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')}`).join(' ')
          searchMsg += `🏷️ ${tags}\n`
        }

        if (spotifyResult?.url) {
          searchMsg += `\n🎧 **[▶️ ASCOLTA SU SPOTIFY](${spotifyResult.url})**\n`
        }

        if (spotifyResult?.preview) {
          searchMsg += `🔊 Anteprima disponibile\n`
        }

        if (tracks.length > 1) {
          searchMsg += `\n📋 *Altri risultati trovati:*\n`
          tracks.slice(1, 3).forEach((t, i) => {
            searchMsg += `${i+2}. ${t.name} - ${t.artist}\n`
          })
        }

        searchMsg += `\n333 x ChatUnity`

        if (image && !image.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
          await conn.sendMessage(m.chat, {
            image: { url: image },
            caption: searchMsg
          }, { quoted: m })
        } else {
          await conn.sendMessage(m.chat, {
            text: `${searchMsg}\n\n❌ Immagine non disponibile per questo brano`
          }, { quoted: m })
        }
        return
      }

      let searchMsg = `🔍 *Risultati ricerca: "${text}"*\n\n`
      
      if (artists.length) {
        searchMsg += `🎤 *Artisti trovati:*\n${artists.map((a, i) => `${i+1}. ${a.name} (${parseInt(a.listeners || 0).toLocaleString()} ascoltatori)`).join('\n')}\n\n`
      }

      searchMsg += `💡 Prova a cercare un brano specifico per ottenere il link Spotify!\n\n333 x ChatUnity`

      await conn.sendMessage(m.chat, { text: searchMsg }, { quoted: m })
      return
    }

    const parseOptions = (text) => {
      let size = 3
      let period = '7day'
      let theme = 'dark'

      const sizeMatch = text.match(/(\d)x\1/)
      const periodMatch = text.match(/(7day|1month|3month|6month|12month|overall)/i)
      const themeMatch = text.match(/(dark|light|neon|vintage)/i)

      if (sizeMatch) size = Math.min(parseInt(sizeMatch[1]), 5)
      if (periodMatch) period = periodMatch[1].toLowerCase()
      if (themeMatch) theme = themeMatch[1].toLowerCase()

      return { size, period, theme }
    }

    if (command === 'topartists' || command === 'top') {
      const { size, period, theme } = parseOptions(text)
      const artists = await getTopArtists(username, period, size * size)
      
      if (!artists?.length) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessun dato trovato per questo periodo.\n\n333 x ChatUnity' 
        })
      }

      try {
        const buffer = await generateAdvancedCollage(artists, username, 'Artists', size, theme)
        const periodNames = {
          '7day': '7 giorni',
          '1month': '1 mese', 
          '3month': '3 mesi',
          '6month': '6 mesi',
          '12month': '1 anno',
          'overall': 'sempre'
        }

        await conn.sendMessage(m.chat, {
          image: buffer,
          caption: `🎤 *Top ${size}x${size} artisti di ${username}*\nPeriodo: ${periodNames[period]}\nTema: ${theme}\n\n333 x ChatUnity`
        }, { quoted: m })
      } catch (error) {
        console.error('Collage generation error:', error)
        await conn.sendMessage(m.chat, { 
          text: '❌ Errore nella generazione del collage. Riprova più tardi.\n\n333 x ChatUnity' 
        })
      }
      return
    }

    if (command === 'topalbums' || command === 'album') {
      const { size, period, theme } = parseOptions(text)
      const albums = await getTopAlbums(username, period, size * size)
      
      if (!albums?.length) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessun dato trovato per questo periodo.\n\n333 x ChatUnity' 
        })
      }

      const buffer = await generateAdvancedCollage(albums, username, 'Albums', size, theme)

      await conn.sendMessage(m.chat, {
        image: buffer,
        caption: `💿 *Top ${size}x${size} album di ${username}*\nPeriodo: ${period}\nTema: ${theme}\n\n333 x ChatUnity`
      }, { quoted: m })
      return
    }

    if (command === 'toptracks' || command === 'tracks') {
      const { size, period, theme } = parseOptions(text)
      const tracks = await getTopTracks(username, period, size * size)
      
      if (!tracks?.length) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessun dato trovato per questo periodo.\n\n333 x ChatUnity' 
        })
      }

      const buffer = await generateAdvancedCollage(tracks, username, 'Tracks', size, theme)

      await conn.sendMessage(m.chat, {
        image: buffer,
        caption: `🎵 *Top ${size}x${size} brani di ${username}*\nPeriodo: ${period}\nTema: ${theme}\n\n333 x ChatUnity`
      }, { quoted: m })
      return
    }

    if (command === 'compare' || command === 'confronta') {
      let targetUser = null
      
      if (m.quoted?.sender) {
        const quotedUser = await getLastfmUsername(m.quoted.sender)
        targetUser = quotedUser?.lastfm_username
      } else if (m.mentionedJid?.length) {
        const mentionedUser = await getLastfmUsername(m.mentionedJid[0])
        targetUser = mentionedUser?.lastfm_username
      } else if (text?.trim()) {
        targetUser = text.trim()
      }

      if (!targetUser) {
        return conn.sendMessage(m.chat, {
          text: `❌ *Uso del comando:*\n• ${usedPrefix}compare @utente\n• ${usedPrefix}compare <username>\n• ${usedPrefix}compare (rispondi a un messaggio)\n\n333 x ChatUnity`
        }, { quoted: m })
      }

      try {
        const comparison = await compareUsers(username, targetUser)
        
        const compatibilityEmoji = comparison.compatibility >= 80 ? '💚' : 
                                 comparison.compatibility >= 60 ? '💛' : 
                                 comparison.compatibility >= 40 ? '🧡' : '❤️'

        let compareMsg = `🤝 *Confronto musicale*\n\n` +
                        `👤 ${username} vs ${targetUser}\n` +
                        `${compatibilityEmoji} Compatibilità: *${comparison.compatibility}%*\n\n`

        if (comparison.commonArtists.length) {
          compareMsg += `🎤 *Artisti in comune:*\n` +
                       comparison.commonArtists.slice(0, 10).map((a, i) => 
                         `${i+1}. ${a.name} (${a.user1Playcount} vs ${a.user2Playcount})`
                       ).join('\n') + '\n\n'
        }

        if (comparison.commonTracks.length) {
          compareMsg += `🎵 *Brani in comune:*\n` +
                       comparison.commonTracks.slice(0, 5).map((t, i) => 
                         `${i+1}. ${t.name} - ${t.artist}`
                       ).join('\n') + '\n\n'
        }

        if (!comparison.commonArtists.length && !comparison.commonTracks.length) {
          compareMsg += '😔 Nessun artista o brano in comune nel periodo recente.\n\n'
        }

        compareMsg += '333 x ChatUnity'

        await conn.sendMessage(m.chat, { text: compareMsg }, { quoted: m })
      } catch (error) {
        await conn.sendMessage(m.chat, { 
          text: '❌ Errore nel confronto. Verifica che entrambi gli username siano corretti.\n\n333 x ChatUnity' 
        })
      }
      return
    }

    if (command === 'cronologia' || command === 'history') {
      const limit = parseInt(text) || 15
      const tracks = await getRecentTracks(username, Math.min(limit, 50))
      
      if (!tracks.length) {
        return conn.sendMessage(m.chat, { 
          text: '❌ Nessuna cronologia trovata.\n\n333 x ChatUnity' 
        })
      }

      const trackList = tracks.map((track, i) => {
        const isPlaying = track['@attr']?.nowplaying === 'true'
        const icon = isPlaying ? '▶️' : `${i + 1}.`
        const time = track.date ? 
          new Date(track.date.uts * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) : 
          'ora'
        
        return `${icon} *${track.name}*\n   🎤 ${track.artist['#text']} ${!isPlaying ? `• ${time}` : ''}`
      }).join('\n\n')

      const historyMsg = `📜 *Cronologia di ${username}*\n` +
                        `Ultimi ${tracks.length} brani:\n\n${trackList}\n\n` +
                        `333 x ChatUnity`

      await conn.sendMessage(m.chat, { text: historyMsg }, { quoted: m })
      return
    }

    if (command === 'help' || command === 'aiuto') {
      const helpMsg = `🎵 *CHATUNITY Last.fm Bot - Comandi*\n\n` +
                     `📱 *Setup:*\n` +
                     `• ${usedPrefix}setuser <username> - Collega account\n\n` +
                     `🎧 *Tracce correnti:*\n` +
                     `• ${usedPrefix}cur - Traccia in riproduzione\n\n` +
                     `📊 *Statistiche:*\n` +
                     `• ${usedPrefix}stats - Statistiche complete\n` +
                     `• ${usedPrefix}topartists [3x3] [7day] [dark] - Top artisti\n` +
                     `• ${usedPrefix}topalbums [3x3] [1month] [neon] - Top album\n` +
                     `• ${usedPrefix}toptracks [4x4] [overall] [light] - Top brani\n\n` +
                     `🔍 *Scoperta:*\n` +
                     `• ${usedPrefix}search <query> - Cerca musica\n` +
                     `• ${usedPrefix}discover - Raccomandazioni\n\n` +
                     `🤝 *Social:*\n` +
                     `• ${usedPrefix}compare @user - Confronta gusti\n` +
                     `• ${usedPrefix}cronologia [15] - Cronologia ascolti\n\n` +
                     `💡 *Opzioni disponibili:*\n` +
                     `• Griglie: 3x3, 4x4, 5x5\n` +
                     `• Periodi: 7day, 1month, 3month, 6month, 12month, overall\n` +
                     `• Temi: dark, light, neon, vintage\n\n` +
                     `333 x ChatUnity`

      await conn.sendMessage(m.chat, { text: helpMsg }, { quoted: m })
      return
    }

  } catch (error) {
    console.error('Last.fm Bot Error:', error)
    await conn.sendMessage(m.chat, { 
      text: '❌ Si è verificato un errore. Riprova più tardi.\n\n333 x ChatUnity' 
    })
  }
}

handler.command = [
  'setuser',
  'cur', 'current',
  'stats', 'statistiche', 
  'topartists', 'top',
  'topalbums', 'album',
  'toptracks', 'tracks',
  'compare', 'confronta',
  'cronologia', 'history',
  'search', 'cerca',
  'discover', 'scopri',
  'help', 'aiuto'
]


export default handler