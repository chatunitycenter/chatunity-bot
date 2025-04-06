export interface downloadResultV1 {
  success: String
  metadata: {
    title: String
    artists: String
    releaseDate: String
    album: String
  }
  audioBuffer: ArrayBuffer
}

export interface trackResultV1 {
  status: Boolean
  title: String
  artists: String
  duration: String
  duration_ms: Number
  explicit: Boolean
  popularity: Number
  url: String
  album: {
    name: String
    type: String
    tracks: Number
    releaseDate: String
  }
  imageUrl: String
  audioBuffer: ArrayBuffer
}

export interface trackResultV2 {
  status: Boolean
  title: String
  artists: String
  duration: String
  duration_ms: Number
  explicit: Boolean
  popularity: Number
  url: String
  album: {
    name: String
    type: String
    tracks: Number
    releaseDate: String
  }
  imageUrl: String
  audioBuffer: ArrayBuffer
}

export interface trackResultV3 {
  status: Boolean
  title: String
  artists: String
  duration: String
  duration_ms: Number
  explicit: Boolean
  popularity: Number
  url: String
  album: {
    name: String
    type: String
    tracks: Number
    releaseDate: String
  }
  imageUrl: String
  audioBuffer: ArrayBuffer
}

export interface albumResultV1 {
  type: String
  metadata: {
    cache: Boolean
    success: Boolean
    artists: String
    title: String
    cover: String
    releaseDate: String
  }
  trackList: [
    {
      success: Boolean
      metadata: {
        album: String
        artists: String
        cache: Boolean
        cover: String
        id: String
        isrc: String
        releaseDate: String
        success: Boolean
        title: String
      }
      audioBuffer: ArrayBuffer
    }
  ]
}

export interface albumResultV2 {
  type: String
  metadata: {
    title: String
    artists: String
    cover: String
    releaseDate: String
  }
  trackList: [
    {
      success: Boolean
      metadata: {
        time: String
        artist: String
        duration: Number
        name: String
        previewUrl: String
        uri: String
      }
      audioBuffer: ArrayBuffer
    }
  ]
}

export interface albumResultV3 {
  type: String
  metadata: {
    title: String
    artists: String
    cover: String
    releaseDate: String
  }
  trackList: [
    {
      success: Boolean
      metadata: {
        album_artist: String
        album_name: String
        artist: String
        cover_url: String
        name: String
        releaseDate: String
        success: Boolean
        url: String
      }
      audioBuffer: ArrayBuffer
    }
  ]
}

export declare function downloads(url: URL): Promise<downloadResultV1>
export declare function downloadTrack(query: String): Promise<trackResultV1>
export declare function downloadTrack2(query: String | URL): Promise<trackResultV2>
export declare function downloadTrack3(query: String | URL): Promise<trackResultV3>
export declare function downloadAlbum(url: String): Promise<albumResultV1>
export declare function downloadAlbum2(url: String): Promise<albumResultV2>
export declare function downloadAlbum3(url: String): Promise<albumResultV3>
