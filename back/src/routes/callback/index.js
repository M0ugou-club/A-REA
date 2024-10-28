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
      return res.redirect("http://localhost:4200/dashboard");
    case "Youtube":
      youtubeCallbackService(req, res);
      return res.redirect("http://localhost:4200/dashboard");
    case "Twitch":
      twitchCallbackService(req, res);
      return res.redirect("http://localhost:4200/dashboard");
    case "X":
      xCallbackService(req, res);
      return res.redirect("http://localhost:4200/dashboard");
    case "Reddit":
      redditCallbackService(req, res);
      return res.redirect("http://localhost:4200/dashboard");
    default:
      return res.status(404).send({ message: "Service not found" });
  }
});

export default callbackRoutes;
