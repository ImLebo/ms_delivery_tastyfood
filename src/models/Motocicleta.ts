export default interface Motocicleta {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
    created_at?: Date;
}