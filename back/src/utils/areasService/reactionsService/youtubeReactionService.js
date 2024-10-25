import { getAccesTokensServiceByUserId } from "../../../routes/tokens/indexService.js";
import { google } from "googleapis";

const youtubeReactions = async (action, userId) => {
  let access_token = await getAccesTokensServiceByUserId("Youtube", userId);
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token: access_token,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  console.log("Youtube reaction:", action);

  if (action == "Like") {
    const videoId = await getLastVideo(youtube);
    await likeVideo(youtube, videoId);
  }

  if (action == "Dislike") {
    const videoId = await getLastVideo(youtube);
    await dislikeVideo(youtube, videoId);
  }

  if (action == "CommentVideo") {
    const videoId = await getLastVideo(youtube);
    await commentTheVideo(youtube, videoId);
  }
};

const getLastVideo = async (youtube) => {
  try {
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
      console.log("Last video id:", videoId);
      return videoId;
    }
  } catch (error) {
    console.error("Failed to get last video:", error);
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

const commentTheVideo = async (youtube, videoId) => {
  const response = await youtube.commentThreads.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        channelId: process.env.YOUTUBE_INOX_CHANNEL_ID,
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: "LA VIDEO EST TROP BIEN !",
          },
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

export default youtubeReactions
