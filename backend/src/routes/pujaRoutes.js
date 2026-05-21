import express from "express";
import * as pujaController from "../controller/pujaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subastas/:id/pujar", authMiddleware, pujaController.realizarPuja);
router.get("/subastas/:id/historial-pujas", pujaController.obtenerHistorialPujas);
router.get("/subastas/:id/resultado", pujaController.obtenerResultado);

export default router;
