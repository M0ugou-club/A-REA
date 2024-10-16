export const spotifyService = (token) => {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_REDIRECT_URI) {
        return "";
    }
    const client_id = encodeURIComponent(process.env.SPOTIFY_CLIENT_ID);
    const redirect_uri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
    const scope = encodeURIComponent('user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-library-modify user-library-read');
    const state = encodeURIComponent(token);
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;        
    return authUrl;
};

export default { spotifyService };