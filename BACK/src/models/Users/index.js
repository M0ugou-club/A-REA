import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import email from '../schemas/email';


const UserSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    password: {type: String, required: false, select: false},
    username: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: email(),
    image: {type: String, required: false},
    tokens: [{type: 'ObjectId', ref: 'Token'}],
    created_at: {type: Date, required: false, default: Date.now},
    deleted: {type: Boolean, required: false, default: false}
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);

