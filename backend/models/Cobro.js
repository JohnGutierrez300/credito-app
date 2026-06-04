/* =========================================================
   V12 - MODELO COBRO
   Registro de pagos, cuotas y abonos
========================================================= */

const mongoose = require("mongoose");

/* =========================
   ESQUEMA COBRO
========================= */

const CobroSchema = new mongoose.Schema(
    {
        clienteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente",
            required: true
        },

        tipo: {
            type: String,
            enum: ["Cuota", "Abono", "No Pago", "Siguiente Día"],
            required: true
        },

        valor: {
            type: Number,
            required: true,
            min: 0
        },

        metodoPago: {
            type: String,
            enum: ["Efectivo", "Transferencia"],
            default: "Efectivo"
        },

        observaciones: {
            type: String,
            default: ""
        },

        fecha: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

/* =========================
   EXPORTAR MODELO
========================= */

module.exports = mongoose.model("Cobro", CobroSchema);