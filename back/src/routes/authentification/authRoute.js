import { Router } from "express";
import { loginUser, registerUser } from "./authService.js";
import { isUserAuth } from "../../routes/authentification/authService.js";

const authRoutes = Router();

authRoutes.post("/login", loginUser);

authRoutes.post("/register", registerUser);

authRoutes.get("/isLogged", isUserAuth(), (req, res) => {
  res.status(200).send({ message: "User is logged" });
});

export default authRoutes;
