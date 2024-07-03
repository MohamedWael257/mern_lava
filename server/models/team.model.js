import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        ImageUrl: { type: String, require: true, default: "Uploads/Product.jpg" },
        track: { type: String, require: true },

    },
);

const Team = mongoose.model('team', TeamSchema);
export default Team
