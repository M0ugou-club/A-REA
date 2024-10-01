import { Router } from "express";
import { isUserAuth } from "../services/authService.js";
import { ObjectId } from "mongodb";

const tokensRoutes = Router();

tokensRoutes.get("/tokens", isUserAuth(), async (req, res) => {
  try {
    const db = await connectDB();
    const userId = new ObjectId(req.decoded.id);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      return res.json({ tokens: user.tokens });
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

tokensRoutes.get("/tokens/:id", isUserAuth(), async (req, res) => {
  const tokenId = req.params.id;

  try {
    const db = await connectDB();
    const userId = new ObjectId(req.decoded.id);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      const tokenInfo = user.tokens[tokenId];
      if (tokenInfo) {
        return res.json({ [tokenId]: tokenInfo });
      } else {
        return res.status(404).json({ message: "Token non trouvé" });
      }
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

tokensRoutes.get("/tokens/:id/:type", isUserAuth(), async (req, res) => {
  const tokenId = req.params.id;
  const tokenType = req.params.type;

  console.log(tokenType);

  try {
    const db = await connectDB();
    const userId = new ObjectId(req.decoded.id);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      const tokenInfo = user.tokens[tokenId];
      console.log(tokenInfo);
      console.log(tokenInfo[tokenType]);
      if (tokenInfo) {
        return res.json({
          [tokenId + " - " + tokenType]: tokenInfo[tokenType],
        });
      } else {
        return res.status(404).json({ message: "Token non trouvé" });
      }
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

tokensRoutes.post("/tokens/:id/:type", isUserAuth(), async (req, res) => {
  const tokenId = req.params.id;
  const tokenType = req.params.type;
  const value = req.body.token;

  try {
    const db = await connectDB();
    const userId = new ObjectId(req.decoded.id);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      const tokenInfo = user.tokens[tokenId];
      if (tokenInfo) {
        await db
          .collection("users")
          .updateOne(
            { _id: userId },
            { $set: { [`tokens.${tokenId}.${tokenType}`]: value } }
          );
        return res.status(200).json({ message: "Valeur changé" });
      } else {
        return res.status(404).json({ message: "Token non trouvé" });
      }
    } else {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

export default tokensRoutes;
