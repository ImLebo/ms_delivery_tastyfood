import Novedad from "../models/Novedad";

const API_URL = import.meta.env.VITE_API_URL + '/issues' || "";

export const obtenerNovedades = async (): Promise<Novedad[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener novedades");
        return await respuesta.json();
    } catch (error) {
        console.error("Error en obtenerNovedades:", error);
        throw error;
    }
};

export const obtenerNovedadPorId = async (id: number): Promise<Novedad> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Novedad con ID ${id} no encontrada`);
        return await respuesta.json();
    } catch (error) {
        console.error(`Error en obtenerNovedadPorId(${id}):`, error);
        throw error;
    }
};

export const crearNovedad = async (novedad: Omit<Novedad, 'id'>): Promise<Novedad> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...novedad,
                date_reported: new Date().toISOString() // Fecha automática
            })
        });
        
        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.message || "Error al crear novedad");
        }
        const data = await respuesta.json();
        return data[0];
    } catch (error) {
        console.error("Error en crearNovedad:", error);
        throw error;
    }
};

export const actualizarNovedad = async (id: number, datosActualizados: Partial<Novedad>): Promise<Novedad> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });
        
        if (!respuesta.ok) throw new Error("Error al actualizar novedad");
        return await respuesta.json();
    } catch (error) {
        console.error(`Error en actualizarNovedad(${id}):`, error);
        throw error;
    }
};

export const eliminarNovedad = async (id: number): Promise<void> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) throw new Error("Error al eliminar novedad");
    } catch (error) {
        console.error(`Error en eliminarNovedad(${id}):`, error);
        throw error;
    }
};