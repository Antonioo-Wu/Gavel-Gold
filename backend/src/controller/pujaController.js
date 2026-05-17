import Puja from "../model/Puja.js";
import Subasta from "../model/Subasta.js";
import MedioPago from "../model/MedioPago.js";

export const realizarPuja = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, medioPagoId } = req.body;
    const usuarioId = req.user.id;

    if (!monto || !medioPagoId) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Monto y medioPagoId requeridos" 
      });
    }

    if (monto < 0.01) {
      return res.status(400).json({ 
        codigo: "MONTO_INVALIDO", 
        mensaje: "Monto debe ser mayor a 0" 
      });
    }

    const subasta = await Subasta.findById(id);
    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    // Verificar estado de subasta
    if (subasta.estado !== "abierta") {
      return res.status(409).json({ 
        codigo: "SUBASTA_CERRADA", 
        mensaje: "Subasta no está abierta" 
      });
    }

    // Verificar fecha
    const ahora = new Date();
    if (ahora > subasta.fechaFin) {
      return res.status(409).json({ 
        codigo: "SUBASTA_CERRADA", 
        mensaje: "Subasta ya finalizó" 
      });
    }

    // Verificar medio de pago
    const medioPago = await MedioPago.findById(medioPagoId);
    if (!medioPago || !medioPago.validado) {
      return res.status(409).json({ 
        codigo: "MEDIO_PAGO_INVALIDO", 
        mensaje: "Medio de pago no validado" 
      });
    }

    // Obtener mejor puja anterior
    const mejorPujaAnterior = await Puja.findOne({ subastaId: id })
      .sort({ monto: -1 });

    if (mejorPujaAnterior && monto <= mejorPujaAnterior.monto) {
      return res.status(409).json({ 
        codigo: "MONTO_BAJO", 
        mensaje: "Monto debe ser mayor a la puja anterior" 
      });
    }

    const nuevaPuja = new Puja({
      subastaId: id,
      usuarioId,
      monto,
      medioPagoId,
      fecha: new Date(),
    });

    const pujaGuardada = await nuevaPuja.save();
    
    const pujaConDetalles = await Puja.findById(pujaGuardada._id)
      .populate("usuarioId", "nombre apellido")
      .lean();

    res.json({
      mensaje: "Puja aceptada",
      puja: pujaConDetalles
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerHistorialPujas = async (req, res) => {
  try {
    const { id } = req.params;

    const subasta = await Subasta.findById(id);
    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    const pujas = await Puja.find({ subastaId: id })
      .populate("usuarioId", "nombre apellido")
      .sort({ fecha: 1 })
      .lean();

    const pujaFormateadas = pujas.map(puja => ({
      id: puja._id,
      monto: puja.monto,
      fecha: puja.fecha,
      usuario: {
        id: puja.usuarioId._id,
        nombre: puja.usuarioId.nombre,
      },
      subastaId: puja.subastaId,
    }));

    res.json(pujaFormateadas);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerResultado = async (req, res) => {
  try {
    const { id } = req.params;

    const subasta = await Subasta.findById(id)
      .populate("articulos");

    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    // Obtener ganador (mejor puja)
    const mejorPuja = await Puja.findOne({ subastaId: id })
      .sort({ monto: -1 })
      .populate("usuarioId");

    res.json({
      subasta: {
        id: subasta._id,
        titulo: subasta.titulo,
        estado: subasta.estado,
        fechaCierre: subasta.fechaFin,
      },
      ganador: mejorPuja ? {
        usuarioId: mejorPuja.usuarioId._id,
        nombre: mejorPuja.usuarioId.nombre,
        apellido: mejorPuja.usuarioId.apellido,
        montoCierre: mejorPuja.monto,
      } : null,
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};
