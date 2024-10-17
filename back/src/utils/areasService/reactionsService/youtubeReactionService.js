import { getAccesTokensServiceByUserId } from "../../../routes/tokens/indexService.js";
import { google } from "googleapis";

export const youtubeReactions = async (action, userId) => {
  let access_token = getAccesTokensServiceByUserId("Youtube", userId);
  const Oauth2 = google.auth.OAuth2;

  const oauth2Client = new Oauth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: access_token,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  if (action == "Like") {
    const videoId = await getLastVideo(youtube);
    likeVideo(youtube, videoId);
  }

  if (action == "Dislike") {
    const videoId = await getLastVideo(youtube);
    dislikeVideo(youtube, videoId);
  }

  if (action == "AddWL") {
    const videoId = await getLastVideo(youtube);
    addVideoToPlaylistWL(youtube, videoId);
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

  const video = response.data.items;
  if (video.length == 0) {
    console.log("No video found");
    return;
  } else {
    const videoId = video[0].id.videoId;
    return videoId;
  }
};

const likeVideo = async (youtube, videoId) => {
  const response = await youtube.videos.rate({
    id: videoId,
    rating: "like",
  });

  if (response.status == 204) {
    console.log("Video liked successfully!");
  } else {
    console.error("Failed to like video:", response.statusText);
  }
  return;
};

const dislikeVideo = async (youtube, videoId) => {
  const response = await youtube.videos.rate({
    id: videoId,
    rating: "dislike",
  });

  if (response.status == 204) {
    console.log("Video disliked successfully!");
  } else {
    console.error("Failed to dislike video:", response.statusText);
  }
  return;
};

const addVideoToPlaylistWL = async (youtube, videoId) => {
  const response = await youtube.playlistItems.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        playlistId: "WL",
        resourceId: {
          kind: "youtube#video",
          videoId: videoId,
        },
      },
    },
  });

  if (response.status == 200) {
    console.log("Video added to Watch Later playlist successfully!");
  } else {
    console.error(
      "Failed to add video to Watch Later playlist:",
      response.statusText
    );
  }
};

