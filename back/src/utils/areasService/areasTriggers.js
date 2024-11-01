import User from '../../models/Users/index.js';
import Token from '../../models/Token/index.js';
import { reactionService } from './reactionsService/reactionsService.js'
import { actionsChanges } from './actionsService/actionsService.js';

const userIsConnectedToService = async (user, platformAction, platformReaction) => {
    const userTokenIds = user.tokens.map(token => token._id);
    const userTokens = await Token.find({ _id: { $in: userTokenIds } });

    const isConnectedToAction = userTokens.some(token => token.platform === platformAction);
    const isConnectedToReaction = userTokens.some(token => token.platform === platformReaction);

    if (isConnectedToAction && isConnectedToReaction) {
        return true;
    }

    return false;
}

export const actionsTriggers = async () => {
    const datasObject = {};

    const users = await User.find().populate({
        path: 'a_rea',
        populate: [
            { path: 'action' },
            { path: 'reactions' }
        ]
    });

    users.forEach(async user => {
        user.a_rea.forEach(async area => {
            if (await userIsConnectedToService(user, area.action.platform, area.reactions.platform)) {
                if (await actionsChanges(area.action?.platform, area.action?.type, area.action?.data, user._id, area.action._id) === true) {
                    reactionService(area.reactions.platform, area.reactions.type, user.id);
                }
            }
        });
    });
}

export default { actionsTriggers };