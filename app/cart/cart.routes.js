module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.get("/cart", protect, authorizeRoles("USER"), User.createUser);

    app.post("/cart/add", protect, authorizeRoles("USER"), User.loginUser);

    app.put("/cart/update", protect, authorizeRoles("USER"), User.refreshAccessToken);

    app.delete("/cart/remove/:productId", protect, authorizeRoles("USER"), User.logout);

    app.delete("/cart/clear", protect, authorizeRoles("USER"), User.logout);

};
