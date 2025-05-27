import Restaurante from "../models/Restaurante";

const API_URL = import.meta.env.VITE_API_URL + '/restaurants' || "";

//Esto es para obtener todos los restaurantes 
export const getRestaurante = async (): Promise<Restaurante[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los restaurante.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Obtener cada restaurante por su ID
export const getRestauranteById = async (id: number): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error al obtener el restaurante con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Crear un nuevo restaurante 
export const createRestaurante = async (restaurante: Omit<Restaurante, 'id'>): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurante)
        });
        if (!respuesta.ok) throw new Error("Error al crear el restaurante.");
        const response = await respuesta.json();
        return response[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Actualizar el restaurante
export const updateRestaurante = async (id: number, restaurante: Partial<Restaurante>): Promise<Restaurante> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurante)
        });
        if (!respuesta.ok) throw new Error(`Error al actualizar el restaurante con ID ${id}.`);
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
        if (!respuesta.ok) throw new Error(`Error al eliminar el restaurante con ID ${id}.`);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}