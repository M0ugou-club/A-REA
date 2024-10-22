import fetch from 'node-fetch';
import Actions from '../../../models/Action/index.js';

export const actionsTriggersInstagram = async (type, data, accessToken, areaId) => {
    if (type === 'on_new_post') {
        if (await instagramActionsNewPost(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (type === 'on_four_millions') {
        if (await xActionsFourMillions(data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    return false;
}

const instagramActionsNewPost = async (data, accessToken, areaId) => {
    try {
        const response = await fetch(`https://graph.instagram.com/v12.0/7129711332?fields=id,username,account_type,media_count,media&access_token=${accessToken}`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log("Instagram User:", data);
        if (response.ok) {
            console.log("Followers Count:", data.followers_count);
            return data.followers_count;
        } else {
            console.log("Error fetching followers count:", data);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export default { actionsTriggersInstagram };