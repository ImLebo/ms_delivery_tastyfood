export default interface Repartidor {
    id: number;
    name: string; 
    email: string; 
    phone: string; 
    license_number: string;
    status: string;
    created_at?: Date;
}