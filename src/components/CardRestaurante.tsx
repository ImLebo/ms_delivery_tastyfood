import React from 'react';

interface CardRestauranteProps {
    nombre: string;
    rutaImagen: string;
    idDireccionamiento?: Number; 
    onClick?: () => void;
}

const CardRestaurante: React.FC<CardRestauranteProps> = ({
    nombre,
    rutaImagen,
    onClick,
    }) => {
    return (
        <div 
        onClick={onClick}
        className={`w-full h-full max-h-[9rem] md:max-h-[10rem] mt-5 flex flex-col items-center justify-between border border-azul-principal rounded-lg`}>
            <div className="w-full h-[80%] overflow-hidden rounded-t-lg">
                <img 
                src={rutaImagen} 
                alt={`Imagen de ${nombre}`}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="w-full h-[20%] flex items-center justify-center p-4 ">
                <h2 className="text-xl font-bold w-full">
                {nombre}
                </h2>
            </div>
        </div>
    );
};

export default CardRestaurante;