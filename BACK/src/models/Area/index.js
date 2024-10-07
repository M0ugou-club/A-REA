import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";


const AreaSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    action: {type: 'ObjectId', ref: 'Action'},
    reactions: {type: 'ObjectId', ref: 'Reaction'},
    update_delay: {type: Number, required: true},
    last_update: {type: Date, required: true, default: Date.now},
    deleted: {type: Boolean, required: false, default: false}
});

AreaSchema.plugin(uniqueValidator);

export default mongoose.model('Area', AreaSchema);

