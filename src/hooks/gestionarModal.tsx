import { useState } from "react";

export function gestionarModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [initialData, setInitialData] = useState<Record<string, any>>({});

    const openModal = (data?: Record<string, any>) => {
        if (data) setInitialData(data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInitialData({});
    };

    return { isOpen, initialData, openModal, closeModal };
}