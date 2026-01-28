const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./MongoDBconfig/MongoDb");

dotenv.config();

const app = express();
app.use(express.json());


const routeModules = [
    "./app/routes/user.routes"
]

routeModules.forEach((routePath) => {
    require(routePath)(app);
});

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
