import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "tu_secret_key_muy_segura";

export const authMiddleware = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("[authMiddleware] NO_TOKEN ->", req.method, req.originalUrl);
      return res.status(401).json({
        codigo: "NO_TOKEN",
        mensaje: "Token no proporcionado",
      });
    }

    const token = authHeader.slice(7);

    // check revoked tokens
    try {
      const RevokedToken = (await import("../model/RevokedToken.js")).default;
      const revoked = await RevokedToken.findOne({ token });
      if (revoked) {
        return res.status(401).json({ codigo: "TOKEN_REVOKED", mensaje: "Token revocado" });
      }
    } catch (_) {
      // ignore if model not available at import time
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        codigo: "TOKEN_EXPIRADO",
        mensaje: "Token expirado",
      });
    }

    res.status(401).json({
      codigo: "TOKEN_INVALIDO",
      mensaje: "Token inválido",
    });
  }
};

export const generateToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
};
