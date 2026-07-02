import Puja from "../model/Puja.js";
import Subasta from "../model/Subasta.js";
import MedioPago from "../model/MedioPago.js";
import Articulo from "../model/Articulo.js";
import Venta from "../model/Venta.js";
import Multa from "../model/Multa.js";
import Usuario from "../model/Usuario.js";

export const realizarPuja = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;
    const { monto, medioPagoId } = req.body;
    const usuarioId = req.user.id;

    if (!monto || !medioPagoId) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Monto y medioPagoId son requeridos para pujar." 
      });
    }

    if (monto < 0.01) {
      return res.status(400).json({ codigo: "MONTO_INVALIDO", mensaje: "Monto debe ser mayor a 0" });
    }

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res.status(404).json({ codigo: "SUBASTA_NO_ENCONTRADA", mensaje: "Subasta no existe" });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ codigo: "ARTICULO_NO_ENCONTRADO", mensaje: "Artículo no existe" });
    }

    if (!articulo.subasta || articulo.subasta.toString() !== subastaId) {
      return res.status(400).json({ codigo: "ARTICULO_NO_EN_SUBASTA", mensaje: "Artículo no pertenece a la subasta indicada" });
    }

    if (subasta.estado !== "abierta") {
      return res.status(409).json({ codigo: "SUBASTA_CERRADA", mensaje: "Subasta no está abierta" });
    }

    const ahora = new Date();
    if (ahora > subasta.fechaFin) {
      return res.status(409).json({ codigo: "SUBASTA_CERRADA", mensaje: "Subasta ya finalizó" });
    }

    const medioPago = await MedioPago.findById(medioPagoId);
    if (!medioPago || !medioPago.validado) {
      return res.status(409).json({ 
        codigo: "MEDIO_PAGO_INVALIDO", 
        mensaje: "Tu medio de pago debe estar validado por la administración para poder pujar." 
      });
    }

    const multasActivas = await Multa.find({ usuarioId, activa: true });
    if (multasActivas.length > 0) {
      return res.status(403).json({
        codigo: "MULTA_ACTIVA",
        mensaje: "No puedes pujar porque tienes multas activas"
      });
    }

    const usuario = await Usuario.findById(usuarioId);
    
    const excepcionLimites = 
      subasta.categoria === "oro" || subasta.categoria === "platino" ||
      usuario?.categoria === "oro" || usuario?.categoria === "platino";

    const mejorPujaAnterior = await Puja.findOne({ subastaId: subastaId, articuloId }).sort({ monto: -1 });

    if (!excepcionLimites) {
      
      let pujaMinimaRequerida = articulo.precioBase;
      let pujaMaximaPermitida = null;

      if (mejorPujaAnterior) {
        const incrementoMinimo = articulo.precioBase * 0.01;
        pujaMinimaRequerida = mejorPujaAnterior.monto + incrementoMinimo;

        const incrementoMaximo = articulo.precioBase * 0.20;
        pujaMaximaPermitida = mejorPujaAnterior.monto + incrementoMaximo;
      }

      if (monto < pujaMinimaRequerida) {
        return res.status(409).json({ 
          codigo: "PUJA_MINIMA_INSUFICIENTE", 
          mensaje: `Tu oferta es insuficiente. La puja mínima requerida es de $${pujaMinimaRequerida}.` 
        });
      }

      if (mejorPujaAnterior && pujaMaximaPermitida && monto > pujaMaximaPermitida) {
        return res.status(400).json({
          codigo: "PUJA_MAXIMA_EXCEDIDA",
          mensaje: `El monto supera el límite máximo permitido de $${pujaMaximaPermitida} (última oferta + 20% del valor base).`
        });
      }

    } else {
      if (mejorPujaAnterior && monto <= mejorPujaAnterior.monto) {
        return res.status(409).json({ 
          codigo: "MONTO_BAJO", 
          mensaje: "Aunque tu categoría no tiene topes máximos, tu monto debe superar al de la puja ganadora actual." 
        });
      }
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

    articulo.pujaMaxima = monto;
    await articulo.save();
    
    const pujaConDetalles = await Puja.findById(pujaGuardada._id)
      .populate("usuarioId", "nombre apellido")
      .lean();

    res.json({
      mensaje: "Puja aceptada",
      puja: pujaConDetalles
    });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const obtenerHistorialPujas = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res
        .status(404)
        .json({
          codigo: "SUBASTA_NO_ENCONTRADA",
          mensaje: "Subasta no existe",
        });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res
        .status(404)
        .json({
          codigo: "ARTICULO_NO_ENCONTRADO",
          mensaje: "Artículo no existe",
        });
    }

    const pujas = await Puja.find({ subastaId: subastaId, articuloId })
      .populate("usuarioId", "nombre apellido")
      .sort({ fecha: 1 })
      .lean();

    const pujaFormateadas = pujas.map((puja) => ({
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
      mensaje: error.message,
    });
  }
};

export const obtenerResultado = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId).populate("articulos");
    if (!subasta) {
      return res
        .status(404)
        .json({
          codigo: "SUBASTA_NO_ENCONTRADA",
          mensaje: "Subasta no existe",
        });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res
        .status(404)
        .json({
          codigo: "ARTICULO_NO_ENCONTRADO",
          mensaje: "Artículo no existe",
        });
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
      mensaje: error.message,
    });
  }
};

export const obtenerEstadoPuja = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res
        .status(404)
        .json({
          codigo: "SUBASTA_NO_ENCONTRADA",
          mensaje: "Subasta no existe",
        });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res
        .status(404)
        .json({
          codigo: "ARTICULO_NO_ENCONTRADO",
          mensaje: "Artículo no existe",
        });
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
      pujaActual: mejorPuja
        ? {
            id: mejorPuja.id || mejorPuja._id,
            monto: mejorPuja.monto,
            fecha: mejorPuja.fecha,
            usuario: mejorPuja.usuarioId
              ? {
                  id: mejorPuja.usuarioId.id || mejorPuja.usuarioId._id,
                  nombre: mejorPuja.usuarioId.nombre,
                }
              : null,
          }
        : null,
      reglas,
    });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};

export const registrarPago = async (req, res) => {
  try {
    const { subastaId, articuloId } = req.params;
    const { modalidadEntrega } = req.body;
    const usuarioId = req.user.id;

    if (!modalidadEntrega) {
      return res
        .status(400)
        .json({
          codigo: "CAMPOS_REQUERIDOS",
          mensaje: "modalidadEntrega requerida",
        });
    }

    if (!["retiro", "envio"].includes(modalidadEntrega)) {
      return res
        .status(400)
        .json({
          codigo: "MODALIDAD_INVALIDA",
          mensaje: "modalidadEntrega debe ser retiro o envio",
        });
    }

    const subasta = await Subasta.findById(subastaId);
    if (!subasta) {
      return res
        .status(404)
        .json({
          codigo: "SUBASTA_NO_ENCONTRADA",
          mensaje: "Subasta no existe",
        });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res
        .status(404)
        .json({
          codigo: "ARTICULO_NO_ENCONTRADO",
          mensaje: "Artículo no existe",
        });
    }

    const mejorPuja = await Puja.findOne({ subastaId, articuloId }).sort({
      monto: -1,
    });
    if (!mejorPuja) {
      return res
        .status(400)
        .json({
          codigo: "SIN_GANADOR",
          mensaje: "No hay pujas para este artículo",
        });
    }

    if (mejorPuja.usuarioId.toString() !== usuarioId.toString()) {
      return res
        .status(403)
        .json({
          codigo: "NO_SOS_GANADOR",
          mensaje: "No eres el ganador de este artículo",
        });
    }

    const ventaExistente = await Venta.findOne({ articuloId, subastaId });
    if (ventaExistente) {
      return res
        .status(400)
        .json({
          codigo: "VENTA_YA_REGISTRADA",
          mensaje: "El pago ya fue registrado",
        });
    }

    const venta = new Venta({
      articuloId,
      subastaId,
      ganadorId: usuarioId,
      montoFinal: mejorPuja.monto,
      estadoPago: "pagado",
      modalidadEntrega,
    });
    await venta.save();

    articulo.estado = "vendido";
    await articulo.save();

    res.json({ mensaje: "Pago registrado", venta });
  } catch (error) {
    res.status(500).json({ codigo: "ERROR_SERVIDOR", mensaje: error.message });
  }
};
