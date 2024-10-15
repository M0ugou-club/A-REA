import Token from '../models/Token/index.js';
import User from '../models/Users/index.js';
import jwt from "jsonwebtoken";

const checkTokenExistence = (user, platform) => {
  return user.tokens.find((token) => token.platform === platform);
}

export const postToken = async (token, platform, access_token, refresh_token, validity) => {
  const values = {
      platform: platform,
      accesstoken: access_token,
      refreshtoken: refresh_token,
      validity: validity,
  };
  try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
              return 401;
          }
          const { id } = decoded;
          const user = await User.findOne({
              _id: id,
          });
          if (!user) {
              return 405;
          }
          if (checkTokenExistence(user, platform)) {
              return 409;
          } else {
              const Newtoken = new Token(values);
              await Newtoken.save();
              user.tokens.push(Newtoken);
              await user.save();
              return 200;
          }
      });
  } catch (error) {
      return 500;
  }
}

export default { postToken };
