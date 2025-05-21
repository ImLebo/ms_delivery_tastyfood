import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Motocicleta from "../../models/Motocicleta";
import { FormField } from "../../models/CamposFormulario";

import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { crearMotocicleta, obtenerMotocicletas, actualizarMotocicleta, eliminarMotocicleta } from "../../services/MotocicletaService";

//Alerta
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


const GestionarMoto: React.FC = () => {

    //Variables reactivas


    const [initialLoading, setInitialLoading] = useState(true);
    const [motocicletas, setMoto] = useState<Motocicleta[]>([]);
    const [tituloModal, setTituloModal] =  useState<string>();
    
    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();
    const navigate = useNavigate();

    const presionarClick = () => {
        navigate('/gestionar-novedad');
    }

    //Código adicional (Aux, Complementos para componentes, Etc)

    const InfoSinNav = [
        {
            icono: 'moto-icon',
            nombre: 'Gestionar Motos'
        }
    ]


    const camposMotocicleta: FormField[] = [
    {
        name: 'license_plate',
        label: 'Placa',
        type: 'text',
        placeholder: 'Ingrese la placa de la motocicleta',
        required: true
    },
    {
        name: 'brand',
        label: 'Marca',
        type: 'text',
        placeholder: 'Ingrese la marca (Ej: Honda, Yamaha)',
        required: true
    },
    {
        name: 'year',
        label: 'Año',
        type: 'number',
        placeholder: 'Ingrese el año de fabricación',
        required: true,
    },
    {
        name: 'status',
        label: 'Estado',
        type: 'select',
        required: true,
        options: [
            { value: 'available', label: 'Disponible' },
            { value: 'in_use', label: 'En uso' },
            { value: 'maintenance', label: 'En mantenimiento' }
        ]
    }
];

    const presionarEditar = (motocicleta: Motocicleta) => {
        setTituloModal('Editar Motocicleta'); 
        openModal(motocicleta);
    }

    const presionarCrear = () => {
        setTituloModal('Crear Motocicleta');
        openModal(); 
    }

    const enviarFormulario = async (data: any) => {
        try {
            if (initialData.id) {
            const motoActualizada = await actualizarMotocicleta(initialData.id, data);
            setMoto(motocicletas.map(moto => 
                moto.id === initialData.id ? motoActualizada : moto
            ));
            } else {
            const respuesta = await crearMotocicleta(data);

            const nuevaMoto = respuesta; 
            setMoto([...motocicletas, nuevaMoto]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar la moto:", error);
            alert("Ocurrió un error al guardar la moto");
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
            const respuesta = await obtenerMotocicletas();
            setMoto(respuesta);
            } catch (error) {
                console.error("Error al obtener las motos:", error);
            } finally {
                setInitialLoading(false);
            }
    };

    //Metodos

    const eliminarMoto = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar esta moto?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await eliminarMotocicleta(id);
                    setMoto(motocicletas.filter(moto => moto.id !== id));
                } catch (err) {
                    alert("No se pudo eliminar la moto");
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
            titulo="gestion motos"
            />

        <div className="w-full mt-6">
            <div className="w-full h-px bg-azul-principal my-2"></div>
        </div>

        {initialLoading ? (
            <></>
        ): (
        <div className="flex flex-row gap-2">
            <div className="w-full mt-1 flex items-center">
                <button onClick={() => presionarCrear()} className="flex items-center content-center justify-center font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-6 h-6 mr-1 inline-block agregar-icon"></span>Agregar</button>
            </div>

            <div className="w-full mt-1 flex items-center">
                <button onClick={() => presionarClick()} className="flex items-center content-center justify-center font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-6 h-6 mr-1 inline-block novedad-icon"></span>Novedad</button>
            </div>
        </div>
    )}
        
            
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                    {initialLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="font-koulen text-2xl">Cargando Motocicletas...</p>
                        </div>) : motocicletas.length === 0 ? (
                                <div className="flex justify-center items-center h-64">
                                    <p>No hay motos registradas.</p>
                                </div>
                            ) : (
                            motocicletas.map((moto) => (
                                <div key={moto.id}
                                className="flex flex-col rounded-md items-center 
                                justify-center text-center w-[80%] border-2 border-dotted
                                border-blue-900 p-3 md:p-8 md:w-[50%] relative">
                                    
                                        <div className="flex items-center justify-center">
                                            <div className="w-20  h-20 md:w-24 md:h-24 inline-block moto-icon border p-2 border-blue-900 rounded-full"></div>
                                            {/* Implementar el eliminar */}
                                            <span onClick={()  => eliminarMoto(moto.id)} className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"></span>
                                        </div>
                                            {/* Informacion del Moto */}
                                        <div className="flex flex-col w-full p-1 gap-1">
                                            <p className="inline-block font-semibold text-lg text-left">Matricula: { moto.license_plate || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Marca: { moto.brand || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Año: { moto.year || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Estado: { moto.status == 'available' ? 'Disponible' : moto.status == 'in_use' ? 'En uso' : moto.status == 'maintenance' ? 'Mantenimiento' : '...Cargando' }</p>
                                        </div>

                                        <div className="w-full mt-1">
                                            <div className="w-full h-1 rounded-sm bg-azul-principal my-2"></div>
                                        </div>

                                        <div>
                                            {/* Aqui debe ir un editar */}
                                            <button onClick={() => presionarEditar({
                                                id: moto.id,
                                                license_plate: moto.license_plate,
                                                year: moto.year,
                                                status: moto.status,
                                                brand: moto.brand
                                            })}  className="flex items-center mt-4 gap-2 py-2 px-6 bg-azul-principal
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
        fields={camposMotocicleta}
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

export default GestionarMoto;