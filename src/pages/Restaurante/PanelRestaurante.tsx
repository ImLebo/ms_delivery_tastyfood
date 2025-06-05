import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

const PanelRestaurante: React.FC = () => {
    const navegar = useNavigate();

    const clickOpcionPanel = (ruta: string) => {
        navegar(ruta);
    }

    const navOptions = [
        {
        nombre: 'Inicio',
        icono: 'casa-icon',
        ruta: '/restaurante',
        },
        {
        nombre: 'Cuenta',
        icono: 'usuario-icon',
        ruta: '/a',
        }
    ];

    return(
    <div className="w-full min-h-screen bg-cliente flex flex-col relative">
        <div className="flex-1 flex flex-col py-3 px-6 pb-20">

            <HeaderGeneral 
            rutaAtras="/panel" 
            titulo="opciones"
            />

        <div className="w-full mt-6">
            <div className="w-full h-px bg-azul-principal my-2"></div>
        </div>
        
            
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="flex flex-col items-center justify-center gap-5 mt-5 md:mt-20 md:gap-20 w-full">
                    
                    <div 
                    className="flex flex-col rounded-md items-center justify-center text-center w-[60%] border-2 border-dotted border-blue-900 p-3 md:p-8 md:w-[30%] cursor-pointer" 
                    onClick={() => clickOpcionPanel('/gestionar-producto')}
                    >
                        <div className="w-16 h-16 md:w-11 md:h-11 inline-block gestionar-producto-icon"></div>
                        <h3>Gestionar Producto</h3>
                    </div>
                    <div 
                    className="flex flex-col rounded-md items-center justify-center text-center w-[60%] border-2 border-dotted border-blue-900 p-3 md:p-8 md:w-[30%] cursor-pointer" 
                    onClick={() => clickOpcionPanel('/gestionar-menu')}
                    >
                        <div className="w-16 h-16 md:w-11 md:h-11 inline-block gestionar-menu-icon"></div>
                        <h3>Gestionar Menú</h3>
                    </div>
                    <div 
                    className="flex flex-col rounded-md items-center justify-center text-center w-[60%] border-2 border-dotted border-blue-900 p-3 md:p-8 md:w-[30%] cursor-pointer" 
                    onClick={() => clickOpcionPanel('/gestionar-restaurante')}
                    >
                        <div className="w-16 h-16 md:w-11 md:h-11 inline-block gestionar-restaurante-icon"></div>
                        <h3>Gestionar Restaurantes</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="">
            <NavMovil opciones={navOptions} />
        </div>
    </div>
    );
};

export default PanelRestaurante;
