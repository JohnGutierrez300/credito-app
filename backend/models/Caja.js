/* =========================================================
   V12 - MODELO CAJA
   Movimientos financieros (Ingresos / Egresos)
========================================================= */

const mongoose = require("mongoose");

/* =========================
   ESQUEMA CAJA
========================= */

const CajaSchema = new mongoose.Schema(
    {
        tipo: {
            type: String,
            enum: ["Ingreso", "Egreso"],
            default: "Egreso",
            required: true
        },

        concepto: {
            type: String,
            required: true,
            trim: true
        },

        valor: {
            type: Number,
            required: true,
            min: 0
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

module.exports = mongoose.model("Caja", CajaSchema);


