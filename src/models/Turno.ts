import Motocicleta from "./Motocicleta";
import Repartidor from "./Repartidor";

export default interface Turno {
    id: number;
    driver_id: number;
    motorcycle_id: number;
    start_time: string;
    end_time?: string;
    status: string;
    created_at?: string;
    
    // Relaciones (opcionales para cuando se incluyen en las respuestas)
    driver?: Repartidor;
    motorcycle?: Motocicleta;
}