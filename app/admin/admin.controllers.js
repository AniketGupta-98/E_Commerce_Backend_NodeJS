
exports.createProduct = async (req, res) => {
    try {
       return res.json({
            success: true,
            message: "Product created by admin",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

