/* =========================================================
   V12 - CONTROLADOR COBROS
   Lógica de pagos, cuotas y abonos
========================================================= */

const Cobro = require("../models/Cobro");
const Cliente = require("../models/Cliente");

/* =========================
   REGISTRAR COBRO
========================= */

const registrarCobro = async (req, res) => {

    try {

        const {
            clienteId,
            tipo,
            valor,
            metodoPago,
            observaciones
        } = req.body;

        /* =========================
           VALIDAR CLIENTE
        ========================= */

        const cliente = await Cliente.findById(clienteId);

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        if (valor <= 0) {
            return res.status(400).json({
                mensaje: "El valor debe ser mayor a 0"
            });
        }

        /* =========================
           CREAR COBRO
        ========================= */

        const cobro = new Cobro({
            clienteId,
            tipo,
            valor,
            metodoPago,
            observaciones: observaciones || "",
            fecha: new Date()
        });

        await cobro.save();

        /* =========================
           ACTUALIZAR CLIENTE
        ========================= */

        if (tipo === "Cuota" || tipo === "Abono") {
            cliente.saldo = cliente.saldo - valor;

            if (cliente.saldo < 0) {
                cliente.saldo = 0;
            }

            cliente.pagadas = (cliente.pagadas || 0) + 1;
        }

        if (tipo === "No Pago") {
            cliente.estado = "moroso";
        }

        await cliente.save();

        /* =========================
           RESPUESTA
        ========================= */

        res.status(201).json({
            mensaje: "Cobro registrado correctamente",
            cobro,
            clienteActualizado: cliente
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar cobro",
            error: error.message
        });
    }
};

/* =========================
   OBTENER TODOS LOS COBROS
========================= */

const obtenerCobros = async (req, res) => {

    try {

        const cobros = await Cobro.find()
            .populate("clienteId", "nombre telefono saldo")
            .sort({ createdAt: -1 });

        res.json({
            total: cobros.length,
            cobros
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener cobros",
            error: error.message
        });
    }
};

/* =========================
   COBROS POR CLIENTE
========================= */

const obtenerCobrosPorCliente = async (req, res) => {

    try {

        const cobros = await Cobro.find({
            clienteId: req.params.id
        }).sort({ createdAt: -1 });

        res.json({
            total: cobros.length,
            cobros
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener cobros del cliente",
            error: error.message
        });
    }
};

/* =========================
   ELIMINAR COBRO
========================= */

const eliminarCobro = async (req, res) => {

    try {

        const cobro = await Cobro.findByIdAndDelete(req.params.id);

        if (!cobro) {
            return res.status(404).json({
                mensaje: "Cobro no encontrado"
            });
        }

        res.json({
            mensaje: "Cobro eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar cobro",
            error: error.message
        });
    }
};

/* =========================
   EXPORTAR
========================= */

module.exports = {
    registrarCobro,
    obtenerCobros,
    obtenerCobrosPorCliente,
    eliminarCobro
};