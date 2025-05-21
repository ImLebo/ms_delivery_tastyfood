import React, { useState, useEffect } from 'react';
import { FormField } from '../models/CamposFormulario';
// Tipos para TypeScript


interface ModalFormProps {
    title: string | undefined;
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void;
    submitButtonText?: string;
    initialData?: Record<string, any>;
    isOpen: boolean;
    onClose: () => void;
    subtitle?: string;
}

const ModalCrearActualizar: React.FC<ModalFormProps> = ({
    title,
    subtitle,
    fields,
    onSubmit,
    submitButtonText = 'ENVIAR',
    initialData = {},
    isOpen,
    onClose,
    }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Efecto para inicializar/resetear el formulario cuando cambia isOpen o initialData
    useEffect(() => {
        if (isOpen) {
        const initialFormData: Record<string, any> = {};
        fields.forEach((field) => {
            initialFormData[field.name] = initialData[field.name] || field.defaultValue || '';
        });
        setFormData(initialFormData);
        }
    }, [isOpen, initialData, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); // Cierra el modal después de enviar (opcional)
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Encabezado del modal */}
            <div className="border-b px-6 py-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <h2 className="text-lg text-gray-600">{subtitle}</h2>}
            </div>
            
            {/* Cuerpo del modal */}
            <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                    {field.label}:
                    </label>
                    
                    {field.type === 'select' ? (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={field.required}
                    >
                        <option value="">Seleccione...</option>
                        {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    ) : field.type === 'textarea' ? (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={field.required}
                        rows={3}
                    />
                    ) : (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required={field.required}
                    />
                    )}
                </div>
                ))}

                <div className="border-t border-gray-300 my-6"></div>

                {/* Pie del modal con botones */}
                <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-azul-principal text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {submitButtonText}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
    };

export default ModalCrearActualizar;