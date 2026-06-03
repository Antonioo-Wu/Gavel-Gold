import express from "express";
import * as authController from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/usuarios/registro-inicial", authController.registroInicial);
router.post("/usuarios/activar", authController.activarCuenta);
router.post("/auth/recuperar-password", authController.solicitarRecuperacionPassword);
router.post("/auth/resetear-password", authController.resetearPassword);
router.post("/auth/logout", authMiddleware, authController.logout);

export default router;
