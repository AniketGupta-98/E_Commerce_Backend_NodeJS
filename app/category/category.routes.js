module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/categories", protect, authorizeRoles("ADMIN"), User.createUser);

    app.get("/categories", protect, User.loginUser);

    app.put("/categories/:id", protect, authorizeRoles("ADMIN"), User.refreshAccessToken);

    app.delete("/categories/:id", protect, authorizeRoles("ADMIN"), User.logout);

};
