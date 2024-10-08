import { spotifyActions } from "./spotifyService.js";

export const reactionService = async (platform, action, userToken, res) => {
  if (platform === "Spotify") {
    spotifyActions(action, userToken, res);
  }
  if (platform === "Discord") {
    console.log("Discord");
  }
};

export default { reactionService };
