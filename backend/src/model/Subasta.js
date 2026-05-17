import mongoose from "mongoose";

const subastaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    titulo: {
        type: String,
        required: true,
        unique: true,
    },

    fechaInicio: {
        type: Date,
        required: true,
    },

    fechaFin: {
        type: Date,
        required: true,
    },

    categoriaRequerida: {
        type: String,
        enum: ["comun", "especial", "plata", "oro", "platino"],
        default: "comun",
    },

    estado: {
        type: String,
        enum:["proximamente", "abierta", "cerrada"],
        default: "proximamente"
    },

    moneda: {
        type: String,
        required: true,
        enum: ["ARS", "USD"],
        default: "ARS"
    },

    articulos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo",
    }],

}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Subasta", subastaSchema);