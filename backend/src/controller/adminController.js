import Usuario from "../model/Usuario.js";
import Articulo from "../model/Articulo.js";
import Subasta from "../model/Subasta.js";
import { generateActivationToken } from "../middleware/authMiddleware.js";

// ARTICULOS 

export const obtenerArticulosPendientes = async (req, res) => {
  try {
    const articulos = await Articulo.find({ estado: "pendiente" })
      .populate("propietarioId", "nombre apellido email")
      .sort({ createdAt: -1 });

    res.json(articulos);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const aprobarArticulo = async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ 
        codigo: "ARTICULO_NO_ENCONTRADO", 
        mensaje: "Artículo no existe" 
      });
    }

    if (articulo.estado !== "pendiente") {
      return res.status(400).json({ 
        codigo: "ARTICULO_YA_PROCESADO", 
        mensaje: `Artículo ya está en estado: ${articulo.estado}` 
      });
    }

    articulo.estado = "aprobado";
    articulo.motivoRechazo = null;
    await articulo.save();

    res.json({ 
      mensaje: "Artículo aprobado",
      articulo 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const rechazarArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;

    if (!motivo) {
      return res.status(400).json({ 
        codigo: "MOTIVO_REQUERIDO", 
        mensaje: "Motivo del rechazo requerido" 
      });
    }

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ 
        codigo: "ARTICULO_NO_ENCONTRADO", 
        mensaje: "Artículo no existe" 
      });
    }

    if (articulo.estado !== "pendiente") {
      return res.status(400).json({ 
        codigo: "ARTICULO_YA_PROCESADO", 
        mensaje: `Artículo ya está en estado: ${articulo.estado}` 
      });
    }

    articulo.estado = "rechazado";
    articulo.motivoRechazo = motivo;
    await articulo.save();

    res.json({ 
      mensaje: "Artículo rechazado",
      articulo 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

// SUBASTAS 

export const crearSubasta = async (req, res) => {
  try {
    const { titulo, fechaInicio, fechaFin, categoriaRequerida, moneda } = req.body;

    if (!titulo || !fechaInicio || !fechaFin || !categoriaRequerida) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Todos los campos son requeridos" 
      });
    }

    // validar fechas
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      return res.status(400).json({ 
        codigo: "FECHAS_INVALIDAS", 
        mensaje: "Fecha fin debe ser posterior a fecha inicio" 
      });
    }

    const nuevaSubasta = new Subasta({
      titulo,
      fechaInicio: inicio,
      fechaFin: fin,
      categoriaRequerida,
      moneda: moneda || "ARS",
      estado: "proximamente",
      articulos: [],
    });

    const subastaGuardada = await nuevaSubasta.save();
    res.status(201).json({ 
      mensaje: "Subasta creada",
      subasta: subastaGuardada 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const agregarArticuloSubasta = async (req, res) => {
  try {
    const { id } = req.params;
    const { articuloId, precioBase } = req.body;

    if (!articuloId || !precioBase) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "articuloId y precioBase requeridos" 
      });
    }

    if (precioBase < 0.01) {
      return res.status(400).json({ 
        codigo: "PRECIO_INVALIDO", 
        mensaje: "Precio base debe ser mayor a 0" 
      });
    }

    const subasta = await Subasta.findById(id);
    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ 
        codigo: "ARTICULO_NO_ENCONTRADO", 
        mensaje: "Artículo no existe" 
      });
    }

    // Verificar que articulo este aprobado
    if (articulo.estado !== "aprobado") {
      return res.status(400).json({ 
        codigo: "ARTICULO_NO_APROBADO", 
        mensaje: `Artículo debe estar aprobado, estado actual: ${articulo.estado}` 
      });
    }

    // Verificar que articulo no este ya en una subasta
    if (articulo.subasta) {
      return res.status(400).json({ 
        codigo: "ARTICULO_EN_SUBASTA", 
        mensaje: "Artículo ya está en otra subasta" 
      });
    }

    // Actualizar articulo
    articulo.precioBase = precioBase;
    articulo.subasta = id;
    articulo.estado = "subastado";
    await articulo.save();

    // Agregar a subasta
    subasta.articulos.push(articuloId);
    await subasta.save();

    res.status(201).json({ 
      mensaje: "Artículo agregado exitosamente",
      articulo 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

// USUARIOS 

export const verificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ 
        codigo: "USUARIO_NO_ENCONTRADO", 
        mensaje: "Usuario no existe" 
      });
    }

    // Actualizar categoria y pasar a aprobado
    usuario.categoria = categoria;
    usuario.estado = "aprobado";
    await usuario.save();

    // Generar token de activación y enviar por email
    const activationToken = generateActivationToken(usuario);
    // TODO: implementar envio de token via mail. (por ahora se imprime)
    console.log(`Activation token for user ${usuario._id}: ${activationToken}`);

    res.json({ 
      mensaje: "Usuario verificado correctamente",
      usuario,
      activationToken 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};
