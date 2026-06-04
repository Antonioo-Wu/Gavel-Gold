import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes JPEG, PNG, WebP y GIF"), false);
  }
};

export const uploadImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("fotos", 10);

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ codigo: "ARCHIVO_DEMASIADO_GRANDE", mensaje: "Cada foto debe pesar máximo 5MB" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ codigo: "DEMASIADOS_ARCHIVOS", mensaje: "Máximo 10 fotos" });
    }
    return res.status(400).json({ codigo: "ERROR_SUBIDA", mensaje: err.message });
  }
  if (err) {
    return res.status(400).json({ codigo: "ERROR_SUBIDA", mensaje: err.message });
  }
  next();
};
