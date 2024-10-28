import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import platforms from "../schemas/platforms.js";

const TokenSchema = new mongoose.Schema({
  platform: { type: String, required: true, enum: platforms },
  accesstoken: { type: String, required: true },
  refreshtoken: { type: String, required: true },
  validity: { type: Date, required: true },
});

TokenSchema.plugin(uniqueValidator);

export default mongoose.model("Token", TokenSchema);
