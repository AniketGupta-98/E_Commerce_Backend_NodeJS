module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/payments/create", protect, authorizeRoles("ADMIN"), User.createUser);

    app.post("/payments/webhook",  User.loginUser);
    
    app.get("/payments/:orderId", protect, authorizeRoles("ADMIN","USER"), User.logout);

};
