import express from "express";
import * as usuarioController from "../controller/usuarioController.js";
import * as articuloController from "../controller/articuloController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadImages, handleUploadError } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/usuarios/:id", authMiddleware, usuarioController.obtenerUsuario);
router.get("/usuarios/:id/medios-pago", authMiddleware, usuarioController.obtenerMediosPago);
router.post("/usuarios/:id/medios-pago", authMiddleware, usuarioController.agregarMedioPago);
router.get("/usuarios/:id/subastas-activas", authMiddleware, usuarioController.obtenerSubastasActivas);
router.get("/usuarios/:id/estadisticas", authMiddleware, usuarioController.obtenerEstadisticas);
router.get("/usuarios/:id/historial-participacion", authMiddleware, usuarioController.obtenerHistorialParticipacion);
router.get("/usuarios/:id/articulos", authMiddleware, articuloController.obtenerArticulosUsuario);
router.post("/usuarios/:id/articulos", authMiddleware, uploadImages, handleUploadError, articuloController.proponerArticulo);
router.get("/usuarios/:id/articulos/pendientes-aceptacion", authMiddleware, articuloController.obtenerArticulosPendientesAceptacion);
router.post("/usuarios/:id/articulos/:articuloId/aceptar", authMiddleware, articuloController.aceptarCondicionesArticulo);
router.post("/usuarios/:id/articulos/:articuloId/rechazar", authMiddleware, articuloController.rechazarCondicionesArticulo);
router.patch("/usuarios/:id", authMiddleware, usuarioController.actualizarUsuario);
router.delete("/usuarios/:id/medios-pago/:medioPagoId", authMiddleware, usuarioController.eliminarMedioPago);
router.get("/usuarios/:id/multas", authMiddleware, usuarioController.obtenerMultas);
router.post("/usuarios/:id/multas/:multaId/pagar", authMiddleware, usuarioController.pagarMulta);
export default router;
