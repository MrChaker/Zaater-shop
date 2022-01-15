const cloudinary = require('cloudinary');
const cloudImages = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
    color: true
  });

module.exports = cloudImages;