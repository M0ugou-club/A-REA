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

export default { spotifyCallbackService };
