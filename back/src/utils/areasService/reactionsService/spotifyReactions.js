import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'
import { postAccesToken } from '../../addTokens.js';
import { getRefreshTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

const refreshSpotifyAccessToken = async (refreshToken) => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
};


const getSpotifyDeviceId = async (accessToken) => {
    const url = 'https://api.spotify.com/v1/me/player/devices';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        console.log("response : ", response);
        return null;
    }
    const data = await response.json();
    const activeDevice = data.devices.find(device => device.is_active);
    if (!activeDevice) {
        console.log('No active device found');
        return null;
    }
    return activeDevice.id;
}

export const spotifyReactions = async (action, accessToken, userId) => {
    let deviceId = ""

    try {
        deviceId = await getSpotifyDeviceId(accessToken);
        if (deviceId == null) {
            console.log('No active device found');
            return;
        }
        switch(action) {
            case "Play":
                playMusic(accessToken, deviceId);
                return;
            case "Pause":
                pauseMusic(accessToken, deviceId);
                return;
            case "AddQueue":
                addMusicToQueue(accessToken, deviceId);
                return;
            case "Like":
                likeMusic(accessToken);
                return;
            default:
                return;
        }
    } catch (error) {
        if (error.message.includes('401')) {
            const refreshToken = await getRefreshTokensServiceByUserId('Spotify', userId);
            const newAccessToken = await refreshSpotifyAccessToken(refreshToken);
            await postAccesToken(userId, "Spotify", newAccessToken);
            return await spotifyReactions(action, newAccessToken, userId);
        }
        console.log(error);
    }
};

const playMusic = async (accessToken, deviceId) => {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        uris: ["spotify:track:1B0AVsL9wiQn8PfzLzKluH"]
        })
    });

    if (response.ok) {
        return;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    return;
}

const pauseMusic = async (accessToken, deviceId) => {
    const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        return;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    return;
}

const likeMusic = async (accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=1B0AVsL9wiQn8PfzLzKluH`, {
        method: 'PUT',
        headers : {
        Authorization: `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        return;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    return;
}


const addMusicToQueue = async (accessToken, deviceId) => {
    const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:1B0AVsL9wiQn8PfzLzKluH&device_id=${deviceId}`, {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        return;
    } else {
        console.log("Error :", response.status + " " + response.statusText);
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    return;
}

export default { spotifyReactions };
