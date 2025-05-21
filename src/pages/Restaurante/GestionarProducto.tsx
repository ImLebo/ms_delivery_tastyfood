import React from "react";

import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

const GestionarProducto: React.FC = () => {
    const InfoSinNav = [
        {
            icono: 'gestionar-producto-icon',
            nombre: 'Gestionar Producto'
        }
    ]

    return( 
        <div className="w-full min-h-screen bg-cliente flex flex-col relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/restaurante"
                titulo="gestion producto"
                />
                
                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                <div className="w-full max-w-sm border-2 border-azul-principal rounded-lg p-4 mt-5">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20  cesta-compra-icon"></div>

                        <div className="flex flex-col text-black text-base font-semibold">
                            <p className="inline-block font-semibold text-lg text-left">Nombre:</p>
                            <p className="inline-block font-semibold text-lg text-left">Descripción:</p>
                            <p className="inline-block font-semibold text-lg text-left">Precio:</p>
                            <p className="inline-block font-semibold text-lg text-left">Categoria:</p>
                        </div>
                    </div>


                    <div className="border-t-2 border-dotted border-azul-principal my-4"></div>

                    <div className="flex justify-around items-center text-black text-lg font-medium">
                        <button className="flex items-center gap-1 hover:text-azul-principal transition">
                        <span className="w-6 h-6 md:w-8 md:h-8 inline-block editar-icon"></span> Editar 
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-600 transition">
                        <span className="w-8 h-8 md:w-9 md:h-9 inline-block  eliminar-icon"></span> Eliminar
                        </button>
                    </div>
                </div>

            </div>
            

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>  
        </div>      
    );
}

export default GestionarProducto;