const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./MongoDBconfig/MongoDb");

dotenv.config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(express.json());
app.use(cors());

const routeModules = [
    "./app/auth/auth.routes",
    // "./app/user/user.routes",
    "./app/admin/admin.routes"
]

routeModules.forEach((routePath) => {
    require(routePath)(app);
});

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5100;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
