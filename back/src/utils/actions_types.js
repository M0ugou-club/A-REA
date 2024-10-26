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
  Youtube: {
    "on_new_video": "Quand inox sort une nouvelle video",
    "on_live": "Quand inox est en live",
    "on_ten_millions": "Quand inox pass les 10M abonnées"
  },
  X: {
    "on_new_tweet_inox": "Quand Inox post un nouveau tweet",
    "on_new_tweet_me": "Quand tu post un nouveau tweet",
    "on_four_millions": "Quand Inox atteint les 4M de followers sur X"
  },
  Twitch: {
    "on_live_twitch_inox": "Quand tu inoxTag est en live",
    "on_live_twitch_michou": "Quand tu Michou est en live",
  }
}

export default actions
