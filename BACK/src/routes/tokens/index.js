import bcrypt from 'bcryptjs';
import { Router } from 'express';
import Token from '../../models/Token/index.js';
import User from '../../models/Users/index.js';
import dotenv from 'dotenv';

dotenv.config();

const routeTokens = Router();

const getTokens = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            _id: id,
        }).populate('tokens');
        if (!user) {
            return res.status(405).json({
                message: 'User not found',
            });
        }
        res.status(200).json(user.tokens);
    }
    catch (error) {
        return next(error);
    }
}

const getToken = async (req, res, next) => {
    const { id, platform } = req.params;
    try {
        const user = await User.findOne({
            _id: id,
        }).populate('tokens');
        if (!user) {
            return res.status(405).json({
                message: 'User not found',
            });
        }
        const token = user.tokens.find((token) => token.platform === platform);
        if (!token) {
            return res.status(406).json({
                message: 'Token not found for platform ' + platform,
            });
        }
        res.status(200).json(token);
    } catch (error) {
        return next(error);
    }
}

const checkTokenExistence = (user, platform) => {
    return user.tokens.find((token) => token.platform === platform);
}

const postToken = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    let values = body;
    console.log('values', values);
    try {
      console.log(values);
        const user = await User.findOne({
            _id: id,
        });
        if (!user) {
            return res.status(405).json({
                message: 'User not found',
            });
        }
        if (checkTokenExistence(user, values.platform)) {
            return res.status(409).json({
                message: 'Token already exists for platform ' + values.platform,
            });
        } else {
            const token = new Token(values);
            await token.save();
            user.tokens.push(token);
            await user.save();
            res.status(200).json(token);
        }
    } catch (error) {
        return next(error);
    }
}

const patchToken = async (req, res, next) => {
    const { id, platform } = req.params;
    const { body } = req;
    let values = body;

    try {
        const user = await User.findOne({
            _id: id,
        }).populate('tokens');
        if (!user) {
            return res.status(405).json({
                message: 'User not found',
            });
        }
        const token = user.tokens.find((token) => token.platform === platform);
        if (!token) {
            return res.status(406).json({
                message: 'Token not found for platform ' + platform,
            });
        }
        Object.keys(values).forEach((key) => {
            token[key] = values[key];
        });
        await token.save();
        res.status(200).json(token);
    }
    catch (error) {
        return next(error);
    }
}

routeTokens.get('/tokens/user/:id', getTokens);
routeTokens.get('/tokens/user/:id/platform/:platform', getToken);
routeTokens.post('/tokens/user/:id', postToken);
routeTokens.patch('/tokens/user/:id/platform/:platform', patchToken);

export default routeTokens;
