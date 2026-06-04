/* =========================================================
   V12 - CONTROLADOR RESUMEN
   Dashboard financiero desde MongoDB
========================================================= */

const Cliente = require("../models/Cliente");
const Cobro = require("../models/Cobro");
const Caja = require("../models/Caja");

/* =========================
   OBTENER RESUMEN DEL DÍA
========================= */

const obtenerResumenDia = async (req, res) => {

    try {

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const mañana = new Date(hoy);
        mañana.setDate(mañana.getDate() + 1);

        /* =========================
           CLIENTES
        ========================= */

        const totalClientes = await Cliente.countDocuments();

        const clientesNuevos = await Cliente.countDocuments({
            createdAt: { $gte: hoy, $lt: mañana }
        });

        /* =========================
           COBROS HOY
        ========================= */

        const cobrosHoy = await Cobro.find({
            createdAt: { $gte: hoy, $lt: mañana }
        });

        let totalPagos = cobrosHoy.length;
        let totalRecaudado = 0;

        cobrosHoy.forEach(c => {
            totalRecaudado += c.valor;
        });

        /* =========================
           CAJA HOY
        ========================= */

        const cajaHoy = await Caja.find({
            createdAt: { $gte: hoy, $lt: mañana }
        });

        let ingresos = 0;
        let egresos = 0;

        cajaHoy.forEach(m => {
            if (m.tipo === "Ingreso") {
                ingresos += m.valor;
            } else {
                egresos += m.valor;
            }
        });

        /* =========================
           BALANCE FINAL
        ========================= */

        const cajaInicial = 500000; // puedes hacerlo dinámico después
        const saldoFinal = cajaInicial + ingresos - egresos + totalRecaudado;

        /* =========================
           RESPUESTA
        ========================= */

        res.json({
            fecha: hoy,
            clientes: {
                total: totalClientes,
                nuevos: clientesNuevos
            },
            cobros: {
                totalPagos,
                totalRecaudado
            },
            caja: {
                ingresos,
                egresos,
                cajaInicial,
                saldoFinal
            }
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener resumen del día",
            error: error.message
        });
    }
};

/* =========================
   EXPORTAR
========================= */

module.exports = {
    obtenerResumenDia
};