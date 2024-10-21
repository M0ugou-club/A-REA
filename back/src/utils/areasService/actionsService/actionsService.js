import { getAccesTokensServiceByUserId } from '../../../routes/tokens/indexService.js'
import { actionsTriggersSpotify } from './spotifyActions.js'
import { actionsTriggersOpenMeteo } from './openMeteoActions.js'
import { actionsTriggersYoutube } from './youtubeActions.js'

export const actionsChanges = async (platform, type, data, userId, areaId) => {
    let accessToken = "";
    switch (platform) {
        case 'Spotify':
            accessToken = await getAccesTokensServiceByUserId('Spotify', userId);
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
            accessToken = await getAccesTokensServiceByUserId('Youtube', userId);
            if (await actionsTriggersYoutube(type, data, accessToken, areaId) === true) {
                return true;
            }
            return false;
        default:
            return false;
    }
}

export default { actionsChanges }; 