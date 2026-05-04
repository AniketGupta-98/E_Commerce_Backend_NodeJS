module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const category = require("./category.controllers");


    app.post("/add/category", protect, authorizeRoles("ADMIN"), category.createCategory);

    app.get("/all/category", protect, category.getCategories);

    app.put("/category/:id", protect, authorizeRoles("ADMIN"), category.updateCategory);
    
    // app.delete("/categories/:id", protect, authorizeRoles("ADMIN"), category.logout);
    
    
    // app.get("/:id", getCategoryById);
};
