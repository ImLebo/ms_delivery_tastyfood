import React from "react";
import { useState, useEffect } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Repartidor from "../../models/Repartidor";
import { FormField } from "../../models/CamposFormulario";

import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { getRepartidores, createRepartidor, updateRepartidor, deleteRepartidor } from "../../services/RepartidorService";

//Alerta
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


const GestionarRepartidor: React.FC = () => {

    //Variables reactivas

    const [initialLoading, setInitialLoading] = useState(true);
    const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
    const [tituloModal, setTituloModal] =  useState<string>();
    
    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();


    //Código adicional (Aux, Complementos para componentes, Etc)

    const InfoSinNav = [
        {
            icono: 'gestionar-repartidor-icon',
            nombre: 'Gestionar Repartidor'
        }
    ]


    const camposRepartidor: FormField[] = [
        {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre',
        required: true,
        },
        {
        name: 'license_number',
        label: 'N-Licencia',
        type: 'text',
        placeholder: 'Ingrese el número de licencia',
        required: true,
        },
        {
        name: 'phone',
        label: 'Teléfono',
        type: 'text',
        placeholder: 'Ingrese el teléfono',
        },
        {
        name: 'email',
        label: 'Correo',
        type: 'email',
        placeholder: 'Ingrese el correo electrónico',
        },
        {
        name: 'status',
        label: 'Estado',
        type: 'select',
        options: [
            { value: 'available', label: 'Activo' },
            { value: 'unavailable', label: 'Inactivo' },
        ],
        required: true,
        },
    ]

    const presionarEditar = (repartidor: Repartidor) => {
        setTituloModal('Editar Repartidor'); 
        openModal(repartidor);
    }

    const presionarCrear = () => {
        setTituloModal('Crear Repartidor');
        openModal(); 
    }

    const enviarFormulario = async (data: any) => {
        try {
            if (initialData.id) {
            const repartidorActualizado = await updateRepartidor(initialData.id, data);
            setRepartidores(repartidores.map(rep => 
                rep.id === initialData.id ? repartidorActualizado : rep
            ));
            } else {
            const respuesta = await createRepartidor(data);

            const nuevoRepartidor = respuesta; 
            console.log(nuevoRepartidor); 
            setRepartidores([...repartidores, nuevoRepartidor]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar repartidor:", error);
            alert("Ocurrió un error al guardar el repartidor");
        }
    };




    // Set de variables reactivas

    useEffect(() => {
        obtenerInformacion();
        setTituloModal(''); 
    }, []);

    const obtenerInformacion = async () => {
        try {
            setInitialLoading(true);
            const respuesta = await getRepartidores();
            setRepartidores(respuesta);
            } catch (error) {
                console.error("Error al obtener repartidores:", error);
            } finally {
                setInitialLoading(false);
            }
    };

    //Metodos

    const eliminarRepartidor = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este repartidor?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await deleteRepartidor(id);
                    setRepartidores(repartidores.filter(rep => rep.id !== id));
                } catch (err) {
                    alert("No se pudo eliminar el repartidor");
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
            rutaAtras="/repartidor" 
            titulo="gestion repartidor"
            />

        <div className="w-full mt-6">
            <div className="w-full h-px bg-azul-principal my-2"></div>
        </div>

        {initialLoading ? (
            <></>
        ): (
        <div className="w-full mt-1 flex items-center">
            <button onClick={() => presionarCrear()} className="font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-4 h-4 inline-block agregar-icon"></span>Agregar</button>
        </div>)}
        
            
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                    {initialLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="font-koulen text-2xl">Cargando repartidores...</p>
                        </div>) : repartidores.length === 0 ? (
                                <div className="flex justify-center items-center h-64">
                                    <p>No hay repartidores registrados</p>
                                </div>
                            ) : (
                            repartidores.map((repartidor) => (
                                <div key={repartidor.id}
                                className="flex flex-col rounded-md items-center 
                                justify-center text-center w-[80%] border-2 border-dotted
                                border-blue-900 p-3 md:p-8 md:w-[50%] relative">
                                    
                                        <div className="flex items-center justify-center">
                                            <div className="w-20  h-20 md:w-24 md:h-24 inline-block usuario-negro-icon"></div>
                                            {/* Implementar el eliminar */}
                                            <span onClick={()  =>  eliminarRepartidor(repartidor.id)} className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"></span>
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
                                            <button onClick={() => presionarEditar({
                                                id: repartidor.id,
                                                name: repartidor.name,
                                                license_number: repartidor.license_number,
                                                phone: repartidor.phone,
                                                email: repartidor.email, 
                                                status: repartidor.status
                                            })} className="flex items-center mt-4 gap-2 py-2 px-6 bg-azul-principal
                                            hover:bg-blue-950 text-xl rounded-lg text-center">
                                                <span className="w-8 h-8 md:w-9 md:h-9 inline-block editar-icon"></span> Editar 
                                            </button>
                                        </div>
                                </div>
                    )))}
                </div>
            </div>
        </div>

        <ModalCrearActualizar 
        title={tituloModal}
        fields={camposRepartidor}
        onSubmit={enviarFormulario}
        isOpen={isOpen}
        onClose={closeModal}
        initialData={initialData}
        ></ModalCrearActualizar>

        <div className="">
            <NavMovil informacion={InfoSinNav} />
        </div>
    </div>
    );
};

export default GestionarRepartidor;