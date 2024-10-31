const actions = {
  Spotify: {
    on_new_track_spotify: "Inoxtag sort une musique",
    on_new_playlist_spotify: "Tu crée une playlist",
    on_like_track_spotify: "Tu like une musique",
  },
  OpenMeteo: {
    on_evrest_melt: "L'Everest est au dessus de 0°C",
    on_evrest_almost_melting: "L'Everest est au dessus de -10°C",
  },
  Youtube: {
    on_new_video: "Inoxtag sort une nouvelle vidéo",
    on_live: "Inoxtag est en live",
    on_ten_millions: "Inox passe les 10M d'abonnés",
  },
  X: {
    on_new_tweet_inox: "Inoxtag poste un tweet",
    on_new_tweet_me: "Tu postes un tweet",
    on_four_millions: "Inox passe les 4M d'abonnés",
  },
  Twitch: {
    on_live_twitch_inox: "Inoxtag est en live",
    on_live_twitch_michou: "Michou est en live",
  },
};

export default actions;
