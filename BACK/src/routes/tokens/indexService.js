import User from '../../models/Users/index.js';
import jwt from "jsonwebtoken";
import { promisify } from 'util';

const verifyToken = promisify(jwt.verify);

export const getAccesTokensServiceByUserToken = async (platform, header) => {
    const authToken = header.replace("Bearer ", "");
    if (!authToken) {
        throw new Error("Token manquant");
    }

    try {
        const decoded = await verifyToken(authToken, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = await User.findOne({
            _id: id,
        }).populate('tokens');
        if (!user) {
            throw new Error("User not found");
        }
        const userToken = user.tokens.find((token) => token.platform === platform);
        if (!userToken) {
            throw new Error("Token not found");
        }
        return userToken.accesstoken;
    } catch (error) {
        console.log("Error fetching user", error);
        throw error;
    }
}

export const getAccesTokensServiceByUserId = async (platform, userId) => {
    try {
        const user = await User.findOne({
            _id: userId,
        }).populate('tokens');
        if (!user) {
            console.log("User not found");
        }
        const userToken = user.tokens.find((token) => token.platform === platform);
        if (!userToken) {
            console.log("Token not found");
        }
        if (!userToken.accesstoken) {
            return null;
        }
        return userToken.accesstoken;
    } catch (error) {
        console.log("Error fetching user by ID", error);
        return null;
    }
}

export default { getAccesTokensServiceByUserToken, getAccesTokensServiceByUserId };