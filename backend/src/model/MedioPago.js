import mongoose from "mongoose";

const medioPagoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },

    tipo: {
        type: String,
        enum: ["CUENTA_BANCARIA", "TARJETA", "CHEQUE"],
        required: true,
    },

    detalle: {
        type: String,
        required: true,
    },

    validado: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("MedioPago", medioPagoSchema);
