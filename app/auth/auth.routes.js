module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/auth/register", User.createUser);

    app.post("/auth/login", User.loginUser);

    app.post("/auth/refresh", User.refreshAccessToken);

    app.post("/auth/logout", protect, User.logout);
};
