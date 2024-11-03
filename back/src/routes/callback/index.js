import { Router } from "express";
import {
  spotifyCallbackService,
  youtubeCallbackService,
  twitchCallbackService,
  xCallbackService,
  redditCallbackService,
} from "./indexService.js";

const callbackRoutes = Router();

callbackRoutes.get("/callback/:service", async (req, res) => {
  switch (req.params.service) {
    case "Spotify":
      spotifyCallbackService(req, res);
      return res.redirect(process.env.FRONTEND_URL + "/dashboard");
    case "Youtube":
      youtubeCallbackService(req, res);
      return res.redirect(process.env.FRONTEND_URL + "/dashboard");
    case "Twitch":
      twitchCallbackService(req, res);
      return res.redirect(process.env.FRONTEND_URL + "/dashboard");
    case "X":
      xCallbackService(req, res);
      return res.redirect(process.env.FRONTEND_URL + "/dashboard");
    case "Reddit":
      redditCallbackService(req, res);
      return res.redirect(process.env.FRONTEND_URL + "/dashboard");;
    default:
      return res.status(404).send({ message: "Service not found" });
  }
});

export default callbackRoutes;
