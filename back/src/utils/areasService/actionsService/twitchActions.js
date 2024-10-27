import fetch from 'node-fetch';
import Actions from '../../../models/Action/index.js';
import { postAccesToken } from '../../addTokens.js';
import { getRefreshTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

const refreshTwitchAccessToken = async (refreshToken) => {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        throw new Error('Failed to refresh Spotify access token');
    }
};

export const actionsTriggersTwitch = async (userId, type, data, accessToken, areaId) => {
    try {
        switch (type) {
            case 'on_live_twitch_inox':
                if (await twitchActionsOnliveInox(data, accessToken, areaId) === true) {
                    return true;
                }
                return false;
            case 'on_live_twitch_michou':
                if (await twitchActionsOnliveMichou(data, accessToken, areaId) === true) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    } catch (error) {
        if (error.message.includes('401')) {
            const refreshToken = await getRefreshTokensServiceByUserId('Twitch', userId);
            const newAccessToken = await refreshTwitchAccessToken(refreshToken);
            await postAccesToken(userId, "Twitch", newAccessToken);
            return await actionsTriggersTwitch(userId, type, data, newAccessToken, areaId);
        }
        console.log(error);
    }
    return false
}

const twitchActionsOnliveInox = async (data, accessToken, areaId) => {
    const response = await fetch('https://api.twitch.tv/helix/streams?user_login=Inoxtag', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        },
    });

    if (response.ok) {
        const lives = await response.json();
        if (lives.data[0]) {
            const live = lives.data[0].title;
            if ((live != null && live != data) || (live != null && data === null)) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: live }
                )
                if (live) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
        return false;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Twitch API error: ${response.status} ${response.statusText}`);
    }
    return false;
}

const twitchActionsOnliveMichou = async (data, accessToken, areaId) => {
    const response = await fetch('https://api.twitch.tv/helix/streams?user_login=Michou', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        },
    });

    if (response.ok) {
        const lives = await response.json();
        if (lives.data[0]) {
            const live = lives.data[0].title;
            if ((live != null && live != data) || (live != null && data === null)) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: live }
                )
                if (live) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
        return false;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Twitch API error: ${response.status} ${response.statusText}`);
    }
    return false;
}

export default { actionsTriggersTwitch };