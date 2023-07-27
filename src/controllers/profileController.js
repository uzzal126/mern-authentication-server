const Profile = require("../model/profileModel")
const cloudinary = require("../utils/cloudinary")

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await Profile.findOne({user: userId})
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
    }
}

const updateProfile = async (req, res) => {
    try {
        // Get user id
        const userId = req.user.id

        // Retrieve the existing profile for the user
        const existingProfile = await Profile.findOne({ user: userId });

        let avatarUrl = null;
        let cloudinaryId = null;

        // Check if the "avatar" field exists in the form data
        if (req.file) {
            // Delete image from cloudinary
            if (existingProfile.cloudinary_id) {
                await cloudinary.uploader.destroy(existingProfile.cloudinary_id);
            }

            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            avatarUrl = result.secure_url;
            cloudinaryId = result.public_id;
        }

        const {bio, name, phone} = req.body

        // Retain the existing avatar values if no new avatar is selected
        if (!avatarUrl && existingProfile) {
            avatarUrl = existingProfile.avatar;
            cloudinaryId = existingProfile.cloudinary_id;
        }

        const profile = await Profile.findOneAndUpdate({user: userId}, {
            name,
            bio,
            phone,
            avatar: avatarUrl,
            cloudinary_id: cloudinaryId,
        }, {new: true})
        res.status(200).json({
            success: true, 
            message: "Profile update successfully",
            profile
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { updateProfile, getProfile }