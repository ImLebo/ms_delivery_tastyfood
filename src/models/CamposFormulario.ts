type InputType = string & ('text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'datetime-local');

export interface FormField {
    name: string;
    label: string;
    type: InputType;
    placeholder?: string;
    required?: boolean;
    options?: { value: string | number; label: string }[]; // Solo para tipo 'select'
    defaultValue?: string | number;
}