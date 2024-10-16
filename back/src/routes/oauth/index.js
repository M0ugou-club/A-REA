import { Router } from 'express';
import { isUserAuth } from '../authentification/authService.js';
import { spotifyService } from './indexService.js';

const oauthRoutes = Router();

oauthRoutes.get('/oauth/:service', isUserAuth(), async (req, res) => {
    switch (req.params.service) {
        case 'Spotify':
            const authUrl = spotifyService(req.query.token);
            return res.redirect(authUrl);
        default:
            return res.status(404).send({ message: "Service not found" });
    }
});

export default oauthRoutes;