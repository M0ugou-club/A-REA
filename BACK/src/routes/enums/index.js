import { Router } from 'express';
import platforms from '../../models/schemas/platforms.js';
import actions from '../../utils/actions_types.js';
import reactions from '../../utils/reactions_types.js';

const routeEnums = Router();

const getEnumsPlatforms = async (req, res, next) => {
    try {
        return res.status(200).json(platforms);
    }
    catch (error) {
        return next(error);
    }
}

const getEnumsActions = async (req, res, next) => {
    try {
        return res.status(200).json(actions);
    }
    catch (error) {
        return next(error);
    }
}

const getEnumsReactions = async (req, res, next) => {
    try {
        return res.status(200).json(reactions);
    } catch (error) {
        return next(error);
    }
}

routeEnums.get('/enums/platforms', getEnumsPlatforms);
routeEnums.get('/enums/actions', getEnumsActions);
routeEnums.get('/enums/reactions', getEnumsReactions);

export default routeEnums;