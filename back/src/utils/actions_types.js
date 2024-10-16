import { youtube } from "googleapis/build/src/apis/youtube"

const actions = {
  Spotify: {
    "on_new_track_spotify": "On new track",
    "on_new_playlist_spotify": "On new playlist",
    "on_like_track_spotify": "On user like new track"
  },
  OpenMeteo: {
    "on_evrest_melt": "When evrest temperature is higher than 0°C",
    "on_evrest_almost_melting": "When evrest temperature is higher than -10°C"
  },
  youtube: {
    "on_new_video": "On new video",
    "on_live": "On inoxtag's live",
    "on_ten_millions": "On inox's channel reach 10M subscribers"
  }
}

export default actions
