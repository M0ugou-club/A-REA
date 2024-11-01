import fetch from "node-fetch";
import Actions from "../../../models/Action/index.js";

export const actionsTriggersX = async (
  userId,
  type,
  data,
  accessToken,
  areaId
) => {
  if (type === "on_new_tweet_inox") {
    if ((await xActionsNewPostInox(data, accessToken, areaId)) === true) {
      return true;
    }
    return false;
  }
  if (type === "on_new_tweet_me") {
    if ((await xActionsNewPostMe(data, accessToken, areaId)) === true) {
      return true;
    }
    return false;
  }
  if (type === "on_four_millions") {
    if ((await xActionsFourMillions(data, accessToken, areaId)) === true) {
      return true;
    }
    return false;
  }
  return false;
};

const xActionsNewPostInox = async (data, accessToken, areaId) => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/Inoxtag?user.fields=public_metrics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération du tweet: ${response.statusText}`
      );
    }

    const user = await response.json();
    if (user) {
      const tweetNb = user.data.public_metrics.tweet_count;
      if (tweetNb != data || data === null) {
        await Actions.findOneAndUpdate({ _id: areaId }, { data: tweetNb });
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const xActionsNewPostMe = async (data, accessToken, areaId) => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/me?user.fields=public_metrics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("error X :", response);
      throw new Error(
        `Erreur lors de la récupération du tweet: ${response.statusText}`
      );
    }

    const user = await response.json();
    if (user) {
      const tweetNb = user.data.public_metrics.tweet_count;
      if (tweetNb != data || data === null) {
        await Actions.findOneAndUpdate({ _id: areaId }, { data: tweetNb });
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const xActionsFourMillions = async (data, accessToken, areaId) => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/Inoxtag?user.fields=public_metrics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des informations de l'utilisateur : ${response.statusText}`
      );
    }

    const user = await response.json();
    if (user) {
      const followersCount = user.data.public_metrics.followers_count;
      if (followersCount >= 4000000) {
        return true;
      }
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default { actionsTriggersX };
