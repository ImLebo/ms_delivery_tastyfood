import React from "react";

import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

const GestionarRestaurante: React.FC = () => {
    const InfoSinNav = [
        {
            icono: 'gestionar-restaurante-icon',
            nombre: 'Gestionar Restaurante'
        }
    ]

    return(
        <div className="w-full min-h-screen bg-cliente flex flex-col relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/restaurante"
                titulo="gestion restaurante"
                />
                
                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
                    <div className={`w-full h-full max-h-[15rem] md:max-h-[15rem] mt-5 flex flex-col items-center justify-between border border-azul-principal rounded-lg`}>
                        <div className="w-full h-[80%] overflow-hidden rounded-t-lg">
                            <img
                            src="/src/images/imagen-plato-generica.png"
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="w-full h-[60%] flex flex-col md:flex-row">
                            <div className="flex-1 flex flex-col relative after:content-[''] after:absolute after:top-2 after:right-12 after:w-1 after:h-32 after:bg-sky-500">
                                <div className="w-full h-[5%] flex items-center justify-center p-4 ">
                                    <h2 className="text-xl font-bold w-full">
                                    Nombre:
                                    </h2>
                                </div>
                                <div className="w-full h-[5%] flex items-center justify-center p-4 ">
                                    <h2 className="text-xl font-bold w-full">
                                    Dirección:
                                    </h2>
                                </div>                        <div className="w-full h-[5%] flex items-center justify-center p-4 ">
                                    <h2 className="text-xl font-bold w-full">
                                    Telefono:
                                    </h2>
                                </div>
                                <div className="w-full h-[5%] flex items-center justify-center p-4 ">
                                    <h2 className="text-xl font-bold w-full">
                                    Correo:
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>
        </div>
    );
};

export default GestionarRestaurante;

