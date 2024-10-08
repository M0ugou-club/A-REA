import User from '../../src/models/Users/index.js';
import Actions from '../../src/models/Action/index.js';
import actions from './actions_types.js'
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
            console.log(user.username);
            if (await actionsChanges(area.action.platform, area.action.type, area.action.data, user._id, area.action._id) === true) {
                reactionService(area.reactions.platform, area.reactions.type, user.id);
            }
        });
    });
}

const actionsChanges = async (platform, type, data, userId, areaId) => {
    console.log(platform, type, data);
    if (platform === 'Spotify') {
        const accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
        console.log(accessToken);
        if (await actionsTriggersSpotify(type, data, accessToken, areaId)) {
            return true;
        }
    }
    if (platform === 'Discord') {
        console.log('Discord');
    }
    return false;
}

const actionsTriggersSpotify = async (type, data, accessToken, areaId) => {
    if (type === 'on_new_track_spotify') {
        if (await spotifyActionsNewTrack(data, accessToken, areaId)) {
            return true;
        }
    }
    if (type === 'on_new_album_spotify') {
        console.log('on_new_album_spotify');
        return true;
    }
    if (type === 'on_new_playlist_spotify') {
        if (await spotifyPlaylistNew(data, accessToken, areaId))
        return true;
    }
    if (type === 'on_like_track_spotify') {
        console.log('on_like_track_spotify');
        if (await spotifyActionsLikeTrack(data, accessToken, areaId)) {
            return true;
        }
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
            console.log("track sa mere");
            console.log(track);

            console.log("areaid", areaId);
            if (track != data || data === null) {
                console.log('Music liked successfully!');
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log(response);
            console.log("error");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
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
            console.log("track");
            console.log(track);

            console.log("areaid", areaId);
            if (track != data || data === null) {
                console.log('Music liked successfully!');
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log(response);
            console.log("error");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const spotifyActionsLikeTrack = async (data, accessToken, areaId) => {
    try {
        console.log('like track');
        const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            const track = String(result.items[0].track.name);
            console.log('Music liked successfully!');

            console.log(track);
            console.log(areaId);
            if (track != data || data === null) {
                console.log('Music liked successfully!');
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: track }
                )
                return true;
            }
            return false;
        } else {
            console.log(response);
            console.log("error");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

export default { actionsTriggers };