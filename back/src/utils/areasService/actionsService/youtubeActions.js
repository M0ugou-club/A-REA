import fetch from 'node-fetch';
import { google } from 'googleapis';
import Actions from '../../../models/Action/index.js';

export const actionsTriggersYoutube = async (type, data, accessToken, areaId) => {
    if (type === 'on_new_video') {
        if (await youtubeActionsNewVideo(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_live') {
        if (await youtubeActionsLive(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_ten_millions') {
        if (await youtubeActionsTenMillions(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    return false;
}

const youtubeActionsNewVideo = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    try {
        const response = await youtube.search.list({
            channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
            order: 'date',
            part: "snippet",
            type: 'video',
            maxResults: 1
        });

        const video = response.data.items[0];
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
        return false;
    } catch (error) {
        return false;
    }
}

const youtubeActionsLive = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });
    try {
        const response = await youtube.search.list({
            channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
            eventType: 'live',
            part: "snippet",
            type: 'video',
            maxResults: 1
        });
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
        return false;
    } catch (error) {
        return false;
    }
}

const youtubeActionsTenMillions = async (data, accessToken, areaId) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });
    try {
        const response = await youtube.channels.list({
            part: 'statistics',
            id: process.env.YOUTUBE_INOX_CHANNEL_ID
        });

        const channel = response.data.items[0];
        const subscriberCount = channel.statistics.subscriberCount;
        if (subscriberCount >= 10000000) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export default { actionsTriggersYoutube };