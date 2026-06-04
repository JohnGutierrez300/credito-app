/* =========================================================
   V12 - RUTAS COBROS
   API REST - Cobros / Pagos
========================================================= */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLADOR
========================= */

const {
    registrarCobro,
    obtenerCobros,
    obtenerCobrosPorCliente,
    eliminarCobro
} = require("../controllers/cobroController");

/* =========================
   RUTAS COBROS
========================= */

/**
 * @route   POST /api/cobros
 * @desc    Registrar un cobro (cuota / abono / pago)
 */
router.post("/", registrarCobro);

/**
 * @route   GET /api/cobros
 * @desc    Obtener todos los cobros
 */
router.get("/", obtenerCobros);

/**
 * @route   GET /api/cobros/cliente/:id
 * @desc    Obtener cobros por cliente
 */
router.get("/cliente/:id", obtenerCobrosPorCliente);

/**
 * @route   DELETE /api/cobros/:id
 * @desc    Eliminar un cobro
 */
router.delete("/:id", eliminarCobro);

module.exports = router;