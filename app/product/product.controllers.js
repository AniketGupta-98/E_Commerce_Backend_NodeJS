const Product = require("../../MongoDBSchema/ProductsSchema");
const { uploadImage } = require("../utils/imageUpload");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      stock,
      category,
      brand,
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title & price required" });
    }

    let fileUrl = [];
    if (req.files) {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      const uploadPromises = req.files.map(file => uploadImage(file));
      fileUrl = await Promise.all(uploadPromises);
    }

    const product = await Product.create({
      title,
      description,
      price,
      discountPrice,
      stock,
      category,
      images: fileUrl,
      brand,
    });

    res.status(201).json({ success: true, message: "Product Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category, min, max } = req.query;

    let filter = { isActive: true };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });


    const productStatus = products.map(item => {
      const obj = item.toObject(); 

      return {
        ...obj,
        status:
          obj.stock === 0
            ? 'Out of Stock'
            : obj.stock <= 15
              ? 'Low Stock'
              : 'In Stock'
      };
    });

    res.json({ success: true, data: productStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });

    res.json({ success: true, message: "Product disabled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

