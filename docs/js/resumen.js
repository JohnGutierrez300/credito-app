/* =========================================================
   V12 - RESUMEN MODULE
   Dashboard financiero del día (simulado)
========================================================= */

/* =========================
   DATOS GLOBALES SIMULADOS
   (conectados desde otros módulos)
========================= */

function getClientes() {
    return window.clientes || [];
}

function obtenerMovimientosCaja() {
    return typeof window.getMovimientosCaja === "function"
        ? window.getMovimientosCaja()
        : [];
}

/* =========================
   CALCULAR RESUMEN
========================= */

function calcularResumen() {

    const clientes = getClientes();
    const caja = obtenerMovimientosCaja();

    let totalClientes = clientes.length;
    
   
    

    let pagosRegistrados = clientes.reduce((acc, c) => acc + (c.pagadas || 0), 0);

    

    let ingresos = 0;
    let egresos = 0;

    caja.forEach(m => {
        if (m.tipo.includes("Ingreso")) {
            ingresos += m.valor;
        } else {
            egresos += m.valor;
        }
    });

    let recaudoEsperado = clientes.reduce((acc, c) => acc + (c.cuota || 0), 0);

    let recaudoDia = recaudoEsperado - (egresos * 0.1); // simulación lógica

    let totalCaja = cajaInicial + recaudoDia + ingresos - egresos;

    return {
        totalClientes,
        clientesNuevos,
        ausentes,
        aplazados,
        pagosRegistrados,
        cajaInicial,
        ingresos,
        egresos,
        recaudoEsperado,
        recaudoDia,
        totalCaja
    };
}

/* =========================
   RENDER EN INTERFAZ 5
========================= */

function renderResumen() {

    const r = calcularResumen();

    const rows = document.querySelectorAll(".resumen-row strong");

    if (rows.length >= 10) {

        rows[0].textContent = "CORREDOR - JUAN";
        rows[1].textContent = new Date().toLocaleDateString();

        rows[2].textContent = r.ausentes;
        rows[3].textContent = r.aplazados;
        rows[4].textContent = r.totalClientes;
        rows[5].textContent = r.clientesNuevos;

        rows[6].textContent = r.pagosRegistrados + " registros";

        rows[7].textContent = "$" + r.cajaInicial.toLocaleString();
        rows[8].textContent = "$" + r.recaudoEsperado.toLocaleString();
        rows[9].textContent = "$" + r.recaudoDia.toLocaleString();

        // saldo final (último visible en HTML)
        const saldoFinal = document.querySelector(".resumen-row strong.text-green-600");
        if (saldoFinal) {
            saldoFinal.textContent = "$" + r.totalCaja.toLocaleString();
        }
    }
}

/* =========================
   BOTÓN CARGA COMPLETA (SIMULAR NUBE)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const btnSync = document.getElementById("btnSync");

    if (btnSync) {

        btnSync.addEventListener("click", () => {

            btnSync.textContent = "⏳ Sincronizando...";

            setTimeout(() => {

                btnSync.textContent = "☁ Carga Completa";

                alert("✔ Resumen enviado a la nube (simulación)");

                renderResumen();

            }, 1500);
        });
    }

    setTimeout(() => {
        renderResumen();
    }, 500);

});



/* =========================
   CARGAR AL ENTRAR A LA PANTALLA
========================= */

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        renderResumen();
    }, 500);

});