import jwt from 'jsonwebtoken';
import connectDB from './db.js';
import fs from 'fs';
import path from 'path';

const tokensTemplatePath = path.resolve('./src/utils/tokensTemplate.json');
const tokensTemplate = JSON.parse(fs.readFileSync(tokensTemplatePath, 'utf8'));

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    if (user) { 
      return res.status(409).json({ message: 'Utilisateur déjà existant' });
    }
    await db.collection('users').insertOne({ email, password, tokens: tokensTemplate });
    return res.status(201).json({ message: 'Utilisateur créé' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const isUserAuth = () => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(498).json({ message: 'Token invalide' });
      } else {
        req.decoded = decodedToken;
        return next();
      }
    });
  };
};

export default { loginUser, registerUser, isUserAuth };