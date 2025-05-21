import Motocicleta from "../models/Motocicleta";

const API_URL = import.meta.env.VITE_API_URL + '/motorcycles' || "";

// Obtener todas las motocicletas
export const obtenerMotocicletas = async (): Promise<Motocicleta[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener las motocicletas.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Obtener motocicleta por ID
export const obtenerMotocicletaPorId = async (id: number): Promise<Motocicleta> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error al obtener la motocicleta con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Crear nueva motocicleta
export const crearMotocicleta = async (motocicleta: Omit<Motocicleta, 'id'>): Promise<Motocicleta> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(motocicleta)
        });

        if (!respuesta.ok) throw new Error("Error al crear la motocicleta.");
        
        const datos = await respuesta.json();
        return datos[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Actualizar motocicleta
export const actualizarMotocicleta = async (id: number, motocicleta: Partial<Motocicleta>): Promise<Motocicleta> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(motocicleta)
        });
        if (!respuesta.ok) throw new Error(`Error al actualizar la motocicleta con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Eliminar motocicleta
export const eliminarMotocicleta = async (id: number): Promise<boolean> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) throw new Error(`Error al eliminar la motocicleta con ID ${id}.`);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}