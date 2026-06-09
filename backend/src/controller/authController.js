import crypto from "crypto";
import Usuario from "../model/Usuario.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import RevokedToken from "../model/RevokedToken.js";
import { sendCodeEmail } from "../service/mailService.js";

const generarCodigo = () => crypto.randomInt(100000, 999999).toString();

export const registroInicial = async (req, res) => {
  try {
    const { nombre, apellido, email, pais, domicilio, documentoFrente, documentoDorso } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !email || !documentoFrente || !documentoDorso) {
      return res.status(400).json({
        codigo: "CAMPOS_REQUERIDOS",
        mensaje: "Faltan campos requeridos"
      });
    }

    // Verificar si email existe
    const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
    if (usuarioExistente) {
      return res.status(400).json({
        codigo: "EMAIL_EXISTENTE",
        mensaje: "El email ya está registrado"
      });
    }

    // Crear nuevo usuario en estado pendiente
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email: email.toLowerCase(),
      pais,
      domicilio,
      documentoFrente,
      documentoDorso,
      estado: "pendiente",
      categoria: "comun",
    });

    const codigo = generarCodigo();
    nuevoUsuario.codigoActivacion = codigo;
    nuevoUsuario.codigoActivacionExpira = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const usuarioGuardado = await nuevoUsuario.save();

    try {
      await sendCodeEmail({ to: usuarioGuardado.email, codigo, tipo: "activation" });
    } catch (mailError) {
      return res.status(500).json({
        codigo: "ERROR_EMAIL",
        mensaje: "No se pudo enviar el email de activación",
        detalle: mailError.message,
      });
    }

    res.status(201).json({
      mensaje: "Usuario registrado. Revisa tu email para completar el registro.",
      usuarioId: usuarioGuardado._id
    });
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message
    });
  }
};

export const activarCuenta = async (req, res) => {
  try {
    const { codigo, password } = req.body;

    if (!codigo || !password) {
      return res.status(400).json({
        codigo: "CAMPOS_REQUERIDOS",
        mensaje: "Codigo y password requeridos"
      });
    }

    const usuario = await Usuario.findOne({
      codigoActivacion: codigo,
      codigoActivacionExpira: { $gt: new Date() },
    });

    if (!usuario || (usuario.estado !== "pendiente" && usuario.estado !== "aprobado")) {
      return res.status(400).json({ codigo: "CODIGO_INVALIDO", mensaje: "Código inválido o expirado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    usuario.password = passwordHash;
    usuario.estado = "activo";
    usuario.codigoActivacion = undefined;
    usuario.codigoActivacionExpira = undefined;
    await usuario.save();

    const token = generateToken(usuario);

    res.json({
      mensaje: "Usuario activado correctamente",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        categoria: usuario.categoria,
        rol: usuario.rol,
      }
    });
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        codigo: "CREDENCIALES_INVALIDAS",
        mensaje: "Email y password requeridos"
      });
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) {
      return res.status(401).json({
        codigo: "CREDENCIALES_INVALIDAS",
        mensaje: "Credenciales inválidas"
      });
    }

    // Verificar password
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({
        codigo: "CREDENCIALES_INVALIDAS",
        mensaje: "Credenciales inválidas"
      });
    }

    // Generar JWT token
    const token = generateToken(usuario);

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        categoria: usuario.categoria,
        rol: usuario.rol,
      }
    });
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(204).send();
    }

    const token = authHeader.slice(7);
    const decoded = jwt.decode(token);
    const exp = decoded?.exp;
    const expiresAt = exp ? new Date(exp * 1000) : new Date(Date.now() + 24 * 3600 * 1000);

    const revoked = new RevokedToken({ token, expiresAt });
    await revoked.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message
    });
  }
};

export const solicitarRecuperacionPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        codigo: "CAMPOS_REQUERIDOS",
        mensaje: "Email requerido",
      });
    }

    const usuario = await Usuario.findOne({ email });
    // Respuesta neutra para no revelar si existe o no el usuario
    if (!usuario) {
      return res.json({
        mensaje: "Si el email existe, se enviaron instrucciones de recuperación",
      });
    }

    const codigo = generarCodigo();
    usuario.resetCode = codigo;
    usuario.resetCodeExpires = new Date(Date.now() + 60 * 60 * 1000);
    await usuario.save();

    try {
      await sendCodeEmail({ to: usuario.email, codigo, tipo: "password_reset" });
    } catch (mailError) {
      return res.status(500).json({
        codigo: "ERROR_EMAIL",
        mensaje: "No se pudo enviar el email de recuperación",
        detalle: mailError.message,
      });
    }

    res.json({
      mensaje: "Si el email existe, se enviaron instrucciones de recuperación",
    });
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message,
    });
  }
};

export const resetearPassword = async (req, res) => {
  try {
    const { codigo, password } = req.body;
    if (!codigo || !password) {
      return res.status(400).json({
        codigo: "CAMPOS_REQUERIDOS",
        mensaje: "Codigo y password requeridos",
      });
    }

    const usuario = await Usuario.findOne({
      resetCode: codigo,
      resetCodeExpires: { $gt: new Date() },
    });

    if (!usuario) {
      return res.status(400).json({
        codigo: "CODIGO_INVALIDO",
        mensaje: "Código inválido o expirado",
      });
    }

    usuario.password = await bcrypt.hash(password, 10);
    usuario.resetCode = undefined;
    usuario.resetCodeExpires = undefined;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message,
    });
  }
};
