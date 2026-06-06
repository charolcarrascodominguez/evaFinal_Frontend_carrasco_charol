import { fetchAPI, construirURLProveedor } from "./api.js";
import { mostrarLoader, ocultarLoader, mostrarError } from "./utils.js";

document.getElementById("formProveedor")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rut = document.getElementById("rut").value;

    if (!validarRUT(rut)) {
        mostrarError("RUT inválido.");
        return;
    }

    mostrarLoader();

    try {
        const url = construirURLProveedor(rut);
        const data = await fetchAPI(url);

        if (!data.Listado || data.Listado.length === 0) {
            mostrarError("Proveedor no encontrado.");
            return;
        }

        renderizarProveedor(data.Listado[0]);

    } catch {
        mostrarError("Error consultando proveedor.");
    } finally {
        ocultarLoader();
    }
});

function validarRUT(rut) {
    if (!rut) return false;

    const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "");

    if (rutLimpio.length < 2) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = suma % 11;
    const dvEsperado = 11 - resto;

    const dvCalculado =
        dvEsperado === 11 ? "0" :
        dvEsperado === 10 ? "K" :
        String(dvEsperado);

    return dvCalculado === dv;
}


function renderizarProveedor(proveedor) {
    const contenedor = document.getElementById("resultadoProveedor");

    contenedor.innerHTML = `
        <h3>${limpiarTexto(proveedor.NombreEmpresa)}</h3>
        <p><strong>RUT:</strong> ${proveedor.RutEmpresa}</p>
        <p><strong>Estado:</strong> ${proveedor.Estado}</p>
    `;
}
