import Articulo from "../model/Articulo.js";
import { uploadImages as uploadToCloudinary } from "../service/cloudinaryService.js";

export const obtenerArticulosUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const articulos = await Articulo.find({ propietarioId: id });
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const proponerArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, declaracionPropiedad } = req.body;
    const files = req.files;

    if (!nombre || !files || files.length < 1 || !declaracionPropiedad) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Nombre, al menos 1 foto y declaración requeridos" 
      });
    }

    const buffers = files.map((file) =>
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    );

    const resultados = await uploadToCloudinary(buffers);

    const fotos = resultados.map((r) => r.secure_url);

    const nuevoArticulo = new Articulo({
      nombre,
      descripcion: descripcion || "Sin descripción",
      fotos,
      declaracionPropiedad,
      propietarioId: id,
      estado: "pendiente",
    });

    const articuloGuardado = await nuevoArticulo.save();
    res.status(201).json({ 
      mensaje: "Propuesta recibida",
      articulo: articuloGuardado,
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerArticulosPendientesAceptacion = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes consultar artículos de otro usuario",
      });
    }

    const articulos = await Articulo.find({ propietarioId: id, estado: "pendiente_aceptacion" });
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const aceptarCondicionesArticulo = async (req, res) => {
  try {
    const { id, articuloId } = req.params;

    if (req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes modificar artículos de otro usuario",
      });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ 
        codigo: "ARTICULO_NO_ENCONTRADO", 
        mensaje: "Artículo no existe" 
      });
    }

    if (articulo.estado !== "pendiente_aceptacion") {
      return res.status(400).json({ 
        codigo: "ARTICULO_NO_PENDIENTE_ACEPTACION", 
        mensaje: `Artículo no está pendiente de aceptación, estado actual: ${articulo.estado}` 
      });
    }

    if (articulo.propietarioId.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No eres el propietario de este artículo",
      });
    }

    articulo.estado = "aprobado";
    await articulo.save();

    res.json({ 
      mensaje: "Condiciones aceptadas",
      articulo 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const rechazarCondicionesArticulo = async (req, res) => {
  try {
    const { id, articuloId } = req.params;
    const { motivo } = req.body;

    if (req.user?.id?.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No puedes modificar artículos de otro usuario",
      });
    }

    const articulo = await Articulo.findById(articuloId);
    if (!articulo) {
      return res.status(404).json({ 
        codigo: "ARTICULO_NO_ENCONTRADO", 
        mensaje: "Artículo no existe" 
      });
    }

    if (articulo.estado !== "pendiente_aceptacion") {
      return res.status(400).json({ 
        codigo: "ARTICULO_NO_PENDIENTE_ACEPTACION", 
        mensaje: `Artículo no está pendiente de aceptación, estado actual: ${articulo.estado}` 
      });
    }

    if (articulo.propietarioId.toString() !== id.toString()) {
      return res.status(403).json({
        codigo: "PERMISO_DENEGADO",
        mensaje: "No eres el propietario de este artículo",
      });
    }

    articulo.estado = "rechazado";
    articulo.motivoRechazo = motivo || "El usuario rechazó las condiciones";
    await articulo.save();

    res.json({ 
      mensaje: "Condiciones rechazadas",
      articulo 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};
