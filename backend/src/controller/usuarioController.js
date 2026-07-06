import Usuario from "../model/Usuario.js";
import MedioPago from "../model/MedioPago.js";
import Puja from "../model/Puja.js";
import Subasta from "../model/Subasta.js";
import Multa from "../model/Multa.js";


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

    const tiposValidos = ["CUENTA_BANCARIA", "TARJETA", "CHEQUE"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        codigo: "TIPO_INVALIDO",
        mensaje: "Tipo de medio de pago inválido"
      });
    }

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
      validado: false,
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

    const pujasUsuario = await Puja.find({ usuarioId: id })
      .populate('subastaId', 'titulo fechaFin estado')
      .populate('articuloId', 'nombre estado');

    const participacionesMap = {};

    for (const puja of pujasUsuario) {
      if (!puja.articuloId || !puja.subastaId) continue;

      const artId = puja.articuloId._id.toString();

      if (!participacionesMap[artId] || participacionesMap[artId].miOfertaMax < puja.monto) {

        const mejorPujaArticulo = await Puja.findOne({ articuloId: artId }).sort({ monto: -1 });
        const esGanador = (
          puja.articuloId.estado === 'vendido' &&
          mejorPujaArticulo &&
          mejorPujaArticulo.usuarioId.toString() === id
        );

        participacionesMap[artId] = {
          subastaId: puja.subastaId._id,
          titulo: puja.subastaId.titulo,
          articuloId: artId,
          nombreArticulo: puja.articuloId.nombre,
          fechaCierre: puja.subastaId.fechaFin,
          miOfertaMax: puja.monto,
          ganador: esGanador,
          estado: puja.subastaId.estado
        };
      }
    }

    res.json(Object.values(participacionesMap));
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};


export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user?.rol !== "admin" && req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes editar el perfil de otro usuario",
      });
    }

    const { nombre, apellido, domicilio, pais } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, apellido, domicilio, pais },
      { returnDocument: "after", runValidators: true }
    ).select("-password");

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({
      codigo: "ERROR_SERVIDOR",
      mensaje: error.message
    });
  }
};

export const eliminarMedioPago = async (req, res) => {
  try {
    const { id, medioPagoId } = req.params;

    if (req.user?.rol !== "admin" && req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({ codigo: "PERMISO_DENEGADO", mensaje: "No autorizado" });
    }

    const resultado = await MedioPago.findByIdAndDelete(medioPagoId);

    if (!resultado) {
      return res.status(404).json({ mensaje: "Medio de pago no encontrado" });
    }

    await Usuario.findByIdAndUpdate(id, { $pull: { mediosPago: medioPagoId } });

    res.json({ mensaje: "Medio de pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const obtenerMultas = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user && req.user.id !== id) {
      return res.status(403).json({ 
        codigo: "ACCESO_DENEGADO", 
        mensaje: "No puedes ver las multas de otro usuario" 
      });
    }

    const multas = await Multa.find({ usuarioId: id }).sort({ createdAt: -1 });
    res.json(multas);
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const pagarMulta = async (req, res) => {
  try {
    const { id, multaId } = req.params;
    
    if (req.user && req.user.id !== id) {
      return res.status(403).json({ 
        codigo: "ACCESO_DENEGADO", 
        mensaje: "No puedes pagar las multas de otro usuario" 
      });
    }

    const multa = await Multa.findOne({ _id: multaId, usuarioId: id });
    
    if (!multa) {
      return res.status(404).json({ codigo: "MULTA_NO_ENCONTRADA", mensaje: "La multa no existe." });
    }

    if (!multa.activa) {
      return res.status(400).json({ codigo: "MULTA_YA_PAGADA", mensaje: "Esta multa ya ha sido pagada." });
    }

    multa.activa = false;
    await multa.save();

    res.json({ mensaje: "Multa pagada exitosamente. Ya puedes volver a pujar.", multa });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};