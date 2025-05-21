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

            </div>

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>
        </div>
    )
}

export default GestionarMenu;