module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const product = require("./product.controllers");


    app.post("/products", protect, authorizeRoles("ADMIN"), product.createProduct);

    // app.get("/products", protect, User.loginUser);

    // app.get("/products/:id", protect, User.refreshAccessToken);

    // app.put("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

    // app.delete("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

};
