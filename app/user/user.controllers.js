const User = require("../../MongoDBSchema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");



exports.getAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;

        const skip = (page - 1) * limit;

        const users = await User.find()
            .select("-password -accessToken -refreshToken -_id")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        return res.json({
            success: true,
            user: users,
            meta: {
                totalUsers,
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit),

            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};




