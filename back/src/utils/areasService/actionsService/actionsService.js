import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'
import { actionsTriggersSpotify } from './spotifyActions.js'
import { actionsTriggersOpenMeteo } from './openMeteoActions.js'
import { actionsTriggersYoutube } from './youtubeActions.js'

export const actionsChanges = async (platform, type, data, userId, areaId) => {
    switch (platform) {
        case 'Spotify':
            const accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
            if (await actionsTriggersSpotify(type, data, accessToken, areaId) === true) {
                return true;
            }
            return false;
        case 'OpenMeteo':
            if (actionsTriggersOpenMeteo(type, data) === true) {
                return true;
            }
            return false;
        case 'Youtube':
            if (await actionsTriggersYoutube(type) === true) {
                return true;
            }
            return false;
        default:
            return false;
    }
}

export default { actionsChanges }; 