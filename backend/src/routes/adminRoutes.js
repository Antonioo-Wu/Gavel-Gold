import express from "express";
import * as adminController from "../controller/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/admin/articulos/pendientes", adminController.obtenerArticulosPendientes);
router.post("/admin/articulos/:id/aprobar", adminController.aprobarArticulo);
router.post("/admin/articulos/:id/rechazar", adminController.rechazarArticulo);
router.post("/admin/subastas", adminController.crearSubasta);
router.post("/admin/subastas/:id/agregarArticulo", adminController.agregarArticuloSubasta);
router.post("/usuarios/:id/verificar", adminController.verificarUsuario);

export default router;
