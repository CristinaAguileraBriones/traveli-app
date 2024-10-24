const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "my-app", 
    image: "https://image.europafm.com/clipping/cmsimages01/2023/10/01/719E439F-A299-4673-8554-A9C43E3684D1/beyonce-planea-documental-renaissance-tour-cines_98.jpg?crop=1920,1080,x0,y78&width=1900&height=1069&optimize=low&format=webply"
  },
});

module.exports = multer({ storage });