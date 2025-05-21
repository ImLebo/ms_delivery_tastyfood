export default interface Producto {
    id: number;
    name: string; 
    description: string; 
    price: string; 
    category: string;
    created_at?: Date;
}