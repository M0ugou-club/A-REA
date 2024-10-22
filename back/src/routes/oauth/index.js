import { Router } from 'express';
import { isUserAuth } from '../authentification/authService.js';
import { spotifyService, youtubeService, deezerService, xService, redditService, discordService } from './indexService.js';

const oauthRoutes = Router();

oauthRoutes.get('/oauth/:service', isUserAuth(), async (req, res) => {
    let authUrl = "";
    switch (req.params.service) {
        case 'Spotify':
            authUrl = spotifyService(req.query.token);
            return res.redirect(authUrl);
        case 'Youtube':
            authUrl = youtubeService(req.query.token);
            return res.redirect(authUrl);
        case 'Deezer':
            authUrl = deezerService(req.query.token);
            return res.redirect(authUrl);
        case 'X':
            authUrl = xService(req.query.token);
            return res.redirect(authUrl);
        case 'Reddit':
            authUrl = redditService(req.query.token);
            return res.redirect(authUrl);
        case 'Discord':
            authUrl = discordService(req.query.token);
            return res.redirect(authUrl);
        default:
            return res.status(404).send({ message: "Service not found" });
    }
});

export default oauthRoutes;