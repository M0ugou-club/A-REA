import Actions from "../../../models/Action/index.js";
import fetch from "node-fetch";
import { postAccesToken } from "../../addTokens.js";
import { getRefreshTokensServiceByUserId } from "../../../routes/tokens/indexService.js";

const refreshSpotifyAccessToken = async (refreshToken) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    throw new Error("Failed to refresh Spotify access token");
  }
};

export const actionsTriggersSpotify = async (
  userId,
  type,
  data,
  accessToken,
  areaId
) => {
  try {
    switch (type) {
      case "on_new_track_spotify":
        if (
          (await spotifyActionsNewTrack(data, accessToken, areaId)) === true
        ) {
          return true;
        }
        return false;
      case "on_new_album_spotify":
        if (
          (await spotifyActionsNewAlbum(data, accessToken, areaId)) === true
        ) {
          return true;
        }
        return false;
      case "on_new_playlist_spotify":
        if ((await spotifyPlaylistNew(data, accessToken, areaId)) === true) {
          return true;
        }
        return false;
      case "on_like_track_spotify":
        if (
          (await spotifyActionsLikeTrack(data, accessToken, areaId)) === true
        ) {
          return true;
        }
        return false;
      default:
        return false;
    }
  } catch (error) {
    if (error.message.includes("401")) {
      const refreshToken = await getRefreshTokensServiceByUserId(
        "Spotify",
        userId
      );
      const newAccessToken = await refreshSpotifyAccessToken(refreshToken);
      await postAccesToken(userId, "Spotify", newAccessToken);
      return await actionsTriggersSpotify(
        userId,
        type,
        data,
        newAccessToken,
        areaId
      );
    }
    console.log(error);
  }
  return false;
};

const spotifyPlaylistNew = async (data, accessToken, areaId) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/playlists?limit=1",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    const result = await response.json();
    const track = String(result.items[0].name);
    if (track != data || data === null) {
      await Actions.findOneAndUpdate({ _id: areaId }, { data: track });
      return true;
    }
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Spotify API error: ${response.status} ${response.statusText}`
    );
  }
  return false;
};

const spotifyActionsNewTrack = async (data, accessToken, areaId) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/artists/44BwcqsS9V20HWSeql39ah/albums?include_groups=single&limit=1&market=FR",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      const track = String(result.items[0].name);
      if (track != data || data === null) {
        await Actions.findOneAndUpdate({ _id: areaId }, { data: track });
        return true;
      }
      return false;
    } else {
      console.log("Error :", response.status + " " + response.statusText);
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const spotifyActionsNewAlbum = async (data, accessToken, areaId) => {
  return false;
};

const spotifyActionsLikeTrack = async (data, accessToken, areaId) => {
  const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const result = await response.json();
    const track = String(result.items[0].track.name);
    if (track != data || data === null) {
      await Actions.findOneAndUpdate({ _id: areaId }, { data: track });
      return true;
    }
    return false;
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Spotify API error: ${response.status} ${response.statusText}`
    );
  }
};

export default { actionsTriggersSpotify };
