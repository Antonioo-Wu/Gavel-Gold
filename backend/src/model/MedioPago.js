import mongoose from "mongoose";

const medioPagoSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        sparse: true,
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
        type: Object,
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

// Antes de guardar, si no tiene `id`, asignar string de `_id`
medioPagoSchema.pre('save', function () {
    if (!this.id) {
        this.id = this._id ? this._id.toString() : undefined;
    }
});

export default mongoose.model("MedioPago", medioPagoSchema);
