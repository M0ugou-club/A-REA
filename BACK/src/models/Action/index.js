import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import platforms from '../schemas/platforms';


const ActionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    type: {type: String, required: true},
    platform: {type: String, required: true, enum: platforms},
    deleted: {type: Boolean, required: false, default: false}
});

ActionSchema.plugin(uniqueValidator);

export default mongoose.model('Action', AreaSchema);
