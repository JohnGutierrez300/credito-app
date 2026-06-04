/* =========================================================
   V12 - CONTROLADOR CAJA
   Movimientos de ingresos y egresos
========================================================= */

const Caja = require("../models/Caja");

/* =========================
   CREAR MOVIMIENTO
========================= */

const crearMovimiento = async (req, res) => {

    try {

        const {
            tipo,
            concepto,
            valor,
            observaciones
        } = req.body;

        /* =========================
           VALIDACIONES
        ========================= */

        if (!concepto || concepto === "") {
            return res.status(400).json({
                mensaje: "El concepto es obligatorio"
            });
        }

        if (!valor || valor <= 0) {
            return res.status(400).json({
                mensaje: "El valor debe ser mayor a 0"
            });
        }

        /* =========================
           CREAR MOVIMIENTO
        ========================= */

        const movimiento = new Caja({
            tipo: tipo || "Egreso",
            concepto,
            valor,
            observaciones: observaciones || "",
            fecha: new Date()
        });

        const guardado = await movimiento.save();

        res.status(201).json({
            mensaje: "Movimiento de caja registrado correctamente",
            movimiento: guardado
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar movimiento de caja",
            error: error.message
        });
    }
};

/* =========================
   OBTENER MOVIMIENTOS
========================= */

const obtenerMovimientos = async (req, res) => {

    try {

        const movimientos = await Caja.find()
            .sort({ createdAt: -1 });

        res.json({
            total: movimientos.length,
            movimientos
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener movimientos de caja",
            error: error.message
        });
    }
};

/* =========================
   ELIMINAR MOVIMIENTO
========================= */

const eliminarMovimiento = async (req, res) => {

    try {

        const movimiento = await Caja.findByIdAndDelete(req.params.id);

        if (!movimiento) {
            return res.status(404).json({
                mensaje: "Movimiento no encontrado"
            });
        }

        res.json({
            mensaje: "Movimiento eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar movimiento",
            error: error.message
        });
    }
};

/* =========================
   EXPORTAR
========================= */

module.exports = {
    crearMovimiento,
    obtenerMovimientos,
    eliminarMovimiento
};