import Repartidor from "../models/Repartidor";

const API_URL = import.meta.env.VITE_API_URL + '/drivers' || "";


//Esto es para obtener todos los repartidores 
export const getRepartidores = async (): Promise<Repartidor[]> => {
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
export const getRepartidorById = async (id: number): Promise<Repartidor> => {
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
export const createRepartidor = async (repartidor: Omit<Repartidor, 'id'>): Promise<Repartidor> => {
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
export const updateRepartidor = async (id: number, repartidor: Partial<Repartidor>): Promise<Repartidor> => {
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
export const deleteRepartidor = async (id: number): Promise<boolean> => {
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