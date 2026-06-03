import express from "express";
import * as pujaController from "../controller/pujaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
	"/subastas/:subastaId/articulos/:articuloId/pujar",
	authMiddleware,
	pujaController.realizarPuja
);
router.get(
	"/subastas/:subastaId/articulos/:articuloId/pujas",
	pujaController.obtenerHistorialPujas
);
router.get(
	"/subastas/:subastaId/articulos/:articuloId/pujas/estado",
	pujaController.obtenerEstadoPuja
);
router.get(
	"/subastas/:subastaId/articulos/:articuloId/resultado",
	pujaController.obtenerResultado
);

export default router;
