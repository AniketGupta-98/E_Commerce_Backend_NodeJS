const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("No file buffer provided"));
    }
    
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: `product_${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};
