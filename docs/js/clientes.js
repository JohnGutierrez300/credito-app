const API_URL = "https://credito-app.onrender.com/api";
/* =========================================================
   V12 - CLIENTES MODULE
   Datos simulados + render + selección de cliente
========================================================= */

/* =========================
   DATOS SIMULADOS
========================= */

let clientes = [];

/* =========================
   CLIENTE SELECCIONADO GLOBAL
========================= */

let clienteActivo = null;

async function cargarClientesBackend() {
    try {
        const res = await fetch(`${API_URL}/clientes`);

if (!res.ok) {
    throw new Error("Error API");
}

const data = await res.json();

        clientes = (data.clientes || []).map(c => ({
            _id: c._id,
            nombre: c.nombre,
            telefono: c.telefono,
            documento: c.documento,
            direccion: c.direccion,
            saldo: Number(c.saldo) || 0,
            cuota: Number(c.cuota) || 0,
            estado: c.estado || "pendiente"
        }));

window.clientes = clientes;

        renderClientes();

    } catch (error) {
    console.error("Error cargando clientes:", error);

    document.getElementById("listaClientes").innerHTML = `
        <div style="text-align:center;color:red;">
            ❌ Error cargando datos. Revisa conexión.
        </div>
    `;
}
}

/* =========================
   RENDER DE CLIENTES
========================= */

function renderClientes(lista = clientes) {

    const container = document.getElementById("listaClientes");

    if (!container) return;

    container.innerHTML = "";

    lista.forEach(cliente => {

        const card = document.createElement("div");

        card.className = "cliente-card cursor-pointer";

        card.innerHTML = `
    <h2 class="font-bold text-lg">${cliente.nombre}</h2>

    <div class="flex justify-between mt-2">
        <span>💳 Cuota:</span>
        <strong>$${(cliente.cuota || 0).toLocaleString()}</strong>
    </div>

    <div class="flex justify-between">
        <span>💸 Saldo:</span>
        <strong class="text-red-600">
            $${(cliente.saldo || 0).toLocaleString()}
        </strong>
    </div>

    <div class="flex justify-between">
        <span>📌 Estado:</span>
        <strong class="${
            cliente.estado === "activo"
                ? "text-green-600"
                : "text-yellow-600"
        }">
            ${(cliente.estado || "pendiente").toUpperCase()}
        </strong>
    </div>
`;

        card.addEventListener("click", () => {
            seleccionarCliente(cliente);
        });

        container.appendChild(card);
    });
}

/* =========================
   SELECCIONAR CLIENTE
========================= */

function seleccionarCliente(cliente) {

    clienteActivo = {
        ...cliente,
        saldo: cliente.saldo ?? 0,
        cuota: cliente.cuota ?? 0,
        estado: cliente.estado ?? "pendiente"
    };

    window.clienteActivo = clienteActivo;

    console.log("Cliente seleccionado:", clienteActivo);

    cargarDetalleCliente(clienteActivo);

    showScreen("cuota");
}

/* =========================
   CARGAR DETALLE EN INTERFAZ 2
========================= */

function cargarDetalleCliente(cliente) {

    document.getElementById("detalleNombre").textContent =
        cliente.nombre || "Sin nombre";

    document.getElementById("detalleDocumento").textContent =
        "Documento: " + (cliente.documento || "N/A");

    document.getElementById("detalleTelefono").textContent =
        "Teléfono: " + (cliente.telefono || "N/A");

    document.getElementById("detalleDireccion").textContent =
        "Dirección: " + (cliente.direccion || "N/A");

    const saldo = cliente.saldo ?? 0;
    const cuota = cliente.cuota ?? 0;
    const estado = cliente.estado ?? "pendiente";

document.getElementById("detalleEstado").innerHTML = `
    <strong style="
        color:${estado === "activo" ? "#16a34a" : "#d97706"};
    ">
        ${estado.toUpperCase()}
    </strong>
`;
    
    
    



    document.getElementById("detallePendientes").innerHTML = `
<div style="
background:#fee2e2;
color:#b91c1c;
padding:10px;
border-radius:12px;
font-weight:700;
">
💸 Debe: $${saldo.toLocaleString()}
</div>
`;

    document.getElementById("detallePagadas").innerHTML = `
<div style="
background:#dcfce7;
color:#166534;
padding:10px;
border-radius:12px;
font-weight:700;
">
💳 Cuota: $${cuota.toLocaleString()}
</div>
`;
}
/* =========================
   BUSCADOR DE CLIENTES
========================= */

const searchInput = document.querySelector("#pantalla-clientes input[type='text']");

if (searchInput) {

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.toLowerCase();

        const filtrados = clientes.filter(c =>
    (c.nombre || "")
        .toLowerCase()
        .includes(value)
);

        renderClientes(filtrados);
    });
}

/* =========================
   INICIALIZAR
========================= */

document.addEventListener("DOMContentLoaded", () => {
    cargarClientesBackend();
});


/* =========================================================
   CREAR CLIENTE EN BACKEND (MONGODB)
========================================================= */

async function crearClienteBackend(clienteData) {

    try {

        const res = await fetch(`${API_URL}/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al crear cliente");
        }

        console.log("✔ Cliente guardado en MongoDB:", data);

        return data.cliente;

    } catch (error) {

        console.error("❌ ERROR API:", error.message);
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnCrearCliente");

    if (!btn) return;

    btn.addEventListener("click", async () => {

        const cliente = {
    documento: document.getElementById("documento").value,
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    cuota: Number(document.getElementById("valorCuota").value || 0)
};

        try {

            // EDITAR
            if (
                window.clienteActivo &&
                window.clienteActivo._id
            ) {

                const res = await fetch(
                    `${API_URL}/clientes/${window.clienteActivo._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cliente)
                    }
                );

                const data = await res.json();

                showToast(
    "✔ Cliente actualizado",
    "success"
);

                window.clienteActivo = data.cliente;
            }

            // CREAR
            else {

                const creado =
                    await crearClienteBackend(cliente);

                if (!creado) return;

                showToast(
    "✔ Cliente creado correctamente",
    "success"
);
            }

            showScreen("clientes");

            cargarClientesBackend();

        } catch (error) {

            console.error(error);

            showToast(
    "❌ Error guardando cliente",
    "error"
);
        }

        // reset UI después de guardar
if (document.getElementById("btnCrearCliente")) {
    document.getElementById("btnCrearCliente").textContent =
        "Crear Cliente y Activar Crédito";
}

document.getElementById("documento").value = "";
document.getElementById("nombre").value = "";
document.getElementById("telefono").value = "";
document.getElementById("direccion").value = "";
document.getElementById("valorCuota").value = "";

    });
});




async function eliminarCliente(id) {

    if (!confirm("¿Eliminar cliente?")) return;

    try {

        const res = await fetch(
            `${API_URL}/clientes/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await res.json();

        alert(data.mensaje);

        cargarClientesBackend();

        showScreen("clientes");

    } catch (error) {

        console.error(error);

        alert("Error eliminando cliente");
    }
}


document
.getElementById("btnEliminarCliente")
?.addEventListener("click", () => {

    if (!window.clienteActivo) return;

    eliminarCliente(window.clienteActivo._id);

});





document
.getElementById("btnReiniciarEstado")
?.addEventListener("click", async () => {

    if (!window.clienteActivo) return;

    try {

        await fetch(
            `${API_URL}/clientes/${window.clienteActivo._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    estado: "pendiente"
                })
            }
        );

        showToast(
    "🔄 Estado reiniciado",
    "warning"
);

        cargarClientesBackend();

    } catch (error) {

        console.error(error);

        alert("Error actualizando estado");
    }

});


/* =========================================================
   EDITAR CLIENTE Y PRÉSTAMO
========================================================= */

document
.getElementById("btnEditarCliente")
?.addEventListener("click", () => {

    if (!window.clienteActivo) {
        alert("Seleccione un cliente");
        return;
    }

    document.getElementById("documento").value =
        window.clienteActivo.documento || "";

    document.getElementById("nombre").value =
        window.clienteActivo.nombre || "";

    document.getElementById("telefono").value =
        window.clienteActivo.telefono || "";

    document.getElementById("direccion").value =
        window.clienteActivo.direccion || "";

    document.getElementById("valorCuota").value =
        window.clienteActivo.cuota || 0;

    document.getElementById("btnCrearCliente").textContent =
        "💾 Guardar Cambios";

    showScreen("nuevo");
});


document.addEventListener("DOMContentLoaded", () => {

    document
    .getElementById("btnCobrar")
    ?.addEventListener("click", () => {

        document
        .getElementById("modalCobro")
        .classList.remove("hidden");

        document
        .getElementById("inputCobro")
        .value = "";
    });



    document
    .getElementById("btnCancelarCobro")
    ?.addEventListener("click", () => {

        document
        .getElementById("modalCobro")
        .classList.add("hidden");
    });



    document
    .getElementById("inputCobro")
    ?.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        this.value = Number(valor || 0)
            .toLocaleString("es-CO");
    });



    document
    .getElementById("btnConfirmarCobro")
    ?.addEventListener("click", async () => {

        console.log("BOTON COBRAR PRESIONADO");

        const valor = Number(
            document
            .getElementById("inputCobro")
            .value
            .replace(/\./g, "")
        );

        if (isNaN(valor) || valor <= 0) {

            showToast(
                "❌ Valor inválido",
                "error"
            );

            return;
        }

        const nuevoSaldo =
            (window.clienteActivo.saldo || 0) - valor;

        try {

            const res = await fetch(
                `${API_URL}/clientes/${window.clienteActivo._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        saldo: nuevoSaldo < 0 ? 0 : nuevoSaldo
                    })
                }
            );

            const data = await res.json();

            window.clienteActivo = data.cliente;

            cargarDetalleCliente(data.cliente);

            cargarClientesBackend();

            document
            .getElementById("modalCobro")
            .classList.add("hidden");

            showToast(
                "💰 Cobro registrado correctamente",
                "success"
            );

        } catch (error) {

            console.error(error);

            showToast(
                "❌ Error registrando cobro",
                "error"
            );
        }
    });

});

