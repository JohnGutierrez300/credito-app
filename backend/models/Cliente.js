/* =========================================================
   V12 - MODELO CLIENTE
   MongoDB Atlas (Mongoose Schema)
========================================================= */

const mongoose = require("mongoose");

/* =========================
   ESQUEMA CLIENTE
========================= */

const ClienteSchema = new mongoose.Schema(
    {
        documento: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        nombre: {
            type: String,
            required: true,
            trim: true
        },

        telefono: {
            type: String,
            required: true,
            trim: true
        },

        direccion: {
            type: String,
            required: false,
            trim: true
        },

        saldo: {
            type: Number,
            default: 0
        },

        cuota: {
            type: Number,
            default: 0
        },

        estado: {
            type: String,
            enum: [
   "activo",
   "inactivo",
   "moroso",
   "pendiente"
],
            default: "activo"
        }
    },
    {
        timestamps: true
    }
);

/* =========================
   EXPORTAR MODELO
========================= */

module.exports = mongoose.model("Cliente", ClienteSchema);