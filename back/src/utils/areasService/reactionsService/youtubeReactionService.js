import { getAccesTokensServiceByUserId } from "../../../routes/tokens/indexService.js";
import { google } from "googleapis";
import { postAccesToken } from "../../addTokens.js";
import { getRefreshTokensServiceByUserId } from "../../../routes/tokens/indexService.js";

const refreshYoutubeAccessToken = async (refreshToken) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    throw new Error("Failed to refresh Youtube access token");
  }
};

const getLastVideo = async (youtube) => {
  const response = await youtube.search.list({
    channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
    order: "date",
    part: "snippet",
    type: "video",
    maxResults: 1,
  });

  if (response.status == 200) {
    const video = response.data.items;
    if (video.length == 0) {
      console.log("No video found");
      return;
    } else {
      const videoId = video[0].id.videoId;
      console.log("Last video id:", videoId);
      return videoId;
    }
    return;
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Youtube API error: ${response.status} ${response.statusText}`
    );
  }
  return;
};

const youtubeReactions = async (action, accessToken, userId) => {
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const videoId = await getLastVideo(youtube);
    switch (action) {
      case "Like":
        await likeVideo(youtube, videoId);
        return;
      case "Dislike":
        await dislikeVideo(youtube, videoId);
        return;
      case "CommentVideo":
        await commentTheVideo(youtube, videoId);
        return;
      default:
        return;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshToken = await getRefreshTokensServiceByUserId(
        "Youtube",
        userId
      );
      const newAccessToken = await refreshYoutubeAccessToken(refreshToken);
      await postAccesToken(userId, "Youtube", newAccessToken);
      return await youtubeReactions(action, newAccessToken, userId);
    }
    console.log(error);
  }
};

const likeVideo = async (youtube, videoId) => {
  const response = await youtube.videos.rate({
    id: videoId,
    rating: "like",
  });

  if (response.status == 200) {
    console.log("Video liked successfully!");
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Youtube API error: ${response.status} ${response.statusText}`
    );
  }
  return;
};

const dislikeVideo = async (youtube, videoId) => {
  const response = await youtube.videos.rate({
    id: videoId,
    rating: "dislike",
  });

  if (response.status == 200) {
    console.log("Video disliked successfully!");
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Youtube API error: ${response.status} ${response.statusText}`
    );
  }
  return;
};

const commentTheVideo = async (youtube, videoId) => {
  const response = await youtube.commentThreads.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: "Merci Inox pour tes videos",
          },
        },
      },
    },
  });

  if (response.status == 200) {
    console.log("Video commented!");
  } else {
    console.log("Error :", response.status + " " + response.statusText);
    throw new Error(
      `Youtube API error: ${response.status} ${response.statusText}`
    );
  }
  return;
};

export default youtubeReactions;
