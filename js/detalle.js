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

    contenedor.innerHTML = `
        <h2>${limpiarTexto(detalle.Nombre)}</h2>
        <p><strong>Descripción:</strong> ${limpiarTexto(detalle.Descripcion)}</p
        <p><strong>Estado:</strong> ${detalle.Estado}</p>
        <p><strong>Fecha cierre:</strong> ${detalle.FechaCierre}</p>
    `;
}
