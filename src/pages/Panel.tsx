import React from "react";
import Boton from "../components/Panel/Boton"; 

const Panel: React.FC = () => {

    const Botones: Array<Object> = [
        {
            nombre: 'Repartidor',
            ruta: '/repartidor',
            icono: 'moto-icon'
        },
        {
            nombre: 'Restaurante',
            ruta: '/restaurante',
            icono: 'restaurante-icon'
        },
        {
            nombre: 'Cliente',
            ruta: '/cliente',
            icono: 'cliente-icon'
        },
        {
            nombre: 'Estadisticas',
            ruta: '/estadisticas',
            icono: 'estadisticas-icon'
        },

    ]
    return(
            <div className="w-full h-screen bg-inicio-pc flex">
                <div className="w-full flex flex-col items-center justify-center gap-12 md:justify-start md:mt-32">
                    <div className="logo-inicio w-28 h-28 img-logo md:w-44 md:h-44"></div>
                        <h1 className="font-pixel text-white text-[2.5rem] text-shadow-md">TastyFood</h1>
                    <div className="w-52 h-14 flex flex-col gap-6">
                    { Botones.map((boton: any) => (
                        <Boton nombre={boton.nombre} ruta={boton.ruta} icono={boton.icono}></Boton>
                    ))}
                    </div>
                </div>
            </div>
    );
};

export default Panel;