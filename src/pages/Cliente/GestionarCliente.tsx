import React from "react";
import { useEffect, useState } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import { Cliente } from "../../models/Cliente";
import { FormField } from "../../models/CamposFormulario";
import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { getCliente, createCliente, updateCliente, deleteCliente } from "../../services/ClienteService";

//Alerta
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';


const GestionarCliente: React.FC = () => {
    //Variables reactivas
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [tituloModal, setTituloModal] = useState<string>();

    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();

    //Código adicional (Aux, Complementos para componentes, Etc)
    const navOptions = [
        {
        nombre: 'Ver Restaurantes',
        icono: 'gestionar-restaurante-icon',
        ruta: '/ver-restaurantes',
        },
        {
        nombre: 'Cuenta',
        icono: 'usuario-icon',
        ruta: '/a',
        }
    ];

    const camposCliente: FormField[] = [
        {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre',
        required: true,
        },
        {
        name: 'email',
        label: 'Correo',
        type: 'text',
        placeholder: 'Ingrese una descripción del producto',
        required: true,            
        },
        {
        name: 'phone',
        label: 'Telefono',
        type: 'text',
        placeholder: 'Ingrese el precio del producto',
        required: true,            
        },
    ]

    const presionarEditar = (cliente: Cliente) => {
        setTituloModal('Editar cliente');
        openModal(cliente);
    }

    const presionarCrear = () => {
        setTituloModal('Crear cliente');
        openModal();
    }

    const enviarFormulario = async (data:any) => {
        try{
            if (initialData.id) {
                const clienteActualizado = await updateCliente(initialData.id, data);
                setClientes(clientes.map(clie =>
                    clie.id === initialData.id ? clienteActualizado : clie
                ))
            }else {
                const respuesta = await createCliente(data);

                const nuevoCliente = respuesta;
                console.log(nuevoCliente);
                setClientes([...clientes, nuevoCliente]);
            }
        } catch (error) {
            console.log("Error al guardar cliente:", error);
            alert("Ocurrió un erro al guardar el cliente");
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
            const respuesta = await getCliente();
            setClientes(respuesta);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        } finally {
            setInitialLoading(false);
        }
    };

    //Metodos
    const eliminarCliente = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este cliente?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await deleteCliente(id);
                    setClientes(clientes.filter(clie => clie.id !== id));
                } catch (err) {
                    alert("No se pudo eliminar el cliente");
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
            rutaAtras="/cliente" 
            titulo="Gestion cliente"
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

                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                            {initialLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <p className="font-koulen text-2xl">Cargando clientes...</p>
                                </div>
                            ) : clientes.length === 0 ?(
                                <div className="flex justify-center items-center h-64">
                                    <p>No hay clientes registrados</p>
                                </div>
                            ) : (
                                clientes.map((cliente) => (
                                    <div key={cliente.id} className="w-full max-w-sm border-2 border-azul-principal rounded-lg p-4 mt-5 md:">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20  usuario-negro-icon"></div>

                                            <div className="flex flex-col text-black text-base font-semibold">
                                                <p className="inline-block font-semibold text-lg text-left">Nombre: {cliente.name || '...Cargando'}</p>
                                                <p className="inline-block font-semibold text-lg text-left">Correo: {cliente.email || '...Cargando'}</p>
                                                <p className="inline-block font-semibold text-lg text-left">Telefono: {cliente.phone || '...Cargando'}</p>
                                            </div>
                                        </div>


                                        <div className="border-t-2 border-dotted border-azul-principal my-4"></div>

                                        <div className="flex justify-around items-center text-black text-lg font-medium">
                                            <button onClick={() => presionarEditar ({
                                                id: cliente.id,
                                                name: cliente.name,
                                                email: cliente.email,
                                                phone: cliente.phone,
                                            })} 
                                            className="flex items-center gap-1">
                                                <span className="w-6 h-6 md:w-8 md:h-8 inline-block editar-icon"></span> Editar 
                                            </button>
                                            <button className="flex items-center gap-1">
                                                <span onClick={() => eliminarCliente(cliente.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block  eliminar-icon"></span> Eliminar
                                            </button>
                                        </div>
                                    </div>
                            )))}
                    </div>
                </div>
        </div>

        <ModalCrearActualizar
        title={tituloModal}
        fields={camposCliente}
        onSubmit={enviarFormulario}
        isOpen={isOpen}
        onClose={closeModal}
        initialData={initialData}
        >
        </ModalCrearActualizar>

        <div className="">
            <NavMovil opciones={navOptions} />
        </div>
    </div>
    );
};

export default GestionarCliente;
