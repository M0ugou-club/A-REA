import { spotifyReactions } from "./spotifyService.js";

export const reactionService = async (platform, action, userId) => {
    if (platform === "Spotify") {
        spotifyReactions(action, userId);
    }
    if (platform === "Discord") {
        console.log("Discord");
    }
    return;
};

export default { reactionService };
