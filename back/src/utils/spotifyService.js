import { getAccesTokensServiceByUserId } from '../routes/tokens/indexService.js'

export const spotifyReactions = async (action, userId) => {
  let accessToken = ""
  let deviceId = ""
  accessToken = await getAccesTokensServiceByUserId("Spotify", userId);
  deviceId = await getSpotifyDeviceId(accessToken);

  console.log('Action:', action);
  if (deviceId == null) {
    console.log('No active device found');
    return;
  }
  if (action == "Play") {
    console.log("deviceid", deviceId);
    console.log('Playing Mili');
    playMusic(accessToken, deviceId);
  }
  if (action == "Pause") {
    console.log('Pausing music');
    pauseMusic(accessToken, deviceId);
  }
  if (action == "AddQueue") {
    addMusicToQueue(accessToken, deviceId);
  }
  if (action == "Like") {
    likeMusic(accessToken);
  }
};

const playMusic = async (accessToken, deviceId) => {
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

  const response = await fetch(url, {
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
    console.log('Music started successfully!');
  } else {
    const errorData = await response.json();
    console.error('Failed to start music:', response.statusText, errorData);
  }
}

const pauseMusic = async (accessToken, deviceId) => {
  const url = `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    console.log('Music started successfully!');
  } else {
    const errorData = await response.json();
    console.error('Failed to start music:', response.statusText, errorData);
  }
}

const likeMusic = async (accessToken) => {
  const url = `https://api.spotify.com/v1/me/tracks?ids=1B0AVsL9wiQn8PfzLzKluH`;

  const response = await fetch(url, {
    method: 'PUT',
    headers : {
      Authorization: `Bearer ${accessToken}`
    }

  });

  if (response.ok) {
    console.log('Music liked successfully!');
  } else {
    const errorData = await response.json();
    console.error('Failed to like music:', response.statusText, errorData);
  }
}


const addMusicToQueue = async (accessToken, deviceId) => {
  let url = `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:1B0AVsL9wiQn8PfzLzKluH`;

  if (deviceId) {
    url += `&device_id=${deviceId}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    console.log('Music added to queue successfully!');
  }
  else {
    const errorData = await response.json();
    console.error('Failed to add music to queue:', response.statusText, errorData);
  }
}

const getSpotifyDeviceId = async (accessToken) => {
  const url = 'https://api.spotify.com/v1/me/player/devices';

  console.log(accessToken);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.log(response);
    return null;
  }

  const data = await response.json();
  console.log(data);
  const activeDevice = data.devices.find(device => device.is_active);

  if (!activeDevice) {
    console.log('No active device found');
    return null;
  }

  return activeDevice.id;
}


export default { spotifyReactions };
