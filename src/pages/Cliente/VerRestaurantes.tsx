import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Models
import Restaurante from "../../models/Restaurante";

//Components
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";
import CardRestaurante from "../../components/CardRestaurante";

//Services
import { getRestaurante } from "../../services/RestauranteService";

const VerRestaurantes: React.FC = () => {
    //Variables reactivas 
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);

    //Variables
    const navigate = useNavigate()
    
    //Código adicional (Aux, Complementos para componentes, Etc)
    const navOptions = [
        {
        nombre: 'Gestionar Cliente',
        icono: 'persona-icon',
        ruta: '/gestionar-cliente',
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

    //
    useEffect(() => {
        obtenerInformacion();
    }, []);

    const obtenerInformacion = async () => {
        try {
            setInitialLoading(true);
            const respuesta = await getRestaurante();
            setRestaurantes(respuesta);
        } catch (error) {
            console.error("Error al obtener restaurantes:", error);
        } finally {
            setInitialLoading(false);
        }
    };

    return(
        <div className="w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative">
            {/* Header */}
            <div className="flex w-full justify-between">
                <div>
                    <HeaderGeneral
                    rutaAtras="/cliente"
                    />
                </div>
                <div>
                    <h5 className="font-bold text-right text-base md:text-lg lg:text-xl">Manizales,</h5>
                    <h5 className="font-bold text-lg md:text-2xl lg:text-3xl">Direccion del cliente</h5>
                </div>
            </div>

            <div className="w-full mt-6">
                <div className="w-full h-px bg-azul-principal my-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
                {initialLoading? (
                    <div className="flex justify-center items-center h-64">
                        <p className="font-koulen text-2xl">Cargando restaurantes...</p>
                    </div>
                ) : restaurantes.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p>No hay restaurantes registrados</p>
                    </div>
                ) : restaurantes.map((restaurante) => (
                    <CardRestaurante
                    nombre={restaurante.name}
                    rutaImagen="/src/images/imagen-plato-generica.png"
                    onClick={() => navigate(`/ver-info-restaurante/${restaurante.id}`)}
                    />
                ))}
            </div>

            <NavMovil opciones={navOptions}></NavMovil>
        </div>
    );
};

export default VerRestaurantes;