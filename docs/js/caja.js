const API_URL = "https://credito-app.onrender.com/api";
/* =========================================================
   V12 - CAJA MODULE
   Movimientos de caja (Ingresos / Egresos)
   Simulado para luego conectar MongoDB Atlas
========================================================= */

/* =========================
   BASE DE DATOS SIMULADA
========================= */

let movimientosCaja = [];

/* =========================
   ELEMENTOS UI
========================= */

const btnGuardarCaja = document.querySelector("#pantalla-caja .btn-dark");

/* =========================
   GUARDAR MOVIMIENTO
========================= */

if (btnGuardarCaja) {

    btnGuardarCaja.addEventListener("click", async  () => {

        const tipoMovimiento = document.querySelector('input[name="mov"]:checked');

        const concepto = document.querySelector("#pantalla-caja select");
        const valor = document.querySelector("#pantalla-caja input[type='number']");
        const observaciones = document.querySelector("#pantalla-caja textarea");

        if (!concepto || !valor) {
            alert("❌ Faltan campos obligatorios");
            return;
        }

        let movimiento = {
            tipo: tipoMovimiento ? tipoMovimiento.parentElement.textContent.trim() : "Egreso",
            concepto: concepto.value,
            valor: parseFloat(valor.value) || 0,
            observaciones: observaciones.value || "",
            fecha: new Date()
        };

        /* =========================
           VALIDACIÓN
        ========================= */

        if (movimiento.valor <= 0) {
            alert("❌ El valor debe ser mayor a 0");
            return;
        }

        if (!movimiento.concepto || movimiento.concepto === "Seleccionar Concepto") {
            alert("❌ Selecciona un concepto");
            return;
        }

        /* =========================
           GUARDAR EN MEMORIA
        ========================= */

        const res = await fetch(`${API_URL}/caja`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(movimiento)
});

const data = await res.json();

if (!res.ok) {
    throw new Error(data.mensaje);
}

movimientosCaja.unshift(data.movimiento);

        console.log("💰 MOVIMIENTO DE CAJA:", movimiento);

        /* =========================
           LIMPIAR CAMPOS
        ========================= */

        valor.value = "";
        observaciones.value = "";

        /* =========================
           ALERTA
        ========================= */

        showToast(
    `💰 ${movimiento.tipo} registrado correctamente`,
    "success"
);

        /* =========================
           SIMULAR ACTUALIZACIÓN DASHBOARD
        ========================= */

        actualizarResumenCaja(movimiento);
    });
}

/* =========================
   ACTUALIZAR RESUMEN SIMULADO
========================= */

function actualizarResumenCaja(mov) {

    let totalIngresos = 0;
    let totalEgresos = 0;

    movimientosCaja.forEach(m => {

        if (m.tipo.includes("Ingreso")) {
            totalIngresos += m.valor;
        } else {
            totalEgresos += m.valor;
        }

    });

    const saldoNeto = totalIngresos - totalEgresos;

    console.log("📊 RESUMEN CAJA ACTUALIZADO");
    console.log("Ingresos:", totalIngresos);
    console.log("Egresos:", totalEgresos);
    console.log("Saldo Neto:", saldoNeto);
}

/* =========================
   EXPORTAR PARA RESUMEN
========================= */

window.getMovimientosCaja = function () {
    return movimientosCaja;
};



async function cargarMovimientosCaja() {

    try {

        const res = await fetch(`${API_URL}/caja`);

        const data = await res.json();

        movimientosCaja = data.movimientos || [];

        console.log("Caja cargada:", movimientosCaja);

    } catch (error) {

        console.error("Error cargando caja:", error);
    }
}