import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

export const twitchReactions = async (action, accessToken, userId) => {
    switch (action) {
        case 'comment_inox_live':
            commentLiveInox(accessToken);
            return;
        case 'comment_michou_live':
            commentLiveMichou(accessToken);
            return;
        default:
            return;
    }
    return;
};

const getTwitchUserId = async (accessToken) => {
    try {
        const response = await fetch('https://api.twitch.tv/helix/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        
        const userInfo = await response.json();
        if (userInfo.data[0]) {
            return userInfo.data[0].id;
        } else {
            console.log("Error: No user found");
            return "";
        }
        return "";
    } catch (error) {
        console.error('Error fetching twitch data:', error.response ? error.response.data : error.message);
        return "";
    }
}

const commentLiveInox = async (data, accessToken, areaId) => {
    let sender_id = "";

    sender_id = await getTwitchUserId(accessToken);
    try {
        const response = await fetch(`https://api.twitch.tv/helix/chat/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "broadcaster_id": "80716629",
                "sender_id": sender_id,
                "message": "J'adore tes lives Inox ! Mentalé Kaizen !"
            })
        });

        const lives = await response.json();
        if (lives.data[0]) {
            const live = lives.data[0].title;
            if ((live != null && live != data) || (live != null && data === null)) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: live }
                )
                return true;
            }
            return false;
        }
        return false;
    } catch (error) {
        console.error('Error fetching twitch data:', error.response ? error.response.data : error.message);
        return false;
    }
}

const commentLiveMichou = async (data, accessToken, areaId) => {
    let sender_id = "";

    sender_id = await getTwitchUserId(accessToken);
    try {
        const response = await fetch(`https://api.twitch.tv/helix/chat/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "broadcaster_id": "505613877",
                "sender_id": sender_id,
                "message": "Je découvre le jeu, il est bien sympa"
            })
        });

        const lives = await response.json();
        if (lives.data[0]) {
            const live = lives.data[0].title;
            console.log("live", live);
            if ((live != null && live != data) || (live != null && data === null)) {
                await Actions.findOneAndUpdate(
                    { _id: areaId },
                    { data: live }
                )
                return true;
            }
            return false;
        }
        return false;
    } catch (error) {
        console.error('Error fetching twitch data:', error.response ? error.response.data : error.message);
        return false;
    }
}

export default { twitchReactions };
