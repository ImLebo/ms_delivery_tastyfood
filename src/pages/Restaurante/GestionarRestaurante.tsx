import React from "react";
import { useState, useEffect } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Restaurante from "../../models/Restaurante";

//Service
import { getRestaurante, createRestaurante, updateRestaurante, deleteRestaurante } from "../../services/RestauranteService";

const GestionarRestaurante: React.FC = () => {
    //Varibales reactivas
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

    //Código adicional (Aux, Complementos para componentes, Etc)
    const InfoSinNav = [
        {
            icono: 'gestionar-restaurante-icon',
            nombre: 'Gestionar Restaurante'
        }
    ]

    //Set de variables reactivas
    useEffect(() => {
        obtenerInformacion()
    })

    const obtenerInformacion = async () => {
        const respuesta = await getRestaurante();
        setRestaurantes(respuesta)
    }

    //Metodos
    const eliminarRestaurante = async (id: number) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este repartidor?")) {
            return;
        }
        
        try {
            await deleteRestaurante(id);
            setRestaurantes(restaurantes.filter(restaurante => restaurante.id !== id));
        } catch (error) {
            alert("No se pudo eliminar el restaurante");
            console.error(error);
        }
    };

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
                    {restaurantes.map((restaurante) => (
                        <div key={restaurante.id} className={`w-full h-full max-h-[15rem] md:max-h-[15rem] mt-5 flex flex-col items-center justify-between border border-azul-principal rounded-lg`}>
                            <div className="w-full h-[80%] overflow-hidden rounded-t-lg">
                                <img
                                src="/src/images/imagen-plato-generica.png"
                                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="w-full h-[60%] flex flex-row p-4">
                                <div className=" flex flex-col justify-center pr-[6rem] md:pr-[6rem]">
                                    <p className="inline-block font-semibold text-lg text-left">Nombre: {restaurante.name || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Dirección: {restaurante.address || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Teléfono: {restaurante.phone || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Correo: {restaurante.email || '...Cargando'}</p>
                                </div>

                                <div className="w-[2px] bg-azul-principal mx-3"></div>

                                <div className="w-5 md:w-5 flex flex-col justify-around items-center text-black text-base font-medium">
                                    <button className="flex items-center">
                                    <span className="w-8 h-8 md:w-8 md:h-8 inline-block editar-icon"></span> 
                                    </button>
                                    <button className="flex items-center">
                                    <span onClick={() => eliminarRestaurante(restaurante.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block eliminar-icon"></span>
                                    </button>
                                </div>                            
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>
        </div>
    );
};

export default GestionarRestaurante;

