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

                        <div className="w-full h-[60%] flex flex-row p-4">
                            <div className="w-3/5 flex flex-col justify-center pr-[11rem] md:pr-[13rem]">
                                <p className="inline-block font-semibold text-lg text-left">Nombre:</p>
                                <p className="inline-block font-semibold text-lg text-left">Dirección:</p>
                                <p className="inline-block font-semibold text-lg text-left">Teléfono:</p>
                                <p className="inline-block font-semibold text-lg text-left">Correo:</p>
                            </div>

                            <div className="w-[1px] bg-azul-principal mx-2"></div>

                            <div className="w-2/5 flex flex-col justify-around items-center text-black text-base font-medium">
                                <button className="flex items-center">
                                <span className="w-8 h-8 md:w-8 md:h-8 inline-block editar-icon"></span> 
                                </button>
                                <button className="flex items-center">
                                <span className="w-8 h-8 md:w-9 md:h-9 inline-block eliminar-icon"></span>
                                </button>
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

