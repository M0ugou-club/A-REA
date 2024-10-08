import { Router } from 'express';
import { actionService } from './reactionService.js';

const routeActions = Router();

const testService = async (req, res, next) => {
    const action = req.params.action;
    const platform = req.params.platform;
    const userToken = req.headers.authorization;

    actionService(platform, action, userToken, res);
}

routeActions.get('/service/:platform/:action', testService);

export default routeActions;