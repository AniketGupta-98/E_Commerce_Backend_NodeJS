const User = require("../../MongoDBSchema/UserSchema");
const Dashboards = function (dashboard) {
    this.pid = dashboard.pid;
};


Dashboards.livedata = async (pid, result) => {
    try {
        if (!pid) {
            throw new Error("Missing parameter: pid");
        }

        const data = {
            pid,
            timestamp: new Date().toISOString(),
            message: "Live data fetched successfully",
        };

        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};

module.exports = Dashboards;
