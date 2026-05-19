import Subasta from "../model/Subasta.js";
import Articulo from "../model/Articulo.js";
import MedioPago from "../model/MedioPago.js";
import Usuario from "../model/Usuario.js";

export const listarSubastas = async (req, res) => {
  try {
    const subastas = await Subasta.find()
      .populate("articulos")
      .sort({ fechaInicio: -1 });

    res.json(subastas);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const obtenerArticulosSubasta = async (req, res) => {
  try {
    const { id } = req.params;

    const subasta = await Subasta.findById(id)
      .populate({
        path: "articulos",
        select: "nombre descripcion fotos estado precioBase"
      });

    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    res.json(subasta.articulos);
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

export const validarAcceso = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    if (!usuarioId) {
      return res.status(401).json({ 
        codigo: "NO_AUTENTICADO", 
        mensaje: "Usuario no autenticado" 
      });
    }

    const subasta = await Subasta.findById(id);
    if (!subasta) {
      return res.status(404).json({ 
        codigo: "SUBASTA_NO_ENCONTRADA", 
        mensaje: "Subasta no existe" 
      });
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ 
        codigo: "USUARIO_NO_ENCONTRADO", 
        mensaje: "Usuario no existe" 
      });
    }

    // Verificar categoria
    const categoriasValidas = ["comun", "especial", "plata", "oro", "platino"];
    const indiceRequerido = categoriasValidas.indexOf(subasta.categoriaRequerida);
    const indiceUsuario = categoriasValidas.indexOf(usuario.categoria);

    if (indiceUsuario < indiceRequerido) {
      return res.status(403).json({ 
        codigo: "CATEGORIA_INSUFICIENTE", 
        mensaje: "Categoría insuficiente para participar" 
      });
    }

    // Verificar medios de pago validados
    const medioPagoValidado = await MedioPago.findOne({ 
      usuarioId,
      validado: true 
    });

    if (!medioPagoValidado) {
      return res.status(403).json({ 
        codigo: "SIN_MEDIO_PAGO", 
        mensaje: "Sin medios de pago validados" 
      });
    }

    res.json({ 
      mensaje: "Acceso permitido" 
    });
  } catch (error) {
    res.status(500).json({ 
      codigo: "ERROR_SERVIDOR", 
      mensaje: error.message 
    });
  }
};

