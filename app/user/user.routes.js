module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const User = require("./user.controllers");


    app.post("/user/create", User.createUser);

    app.post("/user/login", User.loginUser);

    app.post("/refresh-token", User.refreshAccessToken);

    app.post("/logout", protect, User.logout);


    app.get("/profile", protect, authorizeRoles("USER", "ADMIN"), User.userProfile);




    //     router.post("/cart/add", protect, authorizeRoles("USER", "ADMIN"), addToCart);
    // router.post("/orders/create", protect, authorizeRoles("USER", "ADMIN"), createOrder);
    // router.get("/my-orders", protect, authorizeRoles("USER", "ADMIN"), getMyOrders);
};
