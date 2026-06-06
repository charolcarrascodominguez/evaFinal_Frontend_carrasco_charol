import { CONFIG } from "./config.js";

export async function fetchAPI(endpoint, retries = 2) {
    try {
        const response = await fetch(endpoint);

        // Manejo específico 429
        if (response.status === 429) {
            if (retries > 0) {
                console.warn("Demasiadas solicitudes. Reintentando...");
                await new Promise(res => setTimeout(res, 2000)); // espera 2s
                return fetchAPI(endpoint, retries - 1);
            } else {
                throw new Error("Demasiadas solicitudes. Intente más tarde.");
            }
        }

        if (!response.ok) {
            throw new Error(Error HTTP: ${response.status});
        }

        return await response.json();

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