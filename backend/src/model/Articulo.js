import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true,
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
      required: false,
      min: 0.01,
      default: null,
    },

    comision: {
      type: Number,
      required: false,
      min: 0,
      default: null,
    },

    estado: {
      type: String,
      enum: ["pendiente", "pendiente_aceptacion", "aprobado", "rechazado", "disponible", "subastado", "vendido", "cerrado", "retirado"],
      default: "pendiente",
    },

    motivoRechazo: {
      type: String,
      default: null,
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

    pujaMaxima: {
      type: Number,
      default: null,
    },

    incrementoMinimo: {
      type: Number,
      default: null,
    },

    porcentajeIncrementoMinimo: {
      type: Number,
      default: null,
    },

    montoMaximoPuja: {
      type: Number,
      default: null,
    },

    requiereConfirmacion: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Antes de guardar, si no tiene `id`, asignar string de `_id`
articuloSchema.pre('save', function () {
  if (!this.id) {
    this.id = this._id ? this._id.toString() : undefined;
  }
});

export default mongoose.model("Articulo", articuloSchema);