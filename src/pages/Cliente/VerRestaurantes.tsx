import React from "react";
import CardRestaurante from "../../components/CardRestaurante";

const VerRestaurantes: React.FC = () => {

    //DEBE RECIBIR UN ARRAY DE TODOS LOS RESTAURANTES


    return(
            <div className="w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative">
            {/* Header */}
                <div className="flex w-full justify-between">
                    <span className="w-12 h-12 inline-block back-icon"></span>
                    <div>
                    <h5 className="font-bold text-right text-base md:text-lg lg:text-xl">Manizales,</h5>
                    <h3 className="font-bold text-lg md:text-2xl lg:text-3xl">Direccion del cliente</h3>
                    </div>
                </div>

            {/* Sección RESTAURANTES */}
                <div className="w-full mt-6">
                    <div className="flex gap-3 items-center">
                    <h2 className="font-koulen text-xl md:text-2xl lg:text-3xl">RESTAURANTES</h2>
                    <span className="w-6 h-6 inline-block img-logo"></span>
                    </div>
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

            {/* Contenedor de Cards con scroll */}
            <div className="flex-1 overflow-y-auto pb-6"> {/* Añadido pb-6 para padding bottom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                    <CardRestaurante 
                    nombre="Pastinni" 
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    />
                </div>
            </div>

            {/* Footer o espacio inferior */}
            <div className="h-16 bg-cliente w-full"></div> {/* Ajusta según tu diseño */}
            </div>
    );
};

export default VerRestaurantes;