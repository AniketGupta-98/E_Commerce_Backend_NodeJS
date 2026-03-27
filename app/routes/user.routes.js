module.exports = (app) => {
    const User = require("../controllers/user.controllers");

    app.post("/user/create", User.createUser);
    app.post("/user/login", User.loginUser);

//     router.post("/cart/add", protect, authorizeRoles("USER", "ADMIN"), addToCart);
// router.post("/orders/create", protect, authorizeRoles("USER", "ADMIN"), createOrder);
// router.get("/my-orders", protect, authorizeRoles("USER", "ADMIN"), getMyOrders);
};
