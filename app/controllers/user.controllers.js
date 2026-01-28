const User = require("../../MongoDBSchema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
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
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const salt = process.env.BCRYPT_SALT;
        const hashedPassword = await bcrypt.hash(password, salt);

        const access_token = jwt.sign(
            {
                email: email,
                role: "User"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "100d",
            }
        );



        const user = await User.create({
            email,
            password: hashedPassword,
            accessToken: access_token
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            access_token: user.accessToken
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
        const hashedPassword = await bcrypt.compareSync(password, existingUser.password);

        if (hashedPassword) {
            res.status(201).json({
                success: true,
                message: "User successfully Login",
            });
        } else {
            res.status(201).json({
                success: true,
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

