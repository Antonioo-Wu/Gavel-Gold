import mongoose from "mongoose";

const pujaSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        sparse: true,
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

    articuloId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo",
        required: false,
    },

    fecha: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
    versionKey: false,
});

pujaSchema.pre('save', function () {
    if (!this.id) {
        this.id = this._id ? this._id.toString() : undefined;
    }
});

export default mongoose.model("Puja", pujaSchema);
