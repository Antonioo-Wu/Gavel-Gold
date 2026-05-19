export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      codigo: "NO_AUTENTICADO",
      mensaje: "Usuario no autenticado",
    });
  }

  if (req.user.rol !== "admin") {
    return res.status(403).json({
      codigo: "PERMISO_DENEGADO",
      mensaje: "Se requieren permisos de administrador",
    });
  }

  next();
};
