import Puja from "../model/Puja.js";
import Subasta from "../model/Subasta.js";
import MedioPago from "../model/MedioPago.js";
import Articulo from "../model/Articulo.js";

export const realizarPuja = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;
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

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    // verificar articulo
    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    // verificar que articulo pertenezca a la subasta
    if (!articulo.subasta || articulo.subasta.toString() !== subastaId) {
      return res.status(400).json({ codigo: "ARTICULO_NO_EN_SUBASTA", mensaje: "Artículo no pertenece a la subasta indicada" });
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
    const mejorPujaAnterior = await Puja.findOne({ subastaId: subastaId, articuloId })
      .sort({ monto: -1 });

    if (mejorPujaAnterior && monto <= mejorPujaAnterior.monto) {
      return res.status(409).json({ 
        codigo: "MONTO_BAJO", 
        mensaje: "Monto debe ser mayor a la puja anterior" 
      });
    }

    const nuevaPuja = new Puja({
      subastaId: subastaId,
      articuloId,
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
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res.status(404).json({ codigo: "SUBASTA_NO_ENCONTRADA", mensaje: "Subasta no existe" });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    const pujas = await Puja.find({ subastaId: subastaId, articuloId })
      .populate("usuarioId", "nombre apellido")
      .sort({ fecha: 1 })
      .lean();

    const pujaFormateadas = pujas.map(puja => ({
      id: puja.id || puja._id,
      monto: puja.monto,
      fecha: puja.fecha,
      usuario: {
        id: puja.usuarioId.id || puja.usuarioId._id,
        nombre: puja.usuarioId.nombre,
      },
      subastaId: puja.subastaId,
      articuloId: puja.articuloId,
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
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId).populate("articulos");
    if (!subasta) {
      return res.status(404).json({ codigo: "SUBASTA_NO_ENCONTRADA", mensaje: "Subasta no existe" });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    // Obtener ganador (mejor puja para el articulo)
    const mejorPuja = await Puja.findOne({ subastaId: subastaId, articuloId })
      .sort({ monto: -1 })
      .populate("usuarioId");

    res.json({
      subasta: {
        id: subasta._id,
        titulo: subasta.titulo,
        estado: subasta.estado,
        fechaCierre: subasta.fechaFin,
      },
      ganador: mejorPuja
        ? {
            usuarioId: mejorPuja.usuarioId._id,
            nombre: mejorPuja.usuarioId.nombre,
            apellido: mejorPuja.usuarioId.apellido,
            montoCierre: mejorPuja.monto,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerEstadoPuja = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res.status(404).json({ codigo: "SUBASTA_NO_ENCONTRADA", mensaje: "Subasta no existe" });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    const mejorPuja = await Puja.findOne({ subastaId: subastaId, articuloId })
      .sort({ monto: -1 })
      .populate("usuarioId", "nombre apellido")
      .lean();

    const reglas = {
      montoMinimo: articulo.precioBase,
      montoMaximo: articulo.pujaMaxima || null,
      requiereConfirmacion: articulo.requiereConfirmacion || false,
    };

    res.json({
      articulo,
      subasta,
      pujaActual: mejorPuja ? {
        id: mejorPuja.id || mejorPuja._id,
        monto: mejorPuja.monto,
        fecha: mejorPuja.fecha,
        usuario: mejorPuja.usuarioId ? { id: mejorPuja.usuarioId.id || mejorPuja.usuarioId._id, nombre: mejorPuja.usuarioId.nombre } : null,
      } : null,
      reglas,
    });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};
