import axios from 'axios';

export const spotifyCallbackService = async (req, res) => {
    const code = req.query.code;

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
        const { access_token, refresh_token } = response.data;



        return res.status(200).send("Access token retrieved");
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to retrieve access token" });
        }
    }
};

export default { spotifyCallbackService };
