import bcrypt from 'bcryptjs';
import { Router } from 'express';
import User from '../../models/Users/index.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const routeUser = Router();

const getUser = async (req, res, next) => {
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
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            return res.status(200).json(user);
        }
        );
    }
    catch (error) {
        return next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return next(error);
    }
}

const patchUser = async (req, res, next) => {
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
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            Object.keys(values).forEach((key) => {
                user[key] = values[key];
            }
            );
            await user.save();
            return res.status(200).json(user);
        }
        );
    }
    catch (error) {
        return next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
            await User.findOneAndUpdate({
                _id: id,
            }, {
                deleted: true,
            });
            return res.status(200).json();
        }
        );
    }
    catch (error) {
        return next(error);
    }
}

const checkOldPassword = async (oldPassword, user, email) => {
    if (user.password) {
        const result = await bcrypt.compare(oldPassword, user.password);
        return result;
    }
    return false;
}

const changePwd = async (req, res, next) => {
    const { body } = req;
    let values = body;

    try {
        const header = req.headers.authorization;
        const token = header.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            const { id } = decoded;
            const user = await User.findOne({
                _id: id,
            }).select('+password');
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            if (await checkOldPassword(values.oldPassword, user, values.email)) {
                const hashPassword = bcrypt.hashSync(values.newPassword, 10);
                user.password = hashPassword;
                await user.save();
                return res.status(200).json(user);
            } else {
                return res.status(401).json({
                    message: 'Invalid password',
                });
            }
        }
        );
    }
    catch (error) {
        return next(error);
    }
}

routeUser.get('/usersAll', getUsers);
routeUser.get('/users', getUser);
routeUser.patch('/users', patchUser);
routeUser.patch('/password', changePwd);
routeUser.delete('/users', deleteUser);
routeUser.post('/users', changePwd);

export default routeUser;
