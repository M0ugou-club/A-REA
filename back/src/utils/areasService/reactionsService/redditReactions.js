import { getAccesTokensServiceByUserId } from "../../../routes/tokens/indexService.js";
import fetch from "node-fetch";

const redditReactions = async (action, userId) => {
  console.log("Reddit reaction");
  const access_token = await getAccesTokensServiceByUserId("Reddit", userId);

  console.log("test1");
  if (!access_token) {
    console.log("No access token found");
    return;
  }

  const post = await getLastPostAboutInoxtag(access_token);
  switch (action) {
    case "Like":
      await likePost(access_token, post);
      break;
    case "Dislike":
      await dislikePost(access_token, post);
      break;
    case "Comment":
      await commentPost(access_token, post);
      break;
    default:
      console.log("No action found");
  }
};

const getLastPostAboutInoxtag = async (access_token) => {
  try {
    const response = await fetch(
      "https://oauth.reddit.com/r/all/search.json?q=inoxtag&sort=new&limit=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Agent": "Area:v0.0.1",
        },
      }
    );

    const data = await response.json();

    if (!data.data || !data.data.children || data.data.children.length === 0) {
      console.log("No posts found");
      return null;
    }
    const post = data.data.children[0].data;
    console.log("Post found:", post.name);
    return post;
  } catch (error) {
    console.log("The error is:", error);
    return;
  }
};

const likePost = async (access_token, post) => {
  try {
    const postId = post.name;
    const response = await fetch(`https://oauth.reddit.com/api/vote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": "Area:v0.0.1",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      // Use URL-encoded form data
      body: new URLSearchParams({
        id: postId,
        dir: 1, // 1 for upvote
      }),
    });
    const data = await response.json();
    console.log("Response:", data);
    if (data.error) {
      console.error("Failed to like post:", data.error);
      return;
    }
    console.log("Post liked successfully");
  } catch (error) {
    console.error("Failed to like post:", error);
  }
};


const dislikePost = async (access_token, post) => {
  try {
    const postId = post.name;
    const response = await fetch(`https://oauth.reddit.com/api/vote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": "Area:v0.0.1",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        id: postId,
        dir: -1,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.error("Failed to dislike post:", data.error);
      return;
    }
    console.log("Post disliked successfully");
  } catch (error) {
    console.error("Failed to dislike post:", error);
  }
};

const commentPost = async (access_token, post) => {
  try {
    const postId = post.name;

    const response = await fetch(`https://oauth.reddit.com/api/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": "Area:v0.0.1",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        parent: postId,
        text: "OH MON DIEU TON POSTE MENTIONNE INOXTAG !!!",
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.log("Failed to comment on post:", data.error);
      return;
    }
    console.log("Commented on post successfully");
  } catch (error) {
    console.log("Failed to comment on post:", error);
  }
};

export default redditReactions;
