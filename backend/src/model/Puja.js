import mongoose from "mongoose";

const pujaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    subastaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subasta",
        required: true,
    },

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },

    monto: {
        type: Number,
        required: true,
        min: 0.01,
    },

    medioPagoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedioPago",
        required: true,
    },

    fecha: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Puja", pujaSchema);
