import Restaurante from "../models/Restaurante";

const API_URL = import.meta.env.VITE_API_URL + '/restaurants' || "";

//Esto es para obtener todos los repartidores 
export const getRestaurante = async (): Promise<Restaurante[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los repartidores.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Obtener cada repartidor por su ID
export const getRestauranteById = async (id: number): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error al obtener el repartidor con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Crear un nuevo repartidor 
export const createRestaurante = async (repartidor: Omit<Restaurante, 'id'>): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(repartidor)
        });
        if (!respuesta.ok) throw new Error("Error al crear el repartidor.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Actualizar el repartidor
export const updateRestaurante = async (id: number, repartidor: Partial<Restaurante>): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(repartidor)
        });
        if (!respuesta.ok) throw new Error(`Error al actualizar el repartidor con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Eliminar repartidor 
export const deleteRestaurante = async (id: number): Promise<boolean> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) throw new Error(`Error al eliminar el repartidor con ID ${id}.`);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}