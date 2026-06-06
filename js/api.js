import { CONFIG } from "./config.js";

export async function fetchAPI(endpoint) {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Error en servidor");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error API:", error);
        throw error;
    }
}

export function construirURLListado(fecha, estado) {
    return `${CONFIG.BASE_URL}/publico/licitaciones.json?fecha=${fecha}&estado=${estado}&ticket=${CONFIG.TICKET}`;
}

export function construirURLDetalle(codigo) {
    return `${CONFIG.BASE_URL}/publico/licitaciones.json?codigo=${codigo}&ticket=${CONFIG.TICKET}`;
}

export function construirURLProveedor(rut) {
    return `${CONFIG.BASE_URL}/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&ticket=${CONFIG.TICKET}`;
}