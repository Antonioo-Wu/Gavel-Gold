import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath, options = {}) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "gavel-gold",
    ...options,
  });
  return result;
};

export const uploadImages = async (files, options = {}) => {
  const uploads = files.map((file) =>
    cloudinary.uploader.upload(file, {
      folder: "gavel-gold",
      ...options,
    })
  );
  return Promise.all(uploads);
};

export const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileWithExtension = parts[parts.length - 1];
  const publicId = fileWithExtension.split(".")[0];
  const folderIndex = parts.indexOf("gavel-gold");
  if (folderIndex !== -1) {
    return parts.slice(folderIndex).join("/").replace(/\.[^.]+$/, "");
  }
  return publicId;
};

export default cloudinary;
