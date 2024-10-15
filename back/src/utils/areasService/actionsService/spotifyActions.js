import Actions from '../../../models/Action/index.js';
import fetch from 'node-fetch';

export const actionsTriggersSpotify = async (type, data, accessToken, areaId) => {
    if (type === 'on_new_track_spotify') {
        if (await spotifyActionsNewTrack(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_new_album_spotify') {
        console.log('on_new_album_spotify');
        return false;
    }
    if (type === 'on_new_playlist_spotify') {
        if (await spotifyPlaylistNew(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_like_track_spotify') {
        if (await spotifyActionsLikeTrack(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    return false;
}

const spotifyPlaylistNew = async (data, accessToken, areaId) => {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=1", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            const track = String(result.items[0].name);
            if (track != data || data === null) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log("Error :", response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return false;
}

const spotifyActionsNewTrack = async (data, accessToken, areaId) => {
    try {
        const response = await fetch("https://api.spotify.com/v1/artists/44BwcqsS9V20HWSeql39ah/albums?include_groups=single&limit=1&market=FR", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            const track = String(result.items[0].name);
            if (track != data || data === null) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log("Error :", response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return false;
}

const spotifyActionsLikeTrack = async (data, accessToken, areaId) => {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            const track = String(result.items[0].track.name);
            if (track != data || data === null) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log("Error :", response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return false;
}

export default { actionsTriggersSpotify };