/* =========================================================
   V12 - RUTAS CLIENTES
   API REST - Clientes
========================================================= */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLADOR
========================= */

const {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clienteController");

/* =========================
   RUTAS CRUD
========================= */

/**
 * @route   POST /api/clientes
 * @desc    Crear cliente nuevo
 */
router.post("/", crearCliente);

/**
 * @route   GET /api/clientes
 * @desc    Obtener todos los clientes
 */
router.get("/", obtenerClientes);

/**
 * @route   GET /api/clientes/:id
 * @desc    Obtener un cliente por ID
 */
router.get("/:id", obtenerCliente);

/**
 * @route   PUT /api/clientes/:id
 * @desc    Actualizar cliente
 */
router.put("/:id", actualizarCliente);

/**
 * @route   DELETE /api/clientes/:id
 * @desc    Eliminar cliente
 */
router.delete("/:id", eliminarCliente);

module.exports = router;