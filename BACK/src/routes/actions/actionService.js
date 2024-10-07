import { spotifyActions } from "./spotifyService.js";

export const actionService = async (platform, action, userToken, res) => {
  if (platform === "Spotify") {
    spotifyActions(action, userToken, res);
  }
  if (platform === "Discord") {
    console.log("Discord");
  }
};

export default { actionService };
