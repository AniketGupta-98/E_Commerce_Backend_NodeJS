const User = require("../../MongoDBSchema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

exports.createUser = async (req, res) => {
    try {
        const { Fname, Lname, email, password } = req.body;

        if (!Fname || !Lname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            Fname:Fname,
            Lname:Lname,
            email,
            password: hashedPassword,
            role: "USER",
        });

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        user.accessToken=accessToken
        user.refreshToken = refreshToken;
        await user.save();

        const userData = {
            fName: user.Fname,
            lName: user.Lname,
            email: user.email,
            role: user.role,
        };

        res.status(201).json({
            success: true,
            message: "User created successfully",
            accessToken,
            refreshToken,
            data: userData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


exports.userProfile = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "Profile accessed",
            user: req.user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const fields = { email, password };

        for (const [key, value] of Object.entries(fields)) {
            if (!value || value.toString().trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: `${key} is required`
                });
            }
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists",
            });
        }
        
        const isMatch = await bcrypt.compareSync(password, existingUser.password);

        const accessToken = generateAccessToken(existingUser);
        const refreshToken = generateRefreshToken(existingUser);

        existingUser.refreshToken = refreshToken;
        await existingUser.save();


        if (isMatch) {
            return res.status(201).json({
                success: true,
                message: "Login successful",
                accessToken,
                refreshToken,
                user: {
                    email: existingUser.email,
                    role: existingUser.role,
                    fName: existingUser.Fname,
                    lName: existingUser.Lname,
                },
            });
        } else {
            res.status(201).json({
                success: false,
                message: "Wrong Password",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);

        return res.json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Token expired or invalid",
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.refreshToken = null;
        await user.save();

        return res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



