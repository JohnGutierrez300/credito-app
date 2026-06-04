const mongoose = require("mongoose");

const conectarDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("==================================");
        console.log("✔ MONGODB ATLAS CONECTADO");
        console.log("📦 Host:", conn.connection.host);
        console.log("📊 Base de datos:", conn.connection.name);
        console.log("==================================");

    } catch (error) {

        console.error("❌ ERROR CON MONGODB:", error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;