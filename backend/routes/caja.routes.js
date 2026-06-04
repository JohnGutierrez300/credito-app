/* =========================================================
   V12 - RUTAS CAJA
   API REST - Movimientos de caja
========================================================= */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLADOR
========================= */

const {
    crearMovimiento,
    obtenerMovimientos,
    eliminarMovimiento
} = require("../controllers/cajaController");

/* =========================
   RUTAS CAJA
========================= */

/**
 * @route   POST /api/caja
 * @desc    Crear movimiento de caja (Ingreso/Egreso)
 */
router.post("/", crearMovimiento);

/**
 * @route   GET /api/caja
 * @desc    Obtener todos los movimientos de caja
 */
router.get("/", obtenerMovimientos);

/**
 * @route   DELETE /api/caja/:id
 * @desc    Eliminar movimiento de caja
 */
router.delete("/:id", eliminarMovimiento);

module.exports = router;