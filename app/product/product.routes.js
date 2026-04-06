module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/products", protect, authorizeRoles("ADMIN"), User.createUser);

    app.get("/products", protect, User.loginUser);

    app.get("/products/:id", protect, User.refreshAccessToken);

    app.put("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

    app.delete("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

};
