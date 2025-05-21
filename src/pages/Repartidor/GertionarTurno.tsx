import React from "react";
import { useState, useEffect } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Motocicleta from "../../models/Motocicleta";
import Repartidor from "../../models/Repartidor";
import Turno from "../../models/Turno";
import { FormField } from "../../models/CamposFormulario";

import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { obtenerMotocicletas} from "../../services/MotocicletaService";
import { getRepartidores } from "../../services/RepartidorService";
import { obtenerTurnos, crearTurno, eliminarTurno, actualizarTurno } from "../../services/TurnoService";

//Alerta
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


const GestionarMoto: React.FC = () => {

    //Variables reactivas

    const [initialLoading, setInitialLoading] = useState(true);
    const [motocicletas, setMoto] = useState<Motocicleta[]>([]);
    const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [tituloModal, setTituloModal] =  useState<string>();
    
    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();


    //Código adicional (Aux, Complementos para componentes, Etc)

    const InfoSinNav = [
        {
            icono: 'moto-icon',
            nombre: 'Gestionar Turnos'
        }
    ]


    const camposTurno: FormField[] = [
        {   
            name: 'driver_id',
            label: 'ID del Conductor',
            type: 'select',
            required: true,
            options: repartidores.filter(repartidor => repartidor.status === 'available')
            .map(repartidor => ({
            value: repartidor.id,
            label: `${repartidor.name} - ${repartidor.license_number}`,
            }))
        },
        {
            name: 'motorcycle_id',
            label: 'ID de la Motocicleta',
            type: 'select',
            required: true,
            options: motocicletas.filter(moto => moto.status === 'available')
            .map(moto => ({
            value: moto.id,
            label: `${moto.brand} - ${moto.license_plate}`,
            }))
        },
        {
            name: 'start_time',
            label: 'Hora de inicio',
            type: 'datetime-local',
            required: true
        },
        {
            name: 'end_time',
            label: 'Hora de fin',
            type: 'datetime-local'
        },
        {
            name: 'status',
            label: 'Estado',
            type: 'select',
            options: [
                {value: 'active', label: 'Activo'},
                {value: 'completed', label: 'Completado'},
                {value: 'cancelled', label: 'Cancelado'}
            ],
            required: true
        }
    ];

    const presionarEditar = (turno: Turno) => {
        setTituloModal('Editar Motocicleta'); 
        openModal(turno);
    }

    const presionarCrear = () => {
        setTituloModal('Crear Turno');
        openModal(); 
    }

    const enviarFormulario = async (data: any) => {
        try {
            if (initialData.id) {
            const turnoActualizado = await actualizarTurno(initialData.id, data);
            setTurnos(turnos.map(turno => 
                turno.id === initialData.id ? turnoActualizado : turno
            ));
            } else {
            const respuesta = await crearTurno(data);

            const nuevoTurno = respuesta; 
            setTurnos([...turnos, nuevoTurno]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar el turno:", error);
            alert("Ocurrió un error al guardar el turno");
        }
    };




    // Set de variables reactivas

    useEffect(() => {
        obtenerInformacionPrincipal();
        obtenerInformacionComplementaria(); 
        setTituloModal(''); 
    }, []);

    const obtenerInformacionPrincipal = async () => {
        try {
            setInitialLoading(true);
            const respuesta = await obtenerTurnos();
            setTurnos(respuesta);
            } catch (error) {
                console.error("Error al obtener los turnos:", error);
            } finally {
                setInitialLoading(false);
            }
    };

    const obtenerInformacionComplementaria = async () => {
        try {
            const respuestaMotos = await obtenerMotocicletas();
            setMoto(respuestaMotos);

            const respuestaRepartidores = await getRepartidores();
            setRepartidores(respuestaRepartidores); 

            } catch (error) {
                console.error("Error al obtener los datos complementarios:", error);
            }
    };

    //Metodos

    const eliminarTurno = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este turno?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await eliminarTurno(id);
                    setTurnos(turnos.filter(turno => turno.id !== id));
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
        <div className="w-full mt-1 flex items-center">
            <button onClick={() => presionarCrear()} className="flex items-center content-center justify-center font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-6 h-6 mr-1 inline-block agregar-icon"></span>Agregar</button>
        </div>)}
        
            
            <div className="flex-1 overflow-y-auto pb-8">
                <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                    {initialLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="font-koulen text-2xl">Cargando Turnos...</p>
                        </div>) : turnos.length === 0 ? (
                                <div className="flex justify-center items-center h-64">
                                    <p>No hay turnos registrados.</p>
                                </div>
                            ) : (
                            turnos.map((turno) => (
                                <div key={turno.id}
                                className="flex flex-col rounded-md items-center 
                                justify-center text-center w-[80%] border-2 border-dotted
                                border-blue-900 p-3 md:p-8 md:w-[50%] relative">
                                    
                                        <div className="flex items-center justify-center">
                                            <div className="w-20  h-20 md:w-24 md:h-24 inline-block moto-icon border p-2 border-blue-900 rounded-full"></div>
                                            {/* Implementar el eliminar */}
                                            <span onClick={()  => eliminarTurno(turno.id)} className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"></span>
                                        </div>
                                            {/* Informacion del Moto */}
                                        <div className="flex flex-col w-full p-1 gap-1">
                                            <p className="inline-block font-semibold text-lg text-left">Repartidor: { turno.driver?.name || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Motocicleta: { turno.motorcycle?.license_plate || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Inicio: { turno.start_time || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Final: { turno.end_time || '...Cargando'}</p>
                                            <p className="inline-block font-semibold text-lg text-left">Estado: { turno.status == 'active' ? 'Activo' : turno.status == 'completed' ? 'Completado' : turno.status == 'cancelled' ? 'Cancelado' : '...Cargando' }</p>
                                        </div>

                                        <div className="w-full mt-1">
                                            <div className="w-full h-1 rounded-sm bg-azul-principal my-2"></div>
                                        </div>

                                        <div>
                                            {/* Aqui debe ir un editar */}
                                            <button onClick={() => presionarEditar({
                                                id: turno.id,
                                                driver_id: turno.driver_id,
                                                motorcycle_id: turno.motorcycle_id,
                                                start_time: turno.start_time,
                                                end_time: turno.end_time,
                                                status: turno.status,
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
        fields={camposTurno}
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