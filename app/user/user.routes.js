module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./user.controllers");


    // app.get("/users/profile", protect, authorizeRoles("USER"), User.createUser);

    // app.put("/users/profile", protect, authorizeRoles("USER"), User.loginUser);

    app.get("/users", protect, authorizeRoles("ADMIN"), User.getAllUser);

    // app.delete("/api/users/:id", protect, authorizeRoles("ADMIN"), User.logout);

};
