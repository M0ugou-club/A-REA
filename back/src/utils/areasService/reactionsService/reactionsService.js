import { getAccesTokensServiceByUserId } from "../../../routes/tokens/indexService.js";
import { spotifyReactions } from "./spotifyReactions.js";
import youtubeReactions from "./youtubeReactionService.js";
import { xReactions } from "./xReactions.js";
import redditReactions from "./redditReactions.js";
import { twitchReactions } from "./twitchReactions.js";

export const reactionService = async (platform, action, userId) => {
  let accessToken = "";

  switch (platform) {
    case "Spotify":
      accessToken = await getAccesTokensServiceByUserId("Spotify", userId);
      spotifyReactions(action, accessToken, userId);
      break;
    case "X":
      accessToken = await getAccesTokensServiceByUserId("X", userId);
      xReactions(action, accessToken, userId);
      break;
    case "Youtube":
      accessToken = await getAccesTokensServiceByUserId("Youtube", userId);
      youtubeReactions(action, accessToken, userId);
      break;
    case "Twitch":
      accessToken = await getAccesTokensServiceByUserId("Twitch", userId);
      twitchReactions(action, accessToken, userId);
      break;
    case "Reddit":
      redditReactions(action, userId);
    default:
      return;
  }
  return;
};

export default { reactionService };
