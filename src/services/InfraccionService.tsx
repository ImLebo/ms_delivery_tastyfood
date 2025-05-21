import { Infraccion } from "../models/Infraccion";

const API_URL = import.meta.env.VITE_API_MOCK + '/infringements' || "";

export const obtenerInfracciones = async (): Promise<Infraccion[]> => {
	try {
		const respuesta = await fetch(API_URL);
		if (!respuesta.ok) throw new Error("Error al obtener las infracciones.");
		return await respuesta.json();
	} catch (error) {
		console.error(error);
		return [];
	}
}