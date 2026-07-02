import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({

    id: {
        type: String,
        unique: true,
        sparse: true,
    },

    nombre: {
        type: String,
        required: true,
        maxlength: 50,
    },

    apellido: {
        type: String,
        required: true,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
    },

    pais: {
        type: String,
    },

    domicilio: {
        type: String,
    },

    documentoFrente: {
        type: String,
    },

    documentoDorso: {
        type: String,
    },

    categoria: {
      type: String,
      enum: ["comun", "especial", "plata", "oro", "platino"],
      default: "comun",
    },
    
    estado: {
        type: String,
        enum: ["pendiente", "aprobado", "activo", "bloqueado", "rechazado"],
        default: "pendiente",
    },

    rol: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario",
    },

    mediosPago: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedioPago",
    }],

    codigoActivacion: { type: String },
    codigoActivacionExpira: { type: Date },
    resetCode: { type: String },
    resetCodeExpires: { type: Date },
}, {
    timestamps: true,
    versionKey: false,
});

// Antes de guardar, si no tiene `id`, asignar el string de `_id`
usuarioSchema.pre('save', function () {
    if (!this.id) {
        this.id = this._id ? this._id.toString() : undefined;
    }
});

export default mongoose.model("Usuario", usuarioSchema);
