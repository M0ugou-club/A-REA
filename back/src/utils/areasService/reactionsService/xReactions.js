import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

export const xReactions = async (action, userId) => {
    let accessToken = ""
    let deviceId = ""

    accessToken = await getAccesTokensServiceByUserId("Spotify", userId);
    deviceId = await getSpotifyDeviceId(accessToken);
    if (deviceId == null) {
        console.log('No active device found');
        return;
    }
    switch (action) {
        case 'post_new_tweet':
            postNewTweet(accessToken, deviceId);
            break;
        default:
            return;
    }
    return;
};

const postNewTweet = async (accessToken, deviceId) => {
    try {
        const body = JSON.stringify({
            text: "Incroyable la nouvelle vidéo de Inoxtag !"
        });

        const response = await fetch(`https://api.twitter.com/2/tweets`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la création du tweet: ${response.statusText}`);
        } else {
            console.log('Tweet posted successfully!');
        }
        return;
    } catch (error) {
        console.log('Error when trying to post a new')
        console.log(error);
        return;
    }
}

export default { xReactions };
