import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'

export const xReactions = async (action, userId) => {
    let accessToken = ""

    switch (action) {
        case 'post_new_tweet':
            console.log('post_new_tweet');
            postNewTweet(accessToken);
            break;
        default:
            return;
    }
    return;
};

const postNewTweet = async (accessToken) => {
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
            console.log(response);
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
