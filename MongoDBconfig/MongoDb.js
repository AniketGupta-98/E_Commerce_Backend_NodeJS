const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("❌ MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("✅ MongoDB connected successfully.");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Mongoose default connection is open 📡");
});

mongoose.connection.on("error", (err) => {
    console.error("Mongoose default connection error 🔥:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose default connection disconnected ⚠️");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to app termination 🛑");
    process.exit(0);
});

module.exports = connectDB;
