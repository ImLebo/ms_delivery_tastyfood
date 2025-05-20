import React from "react";
import { useState, useEffect } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Repartidor from "../../models/Repartidor";

//Service
import { getRepartidores, createRepartidor, updateRepartidor, deleteRepartidor } from "../../services/RepartidorService";


const GestionarRepartidor: React.FC = () => {

    //Variables reactivas

    const [repartidores, setRepartidores] = useState<Repartidor[]>([]);


    //Código adicional (Aux, Complementos para componentes, Etc)

    const InfoSinNav = [
        {
            icono: 'gestionar-repartidor-icon',
            nombre: 'Gestionar Repartidor'
        }
    ]

    // Set de variables reactivas

    useEffect(() => {
        obtenerInformacion(); 
    }, []);

    const obtenerInformacion = async () => {
        const respuesta = await getRepartidores();
        setRepartidores(respuesta);
    }

    //Metodos

    const eliminarRepartidor = async (id: number) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este repartidor?")) {
            return;
        }
        
        try {
            await deleteRepartidor(id);
            setRepartidores(repartidores.filter(repartidor => repartidor.id !== id));
        } catch (error) {
            alert("No se pudo eliminar el repartidor");
            console.error(error);
        }
    };



    return(
    <div className="w-full min-h-screen bg-cliente flex flex-col relative">
        <div className="flex-1 flex flex-col py-3 px-6 pb-20">

            <HeaderGeneral 
            rutaAtras="/repartidor" 
            titulo="gestion repartidor"
            />

            <div className="w-full mt-6">
                <div className="w-full h-px bg-azul-principal my-2"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                    {repartidores.map((repartidor) => (
                        <div key={repartidor.id}
                        className="flex flex-col rounded-md items-center 
                        justify-center text-center w-[80%] border-2 border-dotted
                        border-blue-900 p-3 md:p-8 md:w-[50%] relative">
                            
                                <div className="flex items-center justify-center">
                                    <div className="w-20  h-20 md:w-24 md:h-24 inline-block usuario-negro-icon"></div>
                                    {/* Implementar el eliminar */}
                                    <span onClick={() => eliminarRepartidor(repartidor.id)} className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"></span>
                                </div>
                                    {/* Informacion del repartidor */}
                                <div className="flex flex-col w-full p-1 gap-1">
                                    <p className="inline-block font-semibold text-lg text-left">Nombre: {repartidor.name || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">N-licencia: {repartidor.license_number || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Telefono: {repartidor.phone || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Correo: {repartidor.email || '...Cargando'}</p>
                                    <p className="inline-block font-semibold text-lg text-left">Estado: {repartidor.status || '...Cargando'}</p>
                                </div>

                                <div className="w-full mt-1">
                                    <div className="w-full h-1 rounded-sm bg-azul-principal my-2"></div>
                                </div>

                                <div>
                                    <button className="flex items-center mt-4 gap-2 py-2 px-6 bg-azul-principal
                                    hover:bg-blue-950 text-xl rounded-lg text-center">
                                        <span className="w-8 h-8 md:w-9 md:h-9 inline-block editar-icon"></span> Editar 
                                    </button>
                                </div>

                            
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="">
            <NavMovil informacion={InfoSinNav} />
        </div>
    </div>
    );
};

export default GestionarRepartidor;