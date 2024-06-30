import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "rk03",
  api_key: "937333332693411",
  api_secret: "LaDPDDGMqe151JwaRBSOxqwcKpg",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "foodbengal",
    format: async (req, file) => "png",
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});

const multerUpload = multer({ storage: storage });

const upload = multerUpload.single("image");

export default upload;
