const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "User name is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["admin", "author"],
        default: "author"
    },
    profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile"
    },
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model("User", userSchema)