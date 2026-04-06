module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/coupons", protect, authorizeRoles("ADMIN"), User.createUser);

    app.get("/coupons", protect, authorizeRoles("ADMIN"), User.loginUser);

    app.post("/coupons/apply", protect, authorizeRoles("USER"), User.refreshAccessToken);


};
