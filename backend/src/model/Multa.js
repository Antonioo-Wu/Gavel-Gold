import mongoose from "mongoose";

const multaSchema = new mongoose.Schema({
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
  motivo: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
    min: 0,
  },
  activa: {
    type: Boolean,
    default: true,
  },
  venceEn: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
  versionKey: false,
});

multaSchema.pre('save', function () {
  if (!this.id) {
    this.id = this._id ? this._id.toString() : undefined;
  }
});

export default mongoose.model('Multa', multaSchema);
