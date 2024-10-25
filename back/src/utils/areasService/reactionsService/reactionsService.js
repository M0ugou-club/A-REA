import { spotifyReactions } from "./spotifyReactions.js";
import youtubeReactions from "./youtubeReactionService.js";
import { xReactions } from "./xReactions.js";
import redditReactions from "./redditReactions.js";

export const reactionService = async (platform, action, userId) => {
    switch (platform) {
        case 'Spotify':
            spotifyReactions(action, userId);
            break;
        case 'X':
            xReactions(action, userId);
            break;
        case 'Youtube':
            youtubeReactions(action, userId);
            break;
        case 'Reddit':
            redditReactions(action, userId);
        default:
            return;
    }
    return;
};

export default { reactionService };
