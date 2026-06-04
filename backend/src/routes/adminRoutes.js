import express from "express";
import * as adminController from "../controller/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/articulos/pendientes", adminController.obtenerArticulosPendientes);
router.post("/articulos/:id/aprobar", adminController.aprobarArticulo);
router.post("/articulos/:id/rechazar", adminController.rechazarArticulo);
router.post("/subastas", adminController.crearSubasta);
router.post("/subastas/:id/agregarArticulo", adminController.agregarArticuloSubasta);

router.put("/articulos/:id/precio-base", adminController.definirPrecioArticulo);
router.put("/articulos/:id/comision", adminController.definirComisionArticulo);

router.post("/articulos/:id/cerrar", adminController.cerrarArticulo);
router.post("/subastas/:id/cerrar", adminController.cerrarSubasta);

router.post("/multas", adminController.crearMulta);
router.post("/multas/:id/levantar", adminController.levantarMulta);

router.post("/usuarios/:id/aprobar", adminController.aprobarUsuario);
router.post("/usuarios/:id/rechazar", adminController.rechazarUsuario);
router.post("/usuarios/:id/categoria", adminController.asignarCategoria);

export default router;
