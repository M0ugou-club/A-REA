import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import email from '../schemas/email.js';


const UserSchema = new mongoose.Schema({
    password: {type: String, required: false, select: false},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: email(),
    image: {type: String, required: false},
    tokens: [{type: 'ObjectId', ref: 'Token'}],
    a_rea: [{type: 'ObjectId', ref: 'Area'}],
    created_at: {type: Date, required: false, default: Date.now},
    deleted: {type: Boolean, required: false, default: false}
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);

