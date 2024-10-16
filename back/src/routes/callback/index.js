import { Router } from 'express';
import { spotifyCallbackService } from './indexService.js';

const callbackRoutes = Router();

callbackRoutes.get('/callback/:service', async (req, res) => {
    switch (req.params.service) {
        case 'Spotify':
            spotifyCallbackService(req, res);
            console.log("Spotify callback");
            return res.redirect('http://localhost:4200/home');
        default:
            return res.status(404).send({ message: "Service not found" });
    }
});

export default callbackRoutes;