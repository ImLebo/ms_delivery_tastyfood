import Producto from "../models/Producto";





const API_URL = import.meta.env.VITE_API_URL + '/products';

/**
 * Obtener todos los productos
 */
export async function getProducts(): Promise<Producto[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener los productos");
  return await res.json();
}

/**
 * Obtener un producto por ID
 */
export async function getProduct(id: number): Promise<Producto> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
}

/**
 * Crear un nuevo producto
 */
export async function createProduct(product: Omit<Producto, "id">): Promise<Producto> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear el producto");
  return await res.json();
}

/**
 * Actualizar un producto
 */
export async function updateProduct(id: number, product: Partial<Producto>): Promise<Producto> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al actualizar el producto");
  return await res.json();
}

/**
 * Eliminar un producto
 */
export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el producto");
}
