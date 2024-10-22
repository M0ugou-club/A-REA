import { spotifyReactions } from "./spotifyReactions.js";
import youtubeReactions from "./youtubeReactionService.js";

export const reactionService = async (platform, action, userId) => {
    if (platform === "Spotify") {
        spotifyReactions(action, userId);
    }
    if (platform === "Youtube") {
        youtubeReactions(action, userId);
    }
    return;
};

export default { reactionService };
