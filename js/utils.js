export function mostrarLoader() {
    document.getElementById("loader")?.classList.remove("d-none");
}

export function ocultarLoader() {
    document.getElementById("loader")?.classList.add("d-none");
}

export function mostrarError(mensaje) {
    const errorDiv = document.getElementById("error");
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.classList.remove("d-none");
    }
}

export function limpiarError() {
    const errorDiv = document.getElementById("error");
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.classList.add("d-none");
    }
}

export function paginar(data, pagina = 1, porPagina = 10) {
    const inicio = (pagina - 1) * porPagina;
    return data.slice(inicio, inicio + porPagina);
}

export function limpiarTexto(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
