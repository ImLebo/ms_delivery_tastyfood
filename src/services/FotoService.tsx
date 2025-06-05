import { Foto } from "../models/Foto";

const API_URL = import.meta.env.VITE_API_URL + '/photos' || "";

export const obtenerFotosPorNovedad = async (issueId: number): Promise<Foto[]> => {
    try {
        const respuesta = await fetch(`${API_URL}?issue_id=${issueId}`);
        if (!respuesta.ok) throw new Error("Error al obtener fotos");
        return await respuesta.json();
    } catch (error) {
        console.error(`Error en obtenerFotosPorNovedad(${issueId}):`, error);
        throw error;
    }
};

// Versión mejorada con validación completa
export const subirFoto = async (archivo: File, issueId: number, caption?: string): Promise<Foto> => {
    try {
        // Validar archivo antes de enviar
        if (!archivo || !archivo.type.startsWith('image/')) {
            throw new Error("Solo se permiten archivos de imagen");
        }

        const formData = new FormData();
        formData.append('file', archivo, archivo.name); // Nombre del archivo
        formData.append('issue_id', issueId.toString());
        caption && formData.append('caption', caption);

        const respuesta = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        const responseData = await respuesta.json();
		const data = responseData[0];
        
        if (!respuesta.ok || !data.image_url) {
            throw new Error(data.error || "Error desconocido");
        }

        return responseData;
    } catch (error) {
        console.error("Error completo:", {
            error,
            archivo: archivo?.name,
            issueId,
            caption
        });
        throw error;
    }
};

export const eliminarFoto = async (id: number): Promise<void> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) throw new Error("Error al eliminar foto");
    } catch (error) {
        console.error(`Error en eliminarFoto(${id}):`, error);
        throw error;
    }
};

// Métodos adicionales para gestión completa
export const actualizarFoto = async (id: number, cambios: Partial<Foto>): Promise<Foto> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cambios)
        });
        
        if (!respuesta.ok) throw new Error("Error al actualizar foto");
        return await respuesta.json();
    } catch (error) {
        console.error(`Error en actualizarFoto(${id}):`, error);
        throw error;
    }
};

export const obtenerFotoPorId = async (id: number): Promise<Foto> => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error("Foto no encontrada");
        return await respuesta.json();
    } catch (error) {
        console.error(`Error en obtenerFotoPorId(${id}):`, error);
        throw error;
    }
};