import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Services
import { getRestauranteById } from "../../services/RestauranteService";

//Models
import Restaurante from "../../models/Restaurante";

const VerInfoRestaurante: React.FC = () => {
    //Variables
    const { id } = useParams();
    
    //Variables reactivas  
    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);

    //Código adicional (Aux, Complementos para componentes, Etc)
    const navOptions = [
        {
        nombre: 'Ver Restaurantes',
        icono: 'usuario-negro-icon',
        ruta: '/ver-restaurantes',
        },
        {
        nombre: 'Carrito',
        icono: 'carrito-icon',
        ruta: '/'
        },
        {
        nombre: 'Cuenta',
        icono: 'usuario-icon',
        ruta: '/a',
        }
    ];

    useEffect(() => {
        obtenerInformacion(Number(id));
    }, [id]);

    const obtenerInformacion = async (ideRestaurante: number) => {
        try {
            setInitialLoading(true);
            const respuesta = await getRestauranteById(ideRestaurante);
            setRestaurante(respuesta);
        } catch (error) {
            console.error("Error al obtener restaurantes:", error);
        } finally {
            setInitialLoading(false);
        }
    };


    return (
        <div className="w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/ver-restaurantes"
                titulo="TastyFood"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                <div className="pt-10 flex items-center justify-center bg-cover">
                    <div className="bg-cyan-700 bg-opacity-80 rounded-2xl p-8 w-96 text-white shadow-lg backdrop-blur-md">
                        <h1 className="text-black text-2xl font-bold mb-6 tracking-widest">
                            {restaurante?.name}
                        </h1>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Dirección</label>
                            <p className="border-b border-white py-1">{restaurante?.address}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Teléfono</label>
                            <p className="border-b border-white py-1">{restaurante?.phone}</p>
                        </div>

                        <div>
                            <label className="block font-bold uppercase mb-1 text-sm">Correo</label>
                            <p className="border-b border-white py-1">{restaurante?.email}</p>
                        </div>
                    
                        <button
                        className="w-full mt-4 bg-white text-cyan-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                        onClick={() => console.log('Ir al menú')}
                        >
                            Ver Menú
                        </button>
                    </div>
                </div>
            </div>
            <NavMovil opciones={navOptions}></NavMovil>
        </div>
    )
}

export default VerInfoRestaurante;