import React from "react";
import { useState, useEffect } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Restaurante from "../../models/Restaurante";
import { FormField } from "../../models/CamposFormulario";
import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { getRestaurante, createRestaurante, updateRestaurante, deleteRestaurante } from "../../services/RestauranteService";

//Alerta
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const GestionarRestaurante: React.FC = () => {
    //Varibales reactivas
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [tituloModal, setTituloModal] =  useState<string>();

    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();
    
    //Código adicional (Aux, Complementos para componentes, Etc)
    const InfoSinNav = [
        {
            icono: 'gestionar-restaurante-icon',
            nombre: 'Gestionar Restaurante'
        }
    ]

    const camposRestaurante: FormField[] = [
        {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre',
        required: true,
        },
        {
        name: 'address',
        label: 'Dirección',
        type: 'text',
        placeholder: 'Ingrese la dirección del restaurante',
        required: true,            
        },
        {
        name: 'phone',
        label: 'Telefono',
        type: 'text',
        placeholder: 'Ingrese el telefono del restaurante',
        required: true,            
        },
        {
        name: 'email',
        label: 'Correo',
        type: 'text',
        placeholder: 'Ingrese el correo del restaurante',
        required: true,            
        }
    ]

    const presionarEditar = (producto: Restaurante) => {
        setTituloModal('Editar restaurante');
        openModal(producto);
    }

    const presionarCrear = () => {
        setTituloModal('Crear restaurante');
        openModal();
    }

    const enviarFormulario = async (data:any) => {
        try{
            if (initialData.id) {
                const productoActualizado = await updateRestaurante(initialData.id, data);
                setRestaurantes(restaurantes.map(res =>
                    res.id === initialData.id ? productoActualizado : res
                ))
            }else {
                const respuesta = await createRestaurante(data);

                const nuevoProducto = respuesta;
                console.log(nuevoProducto);
                setRestaurantes([...restaurantes, nuevoProducto]);
            }
        } catch (error) {
            console.log("Error al guardar el restaurante:", error);
            alert("Ocurrió un erro al guardar el restaurante");
        }
    }

    //Set de variables reactivas
    useEffect(() => {
        obtenerInformacion();
        setTituloModal('');
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

    //Metodos
    const eliminarRestaurante = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este restaurante?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await deleteRestaurante(id);
                    setRestaurantes(restaurantes.filter(res => res.id !== id));
                } catch (err) {
                    alert("No se pudo eliminar el restaurante");
                }
                }
            },
            {
                label: 'Cancelar',
            }
            ]
        });
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
                
                {initialLoading ? (
                    <></>
                ): (
                    <div className="w-full mt-1 flex items-center">
                        <button onClick={() => presionarCrear()} className="font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-4 h-4 inline-block agregar-icon"></span>Agregar</button>
                    </div>
                )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
                        {initialLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="font-koulen text-2xl">Cargando restaurantes...</p>
                            </div>
                        ) : restaurantes.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <p>No hay restaurantes registrados</p>
                            </div>
                        ) : (
                            restaurantes.map((restaurante) => (
                                <div key={restaurante.id} className={`w-full h-full max-h-[15rem] md:max-h-[15rem] mt-5 flex flex-col items-center justify-between border border-azul-principal rounded-lg`}>
                                    <div className="w-full h-[80%] overflow-hidden rounded-t-lg">
                                        <img
                                        src="/src/images/imagen-plato-generica.png"
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="w-full h-[60%] flex flex-row p-4">
                                        <div className=" flex flex-col justify-center pr-[3rem] md:pr-[3rem]">
                                            <p className="inline-block font-semibold text-lg text-left">Nombre: {restaurante.name || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Dirección: {restaurante.address || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Teléfono: {restaurante.phone || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Correo: {restaurante.email || '...Cargando'}</p>
                                        </div>

                                        <div className="w-[2px] bg-azul-principal mx-2"></div>

                                        <div className="w-5 md:w-5 flex flex-col justify-around items-center text-black text-base font-medium">
                                            <button onClick={() => presionarEditar ({
                                                id: restaurante.id,
                                                name: restaurante.name,
                                                address: restaurante.address,
                                                phone: restaurante.phone,
                                                email: restaurante.email
                                            })} 
                                            className="flex items-center">
                                                <span className="w-8 h-8 md:w-8 md:h-8 inline-block editar-icon"></span> 
                                            </button>
                                            <button className="flex items-center">
                                                <span onClick={() => eliminarRestaurante(restaurante.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block eliminar-icon"></span>
                                            </button>
                                        </div>                            
                                    </div>
                                </div>
                            )))}
                    </div>
            </div>
            
            <ModalCrearActualizar
            title={tituloModal}
            fields={camposRestaurante}
            onSubmit={enviarFormulario}
            isOpen={isOpen}
            onClose={closeModal}
            initialData={initialData}
            >
            </ModalCrearActualizar>
            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>
        </div>
    );
};

export default GestionarRestaurante;

