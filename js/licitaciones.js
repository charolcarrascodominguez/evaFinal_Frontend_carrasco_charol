import { fetchAPI, construirURLListado } from "./api.js";
import { mostrarLoader, ocultarLoader, mostrarError, limpiarError, paginar } from "./utils.js";
import { CONFIG } from "./config.js";

let resultadosGlobal = [];
let paginaActual = 1;

document.getElementById("formFiltro")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const estado = document.getElementById("estado").value;

    if (!fecha || !estado) {
        mostrarError("Debe completar todos los campos.");
        return;
    }

    limpiarError();
    mostrarLoader();

    try {
        const fechaFormateada = formatearFecha(fecha);
        const url = construirURLListado(fechaFormateada, estado);
        const data = await fetchAPI(url);

        if (!data.Listado || data.Listado.length === 0) {
            mostrarError("No se encontraron resultados.");
            return;
        }

        resultadosGlobal = data.Listado;
        paginaActual = 1;
        renderizar();

    } catch {
        mostrarError("Servidor no disponible.");
    } finally {
        ocultarLoader();
    }
});

function formatearFecha(fechaISO) {
    const [anio, mes, dia] = fechaISO.split("-");
    return `${dia}${mes}${anio}`;
}


function renderizar() {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    const datosPagina = paginar(resultadosGlobal, paginaActual, CONFIG.ITEMS_POR_PAGINA);

    datosPagina.forEach(item => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.setAttribute("tabindex", "0");

        card.innerHTML = `
            <div class="card-body">
                <h5>${item.Nombre}</h5>
                <p><strong>Código:</strong> ${item.CodigoExterno}</p>
                <a href="detalle.html?codigo=${item.CodigoExterno}" class="btn btn-primary">Ver Detalle</a>
            </div>
        `;

        contenedor.appendChild(card);
    });

    renderizarPaginacion();
}

function renderizarPaginacion() {
    const totalPaginas = Math.ceil(resultadosGlobal.length / CONFIG.ITEMS_POR_PAGINA);
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary m-1";
        btn.textContent = i;

        btn.addEventListener("click", () => {
            paginaActual = i;
            renderizar();
        });

        paginacion.appendChild(btn);
    }
}