import { Router } from 'express';
import { isUserAuth } from '../authentification/authService.js';
import { spotifyService, youtubeService, instagramService, xService, redditService, tikTokService } from './indexService.js';

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
        case 'Instagram':
            authUrl = instagramService(req.query.token);
            return res.redirect(authUrl);
        case 'X':
            authUrl = xService(req.query.token);
            return res.redirect(authUrl);
        case 'Reddit':
            authUrl = redditService(req.query.token);
            return res.redirect(authUrl);
        case 'TikTok':
            authUrl = tikTokService(req.query.token);
            return res.redirect(authUrl);
        default:
            return res.status(404).send({ message: "Service not found" });
    }
});

export default oauthRoutes;