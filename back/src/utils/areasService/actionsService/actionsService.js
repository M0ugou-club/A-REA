import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'
import { actionsTriggersSpotify } from './spotifyActions.js'
import { actionsTriggersOpenMeteo } from './openMeteoActions.js'

export const actionsChanges = async (platform, type, data, userId, areaId) => {
    if (platform === 'Spotify') {
        const accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
        if (await actionsTriggersSpotify(type, data, accessToken, areaId) === true) {
            return true;
        }
        return false;
    }
    if (platform === 'OpenMeteo') {
        if (actionsTriggersOpenMeteo(type, data) === true) {
            return true;
        }
        return false;
    }
    if (platform === 'Discord') {
        console.log('Discord');
    }
    return false;
}

export default { actionsChanges }; 