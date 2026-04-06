const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../MongoDBSchema/UserSchema");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const seedAdmin = async () => {

  await mongoose.connect(process.env.MONGO_URI);

  console.log("✅ MongoDB Connected");
  const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

  if (existingAdmin) {
    console.log("❌ Admin already exists"); process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

seedAdmin();
