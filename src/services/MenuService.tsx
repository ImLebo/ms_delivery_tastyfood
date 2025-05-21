import Menu from "../models/Menu";

const API_URL = import.meta.env.VITE_API_URL + '/menus' || "";

//Esto es para obtener todos los menús 
export const getMenu = async (): Promise<Menu[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los repartidores.");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Obtener cada menú por su ID
export const getMenurById = async (id: number): Promise<Menu> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error al obtener el repartidor con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Crear un nuevo menú 
export const createMenu = async (menu: Omit<Menu, 'id'>): Promise<Menu> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menu)
        });

        if (!respuesta.ok) throw new Error("Error al crear el repartidor.");
        
        const data = await respuesta.json();
        return data[0]; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Actualizar el menú
export const updateMenu = async (id: number, menu: Partial<Menu>): Promise<Menu> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menu)
        });
        if (!respuesta.ok) throw new Error(`Error al actualizar el repartidor con ID ${id}.`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//Eliminar menú 
export const deleteMenu = async (id: number): Promise<boolean> => {
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