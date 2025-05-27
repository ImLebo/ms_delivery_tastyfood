import { Cliente } from "../models/Cliente";

const API_URL = import.meta.env.VITE_API_URL + '/customers' || "";

//Esto es para obtener todos los clientes 
export const getCliente = async (): Promise<Cliente[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los clientes.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Obtener cada cliente por su ID
export const getClienteById = async (id: number): Promise<Cliente> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error al obtener el cliente con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Crear un nuevo cliente 
export const createCliente = async (producto: Omit<Cliente, 'id'>): Promise<Cliente> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        });
        if (!respuesta.ok) throw new Error("Error al crear el cliente.");
        const response = await respuesta.json()
        return response[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Actualizar el cliente
export const updateCliente = async (id: number, producto: Partial<Cliente>): Promise<Cliente> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto)
        });
        if (!respuesta.ok) throw new Error(`Error al actualizar el cliente con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Eliminar cliente 
export const deleteCliente = async (id: number): Promise<boolean> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) throw new Error(`Error al eliminar el cliente con ID ${id}.`);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}