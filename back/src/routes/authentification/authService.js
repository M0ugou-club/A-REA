import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/Users/index.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};

export const registerUser = async (req, res, next) => {
  const { body } = req;
  let values = body;

  try {
    const hashPassword = bcrypt.hashSync(values.password, 10);
    const newUser = new User(values);

    newUser.password = hashPassword;
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

export const isUserAuth = () => {
  return (req, res, next) => {
    let token = ""

    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else if (req.query.token) {
      token = req.query.token;
    } else {
      return res.status(401).json({ message: "Token manquant" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }
    const newtoken = token.replace("Bearer ", "");
    jwt.verify(newtoken, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(498).json({ message: "Token invalide" });
      } else {
        req.decoded = decodedToken;
        return next();
      }
    });
  };
};

export default { loginUser, registerUser, isUserAuth };
