import Articulo from "../model/Articulo.js";

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
    const { nombre, descripcion, fotos, declaracionPropiedad } = req.body;

    if (!nombre || !fotos || fotos.length < 6 || !declaracionPropiedad) {
      return res.status(400).json({ 
        codigo: "CAMPOS_REQUERIDOS", 
        mensaje: "Nombre, 6+ fotos y declaración requeridos" 
      });
    }

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
      articulo: articuloGuardado 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};
