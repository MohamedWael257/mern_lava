import { EMAIL_PROVIDER, ROLES } from "../constants/index.js";
import keys from '../config/keys.js'
const { apiURL } = keys.app
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: () => {
            return this !== 'Email' ? false : true;
        }
    },
    email: {
        type: String,
        required: () => {
            return this !== 'Email' ? false : true;
        },
        unique: () => {
            return this !== 'Email' ? false : true;
        }
    },
    phoneNumber: {
        type: String,
        required: () => {
            return this !== 'Email' ? false : true;
        }
    },
    fullname: { type: String, default: "" },
    password: {
        type: String,
        required: () => {
            return this !== 'Email' ? false : true;
        }
    },
    provider: { type: String, required: true, default: EMAIL_PROVIDER.Email },
    googleId: { type: String },
    facebookId: { type: String },
    githubId: { type: String },
    address: { type: String, default: "" },
    gender: { type: String, default: "" },
    photoimage: { type: String, default: `${apiURL}/uploads/Avatar.png` },
    role: { type: String, default: ROLES.Member, enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    updated: { type: String },
    created: { type: Date, default: Date.now }
});
const User = mongoose.model("users", UserSchema);
export default User