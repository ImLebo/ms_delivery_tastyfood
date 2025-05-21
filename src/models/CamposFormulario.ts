type InputType = string & ('text' | 'number' | 'email' | 'password' | 'select' | 'textarea');

export interface FormField {
    name: string;
    label: string;
    type: InputType;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // Solo para tipo 'select'
    defaultValue?: string | number;
}