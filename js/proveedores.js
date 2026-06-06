import { fetchAPI, construirURLProveedor } from "./api.js";
import { mostrarLoader, ocultarLoader, mostrarError, limpiarError } from "./utils.js";

document.getElementById("formProveedor")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    let rutInput = document.getElementById("rut").value.trim();

    if (!validarRUT(rutInput)) {
        mostrarError("RUT inválido.");
        return;
    }

    mostrarLoader();

    try {
        const rutLimpio = limpiarRUT(rutInput);
        const rutFormateado = formatearRUT(rutLimpio);

        const url = construirURLProveedor(rutFormateado);
        const data = await fetchAPI(url);

        if (!data || data.Cantidad === 0) {
            mostrarError("Proveedor no encontrado.");
            return;
        }

        limpiarError();
        renderizarProveedor(data.listaEmpresas[0]);

    } catch {
        mostrarError("Error consultando proveedor.");
    } finally {
        ocultarLoader();
    }
});


function validarRUT(rut) {
    const rutLimpio = limpiarRUT(rut);

    if (rutLimpio.length < 2) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);

    const dvCalculado =
        dvEsperado === 11 ? "0" :
        dvEsperado === 10 ? "K" :
        String(dvEsperado);

    return dvCalculado === dv;
}


function limpiarRUT(rut) {
    return rut.replace(/[^0-9kK]/g, "").toUpperCase();
}


function renderizarProveedor(proveedor) {
    const contenedor = document.getElementById("resultadoProveedor");

    contenedor.innerHTML = `
        <h3>${proveedor.NombreEmpresa}</h3>
        <p><strong>Código Empresa:</strong> ${proveedor.CodigoEmpresa}</p>
    `;
}
