/* =========================================================
   V12 - CONTROLADOR CLIENTES
   CRUD con MongoDB Atlas (Mongoose)
========================================================= */

const Cliente = require("../models/Cliente");

/* =========================
   CREAR CLIENTE
========================= */

const crearCliente = async (req, res) => {

    try {

        const {
            documento,
            nombre,
            telefono,
            direccion,
            saldo,
            cuota,
            estado
        } = req.body;

        const clienteExistente = await Cliente.findOne({ documento });

        if (clienteExistente) {
            return res.status(400).json({
                mensaje: "El cliente ya existe"
            });
        }

        const cliente = new Cliente({
            documento,
            nombre,
            telefono,
            direccion,
            saldo: saldo || 0,
            cuota: cuota || 0,
            estado: estado || "activo"
        });

        const guardado = await cliente.save();

        res.status(201).json({
            mensaje: "Cliente creado correctamente",
            cliente: guardado
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear cliente",
            error: error.message
        });
    }
};

/* =========================
   OBTENER TODOS
========================= */

const obtenerClientes = async (req, res) => {

    try {

        const clientes = await Cliente.find().sort({ createdAt: -1 });

        res.json({
            total: clientes.length,
            clientes
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener clientes",
            error: error.message
        });
    }
};

/* =========================
   OBTENER UNO
========================= */

const obtenerCliente = async (req, res) => {

    try {

        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.json(cliente);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener cliente",
            error: error.message
        });
    }
};

/* =========================
   ACTUALIZAR CLIENTE
========================= */

const actualizarCliente = async (req, res) => {

    try {

        console.log("=================================");
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);

        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        console.log("CLIENTE ACTUALIZADO:");
        console.log(cliente);
        console.log("=================================");

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.json({
            mensaje: "Cliente actualizado correctamente",
            cliente
        });

    } catch (error) {

        console.error("ERROR ACTUALIZANDO:");
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar cliente",
            error: error.message
        });
    }
};

/* =========================
   ELIMINAR CLIENTE
========================= */

const eliminarCliente = async (req, res) => {

    try {

        const cliente = await Cliente.findByIdAndDelete(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
        }

        res.json({
            mensaje: "Cliente eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar cliente",
            error: error.message
        });
    }
};

/* =========================
   EXPORTAR
========================= */

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
};