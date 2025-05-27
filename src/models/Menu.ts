import Restaurante from "./Restaurante";
import Producto from "./Producto";

export default interface Menu {
    id: number;
    restaurant_id: number; 
    product_id: number; 
    price: string; 
    availability: boolean;
    created_at?: Date;

    restaurant?: Restaurante
    product?: Producto
}