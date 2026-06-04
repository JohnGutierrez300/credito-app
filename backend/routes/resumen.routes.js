/* =========================================================
   V12 - RUTAS RESUMEN
   Dashboard financiero del día
========================================================= */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLADOR
========================= */

const {
    obtenerResumenDia
} = require("../controllers/resumenController");

/* =========================
   RUTA PRINCIPAL
========================= */

/**
 * @route   GET /api/resumen
 * @desc    Obtener resumen financiero del día
 */
router.get("/", obtenerResumenDia);

module.exports = router;