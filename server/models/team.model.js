import mongoose from "mongoose";
import keys from '../config/keys.js'
const { apiURL } = keys.app
const TeamSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        ImageUrl: { type: String, require: true, default: `${apiURL}/uploads/team-image.png` },
        track: { type: String, require: true },

    },
);

const Team = mongoose.model('team', TeamSchema);
export default Team
