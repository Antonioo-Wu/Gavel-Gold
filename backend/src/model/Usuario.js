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

    categoria: {
      type: String,
      enum: ["plata", "oro", "platino"],
      default: "plata",
    },
    
    estado: {
        type: String,
        enum: ["pendiente", "aprobado", "activo", "bloqueado"],
        default: "pendiente",
    },
})
