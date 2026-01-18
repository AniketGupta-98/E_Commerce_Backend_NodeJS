const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
