module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/orders", protect, authorizeRoles("USER"), User.createUser);

    app.get("/orders/my", protect, authorizeRoles("USER"), User.loginUser);

    app.get("/orders", protect, authorizeRoles("ADMIN"), User.refreshAccessToken);

    app.get("/api/orders/:id", protect, authorizeRoles("USER","ADMIN"), User.logout);

    app.put("/api/orders/:id/status", protect, authorizeRoles("ADMIN"), User.logout);

};
