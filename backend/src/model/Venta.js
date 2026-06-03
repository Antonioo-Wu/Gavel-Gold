import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    sparse: true,
  },
  articuloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Articulo",
    required: true,
  },
  subastaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subasta",
    required: true,
  },
  ganadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  montoFinal: {
    type: Number,
    required: true,
  },
  estadoPago: {
    type: String,
    enum: ["pendiente", "pagado", "rechazado"],
    default: "pendiente",
  },
  modalidadEntrega: {
    type: String,
    enum: ["retiro", "envio"],
    default: null,
  },
  estadoEntrega: {
    type: String,
    enum: ["pendiente", "preparando", "listo", "entregado"],
    default: "pendiente",
  },
}, {
  timestamps: true,
  versionKey: false,
});

ventaSchema.pre('save', function () {
  if (!this.id) {
    this.id = this._id ? this._id.toString() : undefined;
  }
});

export default mongoose.model('Venta', ventaSchema);
