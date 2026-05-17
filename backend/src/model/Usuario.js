import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
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
        enum: ["pendiente", "aprobado", "activo", "bloqueado"],
        default: "pendiente",
    },

    rol: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario",
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Usuario", usuarioSchema);
