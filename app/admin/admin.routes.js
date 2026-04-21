module.exports = (app) => {
    const Admin = require("./admin.controllers");
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");

    app.post("/admin/login", authorizeRoles("ADMIN"), Admin.adminLogin);

    app.post("/create/product", protect, authorizeRoles("ADMIN"), Admin.createProduct);

    //     router.post("/products", protect, authorizeRoles("ADMIN"), createProduct);
    // router.put("/products/:id", protect, authorizeRoles("ADMIN"), updateProduct);
    // router.delete("/products/:id", protect, authorizeRoles("ADMIN"), deleteProduct);
    // router.get("/orders", protect, authorizeRoles("ADMIN"), getAllOrders);
    // router.get("/users", protect, authorizeRoles("ADMIN"), getAllUsers);

    app.post("/admin/usercreate", protect, authorizeRoles("ADMIN"), Admin.adminUserCreate);

};
