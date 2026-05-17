import express from "express";
import * as subastaController from "../controller/subastaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/subastas", subastaController.listarSubastas);
router.get("/subastas/:id/articulos", subastaController.obtenerArticulosSubasta);
router.post("/subastas/:id/participar", authMiddleware, subastaController.validarAcceso);

export default router;
