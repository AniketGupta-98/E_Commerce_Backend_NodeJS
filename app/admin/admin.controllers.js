const User = require("../../MongoDBSchema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");


exports.adminLogin = async (req, res) => {
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

        existingUser.accessToken = accessToken;
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

exports.createProduct = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "Product created by admin",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.adminUserCreate = async (req, res) => {
    try {
        const { Fname, Lname, email, password, role } = req.body;

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
            Fname: Fname,
            Lname: Lname,
            email,
            password: hashedPassword,
            role: role,
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
        user.accessToken = accessToken
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
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};







