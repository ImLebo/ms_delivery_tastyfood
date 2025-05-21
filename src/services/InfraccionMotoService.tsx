import { InfraccionMotocicleta } from "../models/InfraccionMotocicleta";

const API_URL = import.meta.env.VITE_API_MOCK + '/motorcycle-infringement' || "";

export const actualizarInfraccionMoto = async (id: number, turno: Partial<InfraccionMotocicleta>): Promise<InfraccionMotocicleta> => {
	try {
		const respuesta = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(turno)
		});
		if (!respuesta.ok) throw new Error(`Error actualizando la infraccion a moto ${id}`);
		
		console.log(`Infracción actualizada correctamente ${respuesta}`);
		
		return await respuesta.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const crearInfraccionMoto = async (turno: Omit<InfraccionMotocicleta, 'id'>): Promise<InfraccionMotocicleta> => {
	try {
		const respuesta = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(turno)
		});

		if (!respuesta.ok) throw new Error("Error creando infraccion a moto");

		console.log(`Infracción creada correctamente ${respuesta}`);

		const data = await respuesta.json();
		
		
		return data[0]; 
	} catch (error) {
		console.error(error);
		throw error;
	}
}