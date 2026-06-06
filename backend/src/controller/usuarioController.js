import Usuario from "../model/Usuario.js";
import MedioPago from "../model/MedioPago.js";
import Puja from "../model/Puja.js";
import Subasta from "../model/Subasta.js";


export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) {
      return res.status(404).json({ 
        codigo: "USUARIO_NO_ENCONTRADO", 
        mensaje: "Usuario no existe" 
      });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerMediosPago = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.rol !== "admin" && req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes consultar medios de pago de otro usuario",
      });
    }

    const usuario = await Usuario.findById(id).populate("mediosPago");
    if (!usuario) {
      return res.status(404).json({
        codigo: "USUARIO_NO_ENCONTRADO",
        mensaje: "Usuario no existe",
      });
    }

    // Compatibilidad: si el array aún no está sincronizado, caer al filtro por usuarioId.
    let mediosPago = usuario.mediosPago || [];
    if (!mediosPago.length) {
      mediosPago = await MedioPago.find({ usuarioId: id });
    }

    res.json(mediosPago);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const agregarMedioPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, detalle } = req.body;
    if (req.user?.rol !== "admin" && req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes agregar medios de pago a otro usuario",
      });
    }

    if (!tipo || !detalle) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Tipo y detalle requeridos" 
      });
    }

    // Validar tipo
    const tiposValidos = ["CUENTA_BANCARIA", "TARJETA", "CHEQUE"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ 
        codigo: "TIPO_INVALIDO", 
        mensaje: "Tipo de medio de pago inválido" 
      });
    }

    // Verificar usuario existe
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ 
        codigo: "USUARIO_NO_ENCONTRADO", 
        mensaje: "Usuario no existe" 
      });
    }

    const nuevoMedio = new MedioPago({
      usuarioId: id,
      tipo,
      detalle,
      validado: true,
    });

    await nuevoMedio.save();

    if (!Array.isArray(usuario.mediosPago)) {
      usuario.mediosPago = [];
    }
    usuario.mediosPago.push(nuevoMedio._id);
    await usuario.save();

    res.status(201).json({ 
      mensaje: "Medio de pago agregado",
      medioPago: nuevoMedio 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerSubastasActivas = async (req, res) => {
  try {
    const { id } = req.params;

    // Subastas en estado abierta donde el usuario ha pujado
    const pujas = await Puja.find({ usuarioId: id });
    const subastaIds = [...new Set(pujas.map(p => p.subastaId))];

    const subastas = await Subasta.find({ 
      _id: { $in: subastaIds },
      estado: "abierta"
    });

    res.json(subastas);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerEstadisticas = async (req, res) => {
  try {
    const { id } = req.params;

    // Subastas donde participó
    const pujas = await Puja.find({ usuarioId: id });
    const asistencias = [...new Set(pujas.map(p => p.subastaId.toString()))].length;

    // Calcular victorias y importes
    let victorias = 0;
    let importePagadoAcumulado = 0;

    const importeOfertadoAcumulado = pujas.reduce((sum, p) => sum + p.monto, 0);

    const subastaIds = [...new Set(pujas.map(p => p.subastaId.toString()))];
    for (const sId of subastaIds) {
      const mejorPuja = await Puja.findOne({ subastaId: sId }).sort({ monto: -1 });
      if (mejorPuja && mejorPuja.usuarioId.toString() === id) {
        victorias += 1;
        importePagadoAcumulado += mejorPuja.monto;
      }
    }

    res.json({
      asistencias,
      victorias,
      importeOfertadoAcumulado,
      importePagadoAcumulado,
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerHistorialParticipacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener todas las subastas donde participó
    const pujas = await Puja.find({ usuarioId: id }).populate("subastaId");
    
    // Agrupar por subasta y obtener datos
    const historial = [];
    const subastaIds = new Set();

    for (const puja of pujas) {
      if (!subastaIds.has(puja.subastaId._id.toString())) {
        subastaIds.add(puja.subastaId._id.toString());
        
        const mejorPuja = await Puja.findOne({ subastaId: puja.subastaId._id })
          .sort({ monto: -1 });

        historial.push({
          subastaId: puja.subastaId._id,
          titulo: puja.subastaId.titulo,
          fechaCierre: puja.subastaId.fechaFin,
          miOfertaMax: mejorPuja.monto,
          ganador: mejorPuja.usuarioId.toString() === id,
          estado: puja.subastaId.estado,
        });
      }
    }

    res.json(historial);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};


export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Verificamos que el usuario solo pueda modificar su propio perfil
    if (req.user?.rol !== "admin" && req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes editar el perfil de otro usuario",
      });
    }

    // 2. Extraemos los datos que el frontend nos está enviando para actualizar
    const { nombre, apellido, domicilio, pais } = req.body;

    // 3. Buscamos al usuario y lo actualizamos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, apellido, domicilio, pais },
      { returnDocument: "after", runValidators: true } // <-- ¡Este es el único cambio!
    ).select("-password");

    // 4. Devolvemos los datos nuevos al frontend
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};