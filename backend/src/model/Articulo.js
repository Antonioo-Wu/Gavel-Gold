import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    descripcion: {
      type: String,
      maxlength: 500,
      default: "Sin descripción",
    },

    precioBase: {
      type: Number,
      required: true,
      min: 0.01,
    },

    estado: {
      type: String,
      enum: ["disponible", "subastado", "retirado"],
      default: "disponible",
    },

    fechaIngreso: {
      type: Date,
      default: Date.now,
    },

    fotos: {
      type: [String],
      required: true,
      minlength: 6,
    },

    declaracionPropiedad: {
      type: Boolean,
      required: true,
      default: false,
    },

    propietarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    subasta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subasta",
      default: null,
    },

    categoria: {
      type: String,
      enum: [
        "arte",
        "vehiculo",
        "joya",
        "tecnologia",
        "coleccion",
        "otro",
      ],
      default: "otro",
    },

    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Articulo", articuloSchema);