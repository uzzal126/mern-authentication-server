const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    phone: {
        type: Number
    },
    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("Profile ", profileSchema)