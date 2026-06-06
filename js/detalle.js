import { fetchAPI, construirURLDetalle } from "./api.js";
import { mostrarLoader, ocultarLoader, mostrarError } from "./utils.js";
import { limpiarTexto } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (!codigo) {
        mostrarError("Código no válido.");
        return;
    }

    mostrarLoader();

    try {
        const url = construirURLDetalle(codigo);
        const data = await fetchAPI(url);

        const detalle = data.Listado[0];
        renderizarDetalle(detalle);

    } catch {
        mostrarError("Error cargando detalle.");
    } finally {
        ocultarLoader();
    }
});

function renderizarDetalle(detalle) {
    const contenedor = document.getElementById("detalle");

    const fechaCierre = obtenerFechaCierre(detalle);

    contenedor.innerHTML = `
        <h2>${detalle.Nombre || "Sin nombre"}</h2>
        <p><strong>Descripción:</strong> ${detalle.Descripcion || "No disponible"}</p>
        <p><strong>Estado:</strong> ${detalle.Estado || "No disponible"}</p>
        <p><strong>Fecha cierre:</strong> ${fechaCierre}</p>
    `;
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);

    return fecha.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}


function obtenerFechaCierre(detalle) {
    // Primera opción: FechaCierre directa
    if (detalle.FechaCierre) {
        return formatearFecha(detalle.FechaCierre);
    }

    // Segunda opción: objeto Fechas
    if (detalle.Fechas && detalle.Fechas.FechaCierre) {
        return formatearFecha(detalle.Fechas.FechaCierre);
    }

    // Si ninguna existe
    return "No disponible";
}
