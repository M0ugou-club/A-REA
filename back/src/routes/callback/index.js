import { Router } from 'express';
import { spotifyCallbackService, youtubeCallbackService, instagramCallbackService, xCallbackService, redditCallbackService } from './indexService.js';

const callbackRoutes = Router();

callbackRoutes.get('/callback/:service', async (req, res) => {
    console.log("zizizizziziziiziziz");
    switch (req.params.service) {
        case 'Spotify':
            spotifyCallbackService(req, res);
            console.log("Spotify callback");
            return res.redirect('http://localhost:4200/dashboard');
        case 'Youtube':
            youtubeCallbackService(req, res);
            console.log("Youtube callback");
            return res.redirect('http://localhost:4200/dashboard');
        case 'Instagram':
            instagramCallbackService(req, res);
            return res.redirect('http://localhost:4200/dashboard');
        case 'X':
            xCallbackService(req, res);
            return res.redirect('http://localhost:4200/dashboard');
        case 'Reddit':
            redditCallbackService(req, res);
            return res.redirect('http://localhost:4200/dashboard');
        default:
            return res.status(404).send({ message: "Service not found" });
    }
});

export default callbackRoutes;