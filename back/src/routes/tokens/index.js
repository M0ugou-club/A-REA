import bcrypt from 'bcryptjs';
import { Router } from 'express';
import Token from '../../models/Token/index.js';
import User from '../../models/Users/index.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import platforms from '../../models/schemas/platforms.js';

dotenv.config();

const routeTokens = Router();

const getTokens = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
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
        );
    }
    catch (error) {
        return next(error);
    }
}

const getToken = async (req, res, next) => {
    const { platform } = req.params;
    try {
        const header = req.headers.authorization;
        const token = header.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
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
        }
        );
    } catch (error) {
        return next(error);
    }
}

const getTokenState = async (req, res, next) => {
    try {
        const response = {};

        const header = req.headers.authorization;
        const token = header?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
            const user = await User.findOne({ _id: id }).populate('tokens');
            if (!user) {
                return res.status(405).json({ message: 'User not found' });
            }
            platforms.forEach((platform) => {
                if (platform === 'OpenMeteo') {
                    return;
                }
                const platformToken = user.tokens.find((token) => token.platform === platform);
                response[platform] = !!platformToken;
            });

            return res.status(200).json(response);
        });
    } catch (error) {
        return next(error);
    }
}

const checkTokenExistence = (user, platform) => {
    return user.tokens.find((token) => token.platform === platform);
}

const postToken = async (req, res, next) => {
    const { body } = req;
    let values = body;
    try {
        const header = req.headers.authorization;
        const token = header.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
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
        });
    } catch (error) {
        return next(error);
    }
}

const patchToken = async (req, res, next) => {
    const { platform } = req.params;
    const { body } = req;
    let values = body;

    try {
        const header = req.headers.authorization;
        const tokena = header.replace("Bearer ", "");

        if (!tokena) {
            return res.status(401).json({ message: "Token manquant" });
        }

        jwt.verify(tokena, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
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
        });
    }
    catch (error) {
        return next(error);
    }
}

const delToken = async (req, res, next) => {
    console.log("delete token");
    const { platform } = req.params;

    try {
        const header = req.headers.authorization;
        const tokena = header.replace("Bearer ", "");
        if (!tokena) {
            return res.status(401).json({ message: "Token manquant" });
        }
        jwt.verify(tokena, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
            const user = await User.findOne({
                _id: id,
            }).populate('tokens');
            if (!user) {
                return res.status(405).json({
                    message: 'User not found',
                });
            }
            const tokenIndex = user.tokens.findIndex((token) => token.platform === platform);
            if (tokenIndex === -1) {
                return res.status(406).json({
                    message: 'Token not found for platform ' + platform,
                });
            }
            const tokenId = user.tokens[tokenIndex]._id;
            user.tokens.splice(tokenIndex, 1); // Remove the token from the array
            await user.save(); // Save the updated user
            await Token.findByIdAndDelete(tokenId); // Delete the token document from the collection
            res.status(200).json({ message: 'Token deleted successfully' });
        });
    }
    catch (error) {
        return next(error);
    }
}

routeTokens.get('/tokens', getTokens);
routeTokens.get('/tokens/platform/:platform', getToken);
routeTokens.get('/tokens/state', getTokenState);
routeTokens.post('/tokens', postToken);
routeTokens.patch('/tokens/platform/:platform', patchToken);
routeTokens.delete('/tokens/platform/:platform', delToken);

export default routeTokens;
