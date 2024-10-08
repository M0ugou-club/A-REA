import User from '../../src/models/Users/index.js';
import Actions from '../../src/models/Action/index.js';
import { getAccesTokensServiceByUserId } from '../routes/tokens/indexService.js'
import { reactionService } from './reactionService.js'
import fetch from 'node-fetch';

export const actionsTriggers = async () => {
    const datasObject = {};

    const users = await User.find().populate({
        path: 'a_rea',
        populate: [
            { path: 'action' },
            { path: 'reactions' }
        ]
    });

    users.forEach(async user => {
        user.a_rea.forEach(async area => {
            if (await actionsChanges(area.action.platform, area.action.type, area.action.data, user._id, area.action._id) === true) {
                reactionService(area.reactions.platform, area.reactions.type, user.id);
            }
        });
    });
}

const actionsChanges = async (platform, type, data, userId, areaId) => {
    if (platform === 'Spotify') {
        const accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
        if (await actionsTriggersSpotify(type, data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (platform === 'OpenMeteo') {
        if (actionsTriggersOpenMeteo(type, data) === true) {
            return true;
        }
        return false;
    }
    if (platform === 'Discord') {
        console.log('Discord');
    }
    return false;
}

const actionsTriggersOpenMeteo = async (type, data) => {
    if (type === 'on_evrest_melt') {
        if (await openMeteoActionsEvrestMelt() === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_evrest_almost_melting') {
        if (await openMeteoActionsEvrestAlmostMelting() === true) {
            return true;
        }
        return false;
    }
    return false;
}

const openMeteoActionsEvrestMelt = async () => {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=27.9881&longitude=86.9250&current_weather=true", {
            method: 'GET',
        });
        if (response.ok) {
            const result = await response.json();
            const temperature = result.current_weather.temperature;
            if (temperature > 0) {
                console.log("Evrest is melting");
                return true;
            }
            return false;
        } else {
            console.log("Error :", response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log(error.status);
        return false;
    }
    return false;
}

const openMeteoActionsEvrestAlmostMelting = async () => {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=27.9881&longitude=86.9250&current_weather=true", {
            method: 'GET',
        });
        if (response.ok) {
            const result = await response.json();
            const temperature = result.current_weather.temperature;
            if (temperature > -10) {
                console.log("Evrest is almost melting");
                return true;
            }
            return false;
        } else {
            console.log("Error :", response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log(error.status);
        return false;
    }
    return false;
}

const actionsTriggersSpotify = async (type, data, accessToken, areaId) => {
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

export default { actionsTriggers };