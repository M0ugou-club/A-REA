import axios from 'axios';
import { postToken } from '../../utils/addTokens.js';
import querystring from 'querystring';

export const spotifyCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const { access_token, refresh_token, expires_in} = response.data;
        const fakeDate = new Date('2030-01-01T00:00:00Z');
        postToken(state, "Spotify", access_token, refresh_token, fakeDate);

        return res.status(200).send("Access token retrieved");
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
};

export const youtubeCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }
    
    const dataSent = querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
        client_id: process.env.YOUTUBE_CLIENT_ID,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET,
    });

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', dataSent, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token, expires_in} = response.data;
        const fakeDate = new Date('2030-01-01T00:00:00Z');
        postToken(state, "Youtube", access_token, refresh_token, fakeDate);

        return res.status(200).send("Access token retrieved");
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
};

export const instagramCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }

    const dataSent = querystring.stringify({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code: code
    });

    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', dataSent, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token} = response.data;
        const longLivedTokenResponse = await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${access_token}`);
        const longLivedAccessToken = longLivedTokenResponse.data.access_token;
        const expires_in = longLivedTokenResponse.data.expires_in;
        const refresh_token = "";

        const fakeDate = new Date('2030-01-01T00:00:00Z');
        postToken(state, "Instagram", access_token, access_token, fakeDate);

        return res.status(200).send({ access_token: longLivedAccessToken, user_id: user_id });
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
}

export const xCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }

    const dataSent = querystring.stringify({
        code: code,
        grant_type: 'authorization_code',
        client_id: process.env.X_CLIENT_ID,
        redirect_uri: process.env.X_REDIRECT_URI,
        code_verifier: 'challenge',
    });

    try {
        const response = await axios.post('https://api.x.com/2/oauth2/token', dataSent, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64')}`
            },
        });

        const { access_token } = response.data;
        const fakeDate = new Date('2030-01-01T00:00:00Z');
        postToken(state, "X", access_token, access_token, fakeDate);

        return res.status(200).send({ access_token: access_token, user_id: user_id });
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
}

export const redditCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }

    const dataSent = querystring.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDDIT_REDIRECT_URI,
    });

    try {
        const response = await axios.post('https://www.reddit.com/api/v1/access_token', dataSent, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`
            },
        });

        const { access_token, refresh_token } = response.data;
        const fakeDate = new Date('2030-01-01T00:00:00Z');
        postToken(state, "Reddit", access_token, refresh_token, fakeDate);

        return res.status(200).send({ access_token: access_token, user_id: user_id });
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
}

export const tiktokCallbackService = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    console.log("----------------")
    if (!code) {
        return res.status(400).send({ message: "Authorization code not provided" });
    }

    console.log("client id", process.env.TIKTOK_CLIENT_ID);
    console.log("client secret", process.env.TIKTOK_CLIENT_SECRET);
    const dataSent = querystring.stringify({
        code: code,
        grant_type: 'authorization_code',
        client_key: process.env.TIKTOK_CLIENT_ID,
        redirect_uri: process.env.TIKTOK_REDIRECT_URI,
        code_verifier: 'challenge',
    });

    try {
        const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token', dataSent, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.TIKTOK_CLIENT_ID}:${process.env.TIKTOK_CLIENT_SECRET}`).toString('base64')}`
            },
        });

        const { access_token, refresh_token } = response.data;
        const fakeDate = new Date('2030-01-01T00:00:00Z');
        console.log("access_token tiktok ", access_token);
        console.log("refresh_token tiktok ", refresh_token);

        postToken(state, "TikTok", access_token, refresh_token, fakeDate);

        return res.status(200).send({ access_token: access_token, user_id: user_id });
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
}

export default { spotifyCallbackService };
