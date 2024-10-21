import { google } from 'googleapis';

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
    const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
    const authUrl = authClient.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: token,
    });
 
    return authUrl;
}

export const instagramService = (token) => {
    if (!process.env.INSTAGRAM_CLIENT_ID || !process.env.INSTAGRAM_REDIRECT_URI || !process.env.INSTAGRAM_CLIENT_SECRET) {
        return "";
    }

    const client_id = encodeURIComponent(process.env.INSTAGRAM_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI);
    const scope = encodeURIComponent('user_profile,user_media');
    const state = encodeURIComponent(token);
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${state}`;
    return authUrl;
}

export default { spotifyService, youtubeService, instagramService };