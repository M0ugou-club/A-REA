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
  Discord: {
    "on_new_message_discord": "On new message",
    "on_new_reaction_discord": "On new reaction",
    "on_new_file_discord": "On new file"
  }
}

export default actions
