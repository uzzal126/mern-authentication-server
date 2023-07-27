const User = require("../model/userModel")
const Profile = require("../model/profileModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })
        const user = await newUser.save()

        // Create new profile after registered a new user
        const newProfile = new Profile({
            user: user._id,
        })
        
        // Save profile after registered a new user
        await newProfile.save()

        res.status(201).json({
            success: true,
            message: "Register successful", 
            user
        })
    } catch (error) {
        res.status(403).json({message: error.message})
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({username})

        if(!existingUser) {
            return res.status(400).json({message: "You are not registered user"})
        }

        const user = await bcrypt.compare(password, existingUser.password)

        if(user) {
            const token = await jwt.sign({id:existingUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "8h"})
            res.status(200).json({
                success: true,
                message: "Login Successful", 
                token: token
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Password invalid"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = { userRegister, userLogin }