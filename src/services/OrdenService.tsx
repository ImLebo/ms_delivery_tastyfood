import Orden from "../models/Orden";

const API_URL = import.meta.env.VITE_API_URL + '/orders';

/**
 * Obtener todas las órdenes
 */
export async function getOrders(): Promise<Orden[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener las órdenes");
  return await res.json();
}

/**
 * Obtener una orden por ID
 */
export async function getOrder(id: number): Promise<Orden> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Orden no encontrada");
  return await res.json();
}

/**
 * Crear una nueva orden
 */
export async function createOrder(order: Omit<Orden, "id">): Promise<Orden> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Error al crear la orden");
  return await res.json();
}

/**
 * Actualizar una orden
 */
export async function updateOrder(id: number, order: Partial<Orden>): Promise<Orden> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Error al actualizar la orden");
  return await res.json();
}

/**
 * Eliminar una orden
 */
export async function deleteOrder(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la orden");
}
