/* =========================================================
   V12 - APP SPA CONTROLLER
   Navegación entre 5 pantallas sin recargar
========================================================= */

const screens = {
    clientes: document.getElementById("pantalla-clientes"),
    cuota: document.getElementById("pantalla-cuota"),
    nuevo: document.getElementById("pantalla-nuevo"),
    caja: document.getElementById("pantalla-caja"),
    resumen: document.getElementById("pantalla-resumen")
};

const navButtons = document.querySelectorAll(".nav-btn");

let currentScreen = "clientes";

/* =========================================================
   CAMBIAR PANTALLA
========================================================= */

function showScreen(screenName) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active-screen");
    });

    screens[screenName].classList.add("active-screen");

    currentScreen = screenName;

    updateNav(screenName);
}

/* =========================================================
   ACTUALIZAR NAV BAR
========================================================= */

function updateNav(active) {

    navButtons.forEach(btn => {
        btn.classList.remove("active-nav");

        if (btn.dataset.screen === `pantalla-${active}`) {
            btn.classList.add("active-nav");
        }
    });
}

/* =========================================================
   EVENTOS NAV BAR
========================================================= */

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const screen = btn.dataset.screen.replace("pantalla-", "");

        showScreen(screen);
    });
});

/* =========================================================
   BOTÓN RESUMEN (HEADER CLIENTES)
========================================================= */

const btnResumen = document.getElementById("btnResumen");

if (btnResumen) {
    btnResumen.addEventListener("click", () => {
        showScreen("resumen");
    });
}

/* =========================================================
   BOTÓN VOLVER (INTERFAZ 2)
========================================================= */

const volverClientes = document.getElementById("volverClientes");

if (volverClientes) {
    volverClientes.addEventListener("click", () => {
        showScreen("clientes");
    });
}





/* =========================================================
   BOTÓN GUARDAR CAJA → SIMULACIÓN
========================================================= */

const btnSync = document.getElementById("btnSync");

if (btnSync) {
    btnSync.addEventListener("click", () => {

        btnSync.innerHTML = "⏳ Sincronizando...";

        setTimeout(() => {
            btnSync.innerHTML = "☁ Carga Completa";

            alert("✔ Datos sincronizados correctamente con la nube (simulado)");
        }, 1500);
    });
}

/* =========================================================
   INICIO APP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    showScreen("clientes");
});



if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("SW registrado"))
            .catch(err => console.log("SW error", err));
    });
}