// src/services/clienteService.ts
import { Cliente } from "../models/Cliente";

const API_URL = import.meta.env.VITE_API_URL + '/customers';

/**
 * Obtener todos los clientes
 */
export async function getClientes(): Promise<Cliente[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener los clientes");
  return await res.json();
}

/**
 * Obtener un cliente por ID
 */
export async function getCliente(id: number): Promise<Cliente> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Cliente no encontrado");
  return await res.json();
}

/**
 * Crear un nuevo cliente
 */
export async function createCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al crear el cliente");
  return await res.json();
}

/**
 * Actualizar un cliente
 */
export async function updateCliente(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al actualizar el cliente");
  return await res.json();
}

/**
 * Eliminar un cliente
 */
export async function deleteCliente(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("Error al eliminar el cliente");
}
