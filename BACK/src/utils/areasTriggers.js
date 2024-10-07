import User from '../../src/models/Users/index.js';
import actions from './actions_types.js'
import { getAccesTokensServiceByUserId } from '../routes/tokens/indexService.js'

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
            if (await actionsChanges(area.action.platform, area.action.type, area.action.data, user._id, area._id)) {
                console.log('do reaction');
            }
        });
    }); 
}

const actionsChanges = async (platform, type, data, userId, areaId) => {
    console.log(platform, type, data);
    if (platform === 'Spotify') {
        const accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
        console.log(accessToken);
        if (await actionsTriggersSpotify(type, data, accessToken, userId, areaId)) {
            return true;
        }
    }
    if (platform === 'Discord') {
        console.log('Discord');
    }
    return false;
}

const actionsTriggersSpotify = async (type, data, accessToken, userId, areaId) => {
    if (type === 'on_new_track_spotify') {
        return true;
    }
    if (type === 'on_new_album_spotify') {
        console.log('on_new_album_spotify');
        return true;
    }
    if (type === 'on_new_playlist_spotify') {
        console.log('on_new_playlist_spotify');
        return true;
    }
    if (type === 'on_like_track_spotify') {
        console.log('on_like_track_spotify');
        if (await spotifyActionsLikeTrack(data, accessToken, userId, areaId)) {
            return true;
        }
    }
    return false;
}

const spotifyActionsLikeTrack = async (data, accessToken, userId, areaId) => {
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
            const track = result.items[0].track;
            console.log(track.name);
            console.log('Music liked successfully!');
            if (track.name === data || data === null) {
                await User.updateOne(
                    { _id: userId, 'a_rea._id': areaId },
                    { $set: { 'a_rea.$.action.data': track.name } }
                );
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