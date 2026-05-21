import Usuario from "../model/Usuario.js";
import bcrypt from "bcrypt";
import { generateToken, getSecretKey } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import RevokedToken from "../model/RevokedToken.js";

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
    const usuarioExistente = await Usuario.findOne({ email });
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
      email,
      pais,
      domicilio,
      documentoFrente,
      documentoDorso,
      estado: "pendiente",
      categoria: "comun",
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({ 
      mensaje: "Usuario registrado en estado pendiente",
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
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Token y password requeridos" 
      });
    }

    // Validar token de activacion
    try {
      const secret = getSecretKey();
      const payload = jwt.verify(token, secret);
      if (payload.type !== "activation" || !payload.id) {
        return res.status(400).json({ codigo: "TOKEN_INVALIDO", mensaje: "Token inválido" });
      }

      const usuario = await Usuario.findById(payload.id);
      if (!usuario || usuario.estado !== "aprobado") {
        return res.status(400).json({ codigo: "TOKEN_INVALIDO", mensaje: "Token inválido o usuario no aprobado" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      usuario.password = passwordHash;
      usuario.estado = "activo";
      await usuario.save();

      res.json({ mensaje: "Usuario activado correctamente" });
    } catch (err) {
      return res.status(400).json({ codigo: "TOKEN_INVALIDO", mensaje: "Token inválido o expirado" });
    }
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

    const usuario = await Usuario.findOne({ email });
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
