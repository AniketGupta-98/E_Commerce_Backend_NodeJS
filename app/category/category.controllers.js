const Category = require("../../MongoDBSchema/CategoriesSchema");


exports.createCategory = async (req, res) => {
try {
    const { name, description, parentCategory } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name & description required" });
    }

    const category = await Category.create({
        name,
        description,
        parentCategory: parentCategory || null,
    });

    const { isActive, _id, createdAt, updatedAt,__v, ...filteredCategory } = category.toObject();

    res.status(201).json({ success: true, data: filteredCategory });

} catch (err) {
    res.status(500).json({ message: err.message });
}
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate("parentCategory", "name")
            .sort({ createdAt: -1 });

        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate(
            "parentCategory",
            "name"
        );

        if (!category) return res.status(404).json({ message: "Not found" });

        res.json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            isActive: false,
        });

        res.json({ success: true, message: "Category disabled" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



