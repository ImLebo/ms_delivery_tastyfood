import Turno from "../models/Turno";

const API_URL = import.meta.env.VITE_API_URL + '/shifts' || "";

// Obtener todos los turnos
export const obtenerTurnos = async (): Promise<Turno[]> => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error fetching shifts");
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Obtener turno por ID
export const obtenerTurnoPorId = async (id: number): Promise<Turno> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error(`Error fetching shift ${id}`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Crear nuevo turno
export const crearTurno = async (turno: Omit<Turno, 'id'>): Promise<Turno> => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turno)
        });

        if (!respuesta.ok) throw new Error("Error creating shift");

        const data = await respuesta.json();
        
        return data[0]; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Actualizar turno
export const actualizarTurno = async (id: number, turno: Partial<Turno>): Promise<Turno> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turno)
        });
        if (!respuesta.ok) throw new Error(`Error updating shift ${id}`);
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Eliminar turno
export const eliminarTurno = async (id: number): Promise<boolean> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!respuesta.ok) throw new Error(`Error deleting shift ${id}`);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}