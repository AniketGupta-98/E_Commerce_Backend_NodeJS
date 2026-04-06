module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./auth.controllers");


    app.post("/reviews", protect, authorizeRoles("USER"), User.createUser);

    app.get("/reviews/:productId", User.loginUser);

    app.delete("/reviews/:productId", protect, authorizeRoles("ADMIN"), User.loginUser);



};
