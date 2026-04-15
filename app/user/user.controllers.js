const User = require("../../MongoDBSchema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");



exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password -accessToken -refreshToken");;
        return res.json({
            success: true,
            message: "Profile accessed",
            user: users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};




