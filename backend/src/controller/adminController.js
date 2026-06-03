import Usuario from "../model/Usuario.js";
import Articulo from "../model/Articulo.js";
import Subasta from "../model/Subasta.js";
import Puja from "../model/Puja.js";
import Multa from "../model/Multa.js";
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
    const { precioBase, comision } = req.body;

    if (precioBase == null || comision == null) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "precioBase y comision son requeridos" 
      });
    }

    if (precioBase < 0.01) {
      return res.status(400).json({ 
        codigo: "PRECIO_INVALIDO", 
        mensaje: "Precio base debe ser mayor a 0" 
      });
    }

    if (comision < 0) {
      return res.status(400).json({ 
        codigo: "COMISION_INVALIDA", 
        mensaje: "Comisión debe ser mayor o igual a 0" 
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

    articulo.precioBase = precioBase;
    articulo.comision = comision;
    articulo.estado = "pendiente_aceptacion";
    articulo.motivoRechazo = null;
    await articulo.save();

    res.json({ 
      mensaje: "Condiciones enviadas al usuario para aceptación",
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

export const definirPrecioArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { precioBase, pujaMaxima } = req.body;

    if (precioBase == null) {
      return res.status(400).json({ codigo: "CAMPOS_REQUERIDOS", mensaje: "precioBase requerido" });
    }

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    articulo.precioBase = precioBase;
    if (pujaMaxima != null) articulo.pujaMaxima = pujaMaxima;
    await articulo.save();

    res.json({ mensaje: "Precio actualizado", articulo });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const definirComisionSubasta = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      comisionPorcentaje,
      incrementoMinimo,
      porcentajeIncrementoMinimo,
      montoMaximoPuja,
      requiereConfirmacion,
    } = req.body;

    const subasta = await Subasta.findById(id);
    if (!subasta) {
      return res.status(404).json({ codigo: "SUBASTA_NO_ENCONTRADA", mensaje: "Subasta no existe" });
    }

    if (comisionPorcentaje != null) subasta.comisionPorcentaje = comisionPorcentaje;
    if (incrementoMinimo != null) subasta.incrementoMinimo = incrementoMinimo;
    if (porcentajeIncrementoMinimo != null) subasta.porcentajeIncrementoMinimo = porcentajeIncrementoMinimo;
    if (montoMaximoPuja != null) subasta.montoMaximoPuja = montoMaximoPuja;
    if (requiereConfirmacion != null) subasta.requiereConfirmacion = requiereConfirmacion;

    await subasta.save();
    res.json({ mensaje: "Reglas de subasta actualizadas", subasta });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

// USUARIOS

export const aprobarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ codigo: "USUARIO_NO_ENCONTRADO", mensaje: "Usuario no existe" });

    usuario.estado = "aprobado";
    await usuario.save();

    const activationToken = generateActivationToken(usuario);
    res.json({ mensaje: "Usuario aprobado", usuario, activationToken });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const rechazarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ codigo: "USUARIO_NO_ENCONTRADO", mensaje: "Usuario no existe" });

    usuario.estado = "rechazado";
    await usuario.save();

    res.json({ mensaje: "Usuario rechazado", motivo });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const asignarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;
    if (!categoria) return res.status(400).json({ codigo: "CAMPOS_REQUERIDOS", mensaje: "categoria requerida" });

    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ codigo: "USUARIO_NO_ENCONTRADO", mensaje: "Usuario no existe" });

    usuario.categoria = categoria;
    await usuario.save();
    res.json({ mensaje: "Categoria asignada", usuario });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const cerrarArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findById(id);
    if (!articulo) return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });

    // Buscar mejor puja para el articulo
    const mejorPuja = await Puja.findOne({ articuloId: id }).sort({ monto: -1 }).populate('usuarioId');

    if (mejorPuja) {
      articulo.estado = 'vendido';
    } else {
      articulo.estado = 'cerrado';
    }

    await articulo.save();

    res.json({ mensaje: 'Artículo cerrado', articulo, ganador: mejorPuja ? { usuarioId: mejorPuja.usuarioId._id, nombre: mejorPuja.usuarioId.nombre, monto: mejorPuja.monto } : null });
  } catch (error) {
    res.status(500).json({ codigo: 'ERROR_SERVIDOR', mensaje: error.message });
  }
};

export const cerrarSubasta = async (req, res) => {
  try {
    const { id } = req.params;
    const subasta = await Subasta.findById(id).populate('articulos');
    if (!subasta) return res.status(404).json({ codigo: 'SUBASTA_NO_ENCONTRADA', mensaje: 'Subasta no existe' });

    subasta.estado = 'cerrada';
    await subasta.save();

    const resultados = [];
    for (const art of subasta.articulos) {
      const articulo = await Articulo.findById(art._id);
      if (!articulo) continue;
      const mejorPuja = await Puja.findOne({ articuloId: articulo._id }).sort({ monto: -1 }).populate('usuarioId');
      if (mejorPuja) articulo.estado = 'vendido'; else articulo.estado = 'cerrado';
      await articulo.save();
      resultados.push({ articulo: articulo._id, ganador: mejorPuja ? { usuarioId: mejorPuja.usuarioId._id, nombre: mejorPuja.usuarioId.nombre, monto: mejorPuja.monto } : null });
    }

    res.json({ mensaje: 'Subasta cerrada', subasta: subasta._id, resultados });
  } catch (error) {
    res.status(500).json({ codigo: 'ERROR_SERVIDOR', mensaje: error.message });
  }
};

export const crearMulta = async (req, res) => {
  try {
    const { usuarioId, motivo, monto, venceEn } = req.body;
    if (!usuarioId || !motivo || monto == null) return res.status(400).json({ codigo: 'CAMPOS_REQUERIDOS', mensaje: 'usuarioId, motivo y monto requeridos' });

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ codigo: 'USUARIO_NO_ENCONTRADO', mensaje: 'Usuario no existe' });

    const multa = new Multa({ usuarioId, motivo, monto, venceEn: venceEn ? new Date(venceEn) : null, activa: true });
    await multa.save();
    res.status(201).json({ mensaje: 'Multa creada', multa });
  } catch (error) {
    res.status(500).json({ codigo: 'ERROR_SERVIDOR', mensaje: error.message });
  }
};

export const levantarMulta = async (req, res) => {
  try {
    const { id } = req.params;
    const multa = await Multa.findById(id);
    if (!multa) return res.status(404).json({ codigo: 'MULTA_NO_ENCONTRADA', mensaje: 'Multa no existe' });
    multa.activa = false;
    await multa.save();
    res.json({ mensaje: 'Multa levantada', multa });
  } catch (error) {
    res.status(500).json({ codigo: 'ERROR_SERVIDOR', mensaje: error.message });
  }
};
