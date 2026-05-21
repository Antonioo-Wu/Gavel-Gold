import express from "express";
import * as usuarioController from "../controller/usuarioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/usuarios/:id", authMiddleware, usuarioController.obtenerUsuario);
router.get("/usuarios/:id/medios-pago", authMiddleware, usuarioController.obtenerMediosPago);
router.post("/usuarios/:id/medios-pago", authMiddleware, usuarioController.agregarMedioPago);
router.get("/usuarios/:id/subastas-activas", authMiddleware, usuarioController.obtenerSubastasActivas);
router.get("/usuarios/:id/estadisticas", authMiddleware, usuarioController.obtenerEstadisticas);
router.get("/usuarios/:id/historial-participacion", authMiddleware, usuarioController.obtenerHistorialParticipacion);
router.get("/usuarios/:id/articulos", authMiddleware, usuarioController.obtenerArticulosUsuario);
router.post("/usuarios/:id/articulos", authMiddleware, usuarioController.proponerArticulo);

export default router;
