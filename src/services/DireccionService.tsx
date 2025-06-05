import Direccion from "../models/Direccion";

const API_URL = import.meta.env.VITE_API_URL + '/addresses';

/**
 * Obtener todas las direcciones
 */
export async function getAddresses(): Promise<Direccion[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener las direcciones");
  return await res.json();
}

/**
 * Obtener una dirección por ID
 */
export async function getAddress(id: number): Promise<Direccion> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Dirección no encontrada");
  return await res.json();
}

/**
 * Crear una nueva dirección
 */
export async function createAddress(address: Omit<Direccion, 'id'>): Promise<Direccion> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error("Error al crear la dirección");
  return await res.json();
}

/**
 * Actualizar una dirección
 */
export async function updateAddress(id: number, address: Partial<Direccion>): Promise<Direccion> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error("Error al actualizar la dirección");
  return await res.json();
}

/**
 * Eliminar una dirección
 */
export async function deleteAddress(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("Error al eliminar la dirección");
}
