import React from "react";

import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

const GestionarMenu: React.FC = () => {
    //Código adicional (Aux, Complementos para componentes, Etc)
    const InfoSinNav = [
        {
            icono: 'gestionar-menu-icon',
            nombre: 'Gestionar Menu'
        }
    ]

    return(
        <div className="w-full min-h-screen bg-cliente flex flex-col relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/restaurante"
                titulo="gestion menu"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="max-w-sm p-3 bg-pastelCyan rounded-xl shadow-md border border-gray-200 relative">
                        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
                            <span className="w-8 h-8 md:w-9 md:h-9 inline-block cancel-icon"></span>
                        </button>

                        <button className="top-3 right-3 text-gray-700 hover:text-cyan-500 text-xl">
                            <span className="w-8 h-8 md:w-9 md:h-9 inline-block editar-icon"></span>
                        </button>

                        {/* Imagen */}
                        <div className="w-28 h-28 overflow-hidden rounded-full mx-auto mb-4">
                            <img
                            src="/src/images/imagen-plato-generica-2.png"
                            alt="Plato de pasta"
                            className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="w-full h-[60%] flex flex-row p-4">
                            <div className=" flex flex-col justify-center pr-[5rem] md:pr-[5rem]">
                                <p className="inline-block font-semibold text-lg text-left">Nombre: </p>
                                <p className="inline-block font-semibold text-lg text-left">Dirección: </p>
                                <p className="inline-block font-semibold text-lg text-left">Teléfono: </p>
                                <p className="inline-block font-semibold text-lg text-left">Correo: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/*div final*/}

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>
        </div>
    )
}

export default GestionarMenu;