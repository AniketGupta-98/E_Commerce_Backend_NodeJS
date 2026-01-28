const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        Fname: { type: String },
        Lname: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        accessToken: { type: String, required: true },
        phone: String,
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
        address: [
            {
                street: String,
                city: String,
                state: String,
                pincode: String,
                country: String,
            },
        ],
    },
    { timestamps: true }
);

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
