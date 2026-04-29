module.exports = (app) => {
    const { protect } = require("../../middleware/auth.middleware");
    const { authorizeRoles } = require("../../middleware/role.middleware");
    const category = require("./category.controllers");


    app.post("/categories", protect, authorizeRoles("ADMIN"), category.createCategory);

    // app.put("/categories/:id", protect, authorizeRoles("ADMIN"), category.refreshAccessToken);
    
    // app.delete("/categories/:id", protect, authorizeRoles("ADMIN"), category.logout);
    
    app.get("/all/category", protect, category.getCategories);
    
    // app.get("/:id", getCategoryById);
};
