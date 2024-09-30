import { Router } from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { isUserAuth } from "../services/authService.js";

const authRoutes = Router();

authRoutes.post('/login', loginUser);

authRoutes.post('/register', registerUser);

authRoutes.get('/isLogged', isUserAuth(), (req, res) => {
    res.status(200).send({message: "User is logged"});
});

export default authRoutes;