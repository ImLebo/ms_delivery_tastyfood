import { Foto } from "./Foto";

export default interface Novedad {
    id?: number;
    motorcycle_id: number;
    description: string;
    issue_type: string;
    date_reported: string;
    status: string;
    created_at?: string;
    photos?: Foto[];
}

