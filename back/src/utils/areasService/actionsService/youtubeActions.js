import fetch from 'node-fetch';
import { google } from 'googleapis';
import Actions from '../../../models/Action/index.js';
import { postAccesToken } from '../../addTokens.js';
import { getRefreshTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

const refreshYoutubeAccessToken = async (refreshToken) => {
    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.YOUTUBE_CLIENT_ID,
            client_secret: process.env.YOUTUBE_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        throw new Error('Failed to refresh Youtube access token');
    }
};

export const actionsTriggersYoutube = async (userId, type, data, accessToken, areaId) => {
    try {
        switch (type) {
            case 'on_new_video':
                if (await youtubeActionsNewVideo(data, accessToken, areaId) === true) {
                    return true;
                }
                return false;
            case 'on_live':
                if (type === 'on_live') {
                    if (await youtubeActionsLive(data, accessToken, areaId) === true) {
                        return true;
                    }
                    return false;
                }
            case 'on_ten_millions':
                if (await youtubeActionsTenMillions(data, accessToken, areaId) === true) {
                    return true;
                }
                return false;
            default:
                return false
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const refreshToken = await getRefreshTokensServiceByUserId('Youtube', userId);
            const newAccessToken = await refreshYoutubeAccessToken(refreshToken);
            await postAccesToken(userId, "Youtube", newAccessToken);
            return await actionsTriggersYoutube(userId, type, data, newAccessToken, areaId);
        }
    }
}

const youtubeActionsNewVideo = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    const response = await youtube.search.list({
        channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
        order: 'date',
        part: "snippet",
        type: 'video',
        maxResults: 1
    });

    if (response.status == 200) {
        const video = response.data.items[0];
        if (video) {
            const title = video.snippet.title;
            if (title) {
                if (title != data || data === null) {
                    await Actions.findOneAndUpdate(
                        { _id: areaId },
                        { data: title }
                    )
                    return true;
                }
            }
        }
        return false;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Youtube API error: ${response.status} ${response.statusText}`);
    }
    return false;    
}

const youtubeActionsLive = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    const response = await youtube.search.list({
        channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
        eventType: 'live',
        part: "snippet",
        type: 'video',
        maxResults: 1
    });

    if (response.status == 200) {
        const live = response.data.items[0];
        if (live) {
            if (live != data || data === null) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: title }
                )
                return true;
            }
        }
        return false
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Youtube API error: ${response.status} ${response.statusText}`);
    }
    return false;
}

const youtubeActionsTenMillions = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    const response = await youtube.channels.list({
        part: 'statistics',
        id: process.env.YOUTUBE_INOX_CHANNEL_ID
    });

    if (response.status == 200) {
        const channel = response.data.items[0];
        if (channel) {
            const subscriberCount = channel.statistics.subscriberCount;
            if (subscriberCount >= 10000000) {
                return true;
            }
        }
        return false;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Youtube API error: ${response.status} ${response.statusText}`);
    }
    return false; 
}

export default { actionsTriggersYoutube };