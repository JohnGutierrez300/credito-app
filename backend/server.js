/* =========================================================
   V12 - SERVER PRINCIPAL
   Express + MongoDB Atlas
========================================================= */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* =========================
   CONEXIÓN DB
========================= */

const conectarDB = require("./config/db");

/* =========================
   RUTAS
========================= */

const clientesRoutes = require("./routes/clientes.routes");
const cobrosRoutes = require("./routes/cobros.routes");
const cajaRoutes = require("./routes/caja.routes");
const resumenRoutes = require("./routes/resumen.routes");

/* =========================
   APP EXPRESS
========================= */

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   CONECTAR BD
========================= */

conectarDB();

/* =========================
   RUTAS API
========================= */

app.use("/api/clientes", clientesRoutes);
app.use("/api/cobros", cobrosRoutes);
app.use("/api/caja", cajaRoutes);
app.use("/api/resumen", resumenRoutes);

/* =========================
   RUTA PRINCIPAL
========================= */

app.get("/", (req, res) => {
    res.send("🚀 API V12 Créditos funcionando correctamente");
});

/* =========================
   MANEJO DE ERRORES
========================= */

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

/* =========================
   INICIAR SERVIDOR
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(`🚀 SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
    console.log("==================================");
});