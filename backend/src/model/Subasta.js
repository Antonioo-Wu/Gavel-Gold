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

})