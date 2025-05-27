import { Cliente } from "./Cliente";
import Menu from "./Menu";
import Motocicleta from "./Motocicleta";

export default interface Orden {
    id: number
    customer_id: number;
    menu_id: number;
    motorcycle_id: number;
    quantity: number;
    total_price: number;
    status: string;
    created_at?: string;

    // Relaciones (opcionales para cuando se incluyen en las respuestas)
    customer?: Cliente;
    menu?: Menu;
    motorcycle?: Motocicleta;
}