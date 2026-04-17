module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const product = require("./product.controllers");
    const multer = require("multer");

    const storage = multer.memoryStorage({
        destination: function (req, file, callback) {
            callback(null, "");
        },
    });
    const upload = multer({ storage: storage });



    app.post("/create/products", protect, authorizeRoles("ADMIN"), upload.array('images', 5), product.createProduct);

    app.get("/products", protect, product.getProducts);

    // app.get("/products/:id", protect, User.refreshAccessToken);

    // app.put("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

    // app.delete("/products/:id", protect, authorizeRoles("ADMIN"), User.logout);

};
