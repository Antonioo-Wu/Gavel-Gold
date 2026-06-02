import mongoose from "mongoose";

const subastaSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        sparse: true,
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

// Antes de guardar, si no tiene `id`, asignar string de `_id`
subastaSchema.pre('save', function () {
    if (!this.id) {
        this.id = this._id ? this._id.toString() : undefined;
    }
});

export default mongoose.model("Subasta", subastaSchema);