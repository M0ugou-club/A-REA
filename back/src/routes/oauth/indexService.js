import { google } from 'googleapis';
import crypto from 'crypto';

export const spotifyService = (token) => {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_REDIRECT_URI || !process.env.SPOTIFY_CLIENT_SECRET) {
        return "";
    }
    const client_id = encodeURIComponent(process.env.SPOTIFY_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
    const scope = encodeURIComponent('user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-library-modify user-library-read');
    const state = encodeURIComponent(token);
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;        
    return authUrl;
};

export const youtubeService = (token) => {
    if (!process.env.YOUTUBE_CLIENT_ID || !process.env.YOUTUBE_REDIRECT_URI || !process.env.YOUTUBE_CLIENT_SECRET) {
        return "";
    }
    const authClient = new google.auth.OAuth2(process.env.YOUTUBE_CLIENT_ID, process.env.YOUTUBE_CLIENT_SECRET, process.env.YOUTUBE_REDIRECT_URI);
    const scopes = ['https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl'];
    const authUrl = authClient.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: token,
    });

    return authUrl;
}

export const xService = (token) => {
    if (!process.env.X_CLIENT_ID || !process.env.X_REDIRECT_URI || !process.env.X_CLIENT_SECRET) {
        return "";
    }

    const client_id = encodeURIComponent(process.env.X_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.X_REDIRECT_URI);
    const scope = encodeURIComponent('tweet.read users.read follows.read follows.write');
    const state = encodeURIComponent(token);
    const code_challenge = 'challenge';
    const code_challenge_method = 'plain';
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`;
    return authUrl;
}

export const redditService = (token) => {
    if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_REDIRECT_URI || !process.env.REDDIT_CLIENT_SECRET) {
        return "";
    }

    const client_id = encodeURIComponent(process.env.REDDIT_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.REDDIT_REDIRECT_URI);
    const scope = encodeURIComponent('identity read');
    const state = encodeURIComponent(token);
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=${scope}`;
    return authUrl;
}

export const discordService = (token) => {
    if (!process.env.INSTAGRAM_CLIENT_ID || !process.env.INSTAGRAM_REDIRECT_URI || !process.env.INSTAGRAM_CLIENT_SECRET) {
        return "";
    }

    const client_id = encodeURIComponent(process.env.INSTAGRAM_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI);
    const scope = encodeURIComponent('user_profile,user_media,user_birthday');
    const state = encodeURIComponent(token);
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${state}`;
    return authUrl;
}

export const deezerService = (token) => {
    if (!process.env.INSTAGRAM_CLIENT_ID || !process.env.INSTAGRAM_REDIRECT_URI || !process.env.INSTAGRAM_CLIENT_SECRET) {
        return "";
    }

    const client_id = encodeURIComponent(process.env.INSTAGRAM_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI);
    const scope = encodeURIComponent('user_profile,user_media,user_birthday');
    const state = encodeURIComponent(token);
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${state}`;
    return authUrl;
}

export default { spotifyService, youtubeService, deezerService, xService, discordService, redditService};