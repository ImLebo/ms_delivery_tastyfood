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
import { obtenerInfracciones } from "../../services/InfraccionService";
import { Infraccion } from "../../models/Infraccion";
import { crearInfraccionMoto, actualizarInfraccionMoto } from "../../services/InfraccionMotoService";

//Alerta
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { InfraccionMotocicleta } from "../../models/InfraccionMotocicleta";


const GestionarMoto: React.FC = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [motocicletas, setMoto] = useState<Motocicleta[]>([]);
    const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
    const [infracciones, setInfracciones] = useState<Infraccion[]>([]);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [tituloModal, setTituloModal] =  useState<string>('');
    const [infraccionesMoto, setInfraccionesMoto] = useState<InfraccionMotocicleta[]>([]);

    const { isOpen, initialData, openModal, closeModal } = gestionarModal();

    const InfoSinNav = [
        { icono: 'moto-icon', nombre: 'Gestionar Turnos' }
    ]

    const camposInfracciones: FormField[] = [
        {   
            name: 'id_infraccion',
            label: 'Infraccion',
            type: 'select',
            required: true,
            options: infracciones.map(infraccion => ({
                value: infraccion.id,
                label: `${infraccion.name}`,
            }))
        },
        {
            name: 'id_motocicleta',
            label: 'Motocicleta',
            type: 'select',
            required: true,
            options: motocicletas.map(moto => ({
                value: moto.id,
                label: `${moto.brand} - ${moto.license_plate}`,
            }))
        },
        {
            name: 'start_time',
            label: 'Fecha de Infraccion',
            type: 'datetime-local',
            required: true
        }
    ]

    const camposTurno: FormField[] = [
        {   
            name: 'driver_id',
            label: 'Repartidor',
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
            label: 'Motocicleta',
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

    // Handlers para modales
    const presionarEditar = (turno: Turno) => {
        setTituloModal('Editar Turno'); 
        openModal(turno);
    }

    const presionarCrearTurno = () => {
        setTituloModal('Crear Turno');
        openModal(); 
    }

    const presionarCrearInfraccion = () => {
        setTituloModal('Crear Infracción');
        openModal();
    }

        const presionarActualizarInfraccion = () => {
        setTituloModal('Actualizar Infracción');
        initialData.value = {
            id: 1,
        }
        openModal();
    }

    // Submit handlers
    const enviarFormulario = async (data: any) => {
        try {
            if (initialData.id) {
                const turnoActualizado = await actualizarTurno(initialData.id, data);
                setTurnos(turnos.map(turno => 
                    turno.id === initialData.id ? turnoActualizado : turno
                ));
            } else {
                const respuesta = await crearTurno(data);
                setTurnos([...turnos, respuesta]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar el turno:", error);
            alert("Ocurrió un error al guardar el turno");
        }
    };

    const enviarFormularioInfracciones = async (data: any, id?: number) => {
        try {
            if (id) {
                const actualizarInfraccion = await actualizarInfraccionMoto(initialData.id, data);
                setInfraccionesMoto(infraccionesMoto.map(inf => 
                    inf.id === initialData.id ? actualizarInfraccion : inf
                ));
            } else {
                const respuesta = await crearInfraccionMoto(data);

                console.log(respuesta);

                console.log(infraccionesMoto);

                setInfraccionesMoto([...infraccionesMoto, respuesta]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar la infracción:", error);
            alert("Ocurrió un error al guardar la infracción");
        }
    };

    // Carga de datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setInitialLoading(true);
                const [turnosRes, motosRes, repartidoresRes, infraccionesRes] = await Promise.all([
                    obtenerTurnos(),
                    obtenerMotocicletas(),
                    getRepartidores(),
                    obtenerInfracciones()
                ]);
                
                setTurnos(turnosRes);
                setMoto(motosRes);
                setRepartidores(repartidoresRes);
                setInfracciones(infraccionesRes);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        
        cargarDatos();
    }, []);

    const eliminarTurnos = async (id: number) => {
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
                            alert("No se pudo eliminar el turno");
                        }
                    }
                },
                { label: 'Cancelar' }
            ]
        });
    };

    return(
        <div className="w-full min-h-screen bg-cliente flex flex-col relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral 
                    rutaAtras="/repartidor" 
                    titulo="Gestión de Motos"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                {!initialLoading && (
                    <div className="w-full mt-1 flex items-center gap-4 justify-center">
                        <button 
                            onClick={presionarCrearTurno} 
                            className="flex items-center content-center justify-center font-koulen text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white">
                            <span className="w-6 h-6 mr-1 inline-block agregar-icon"></span>
                            Nuevo Turno
                        </button>
                        
                        <button 
                            onClick={presionarCrearInfraccion}
                            className="flex items-center content-center justify-center font-koulen text-xl px-6 py-2 rounded-3xl mt-2 bg-red-600 text-white">
                            <span className="w-6 h-6 mr-1 inline-block alerta-icon"></span>
                            Nueva Infracción
                        </button>
                        <button 
                            onClick={presionarActualizarInfraccion}
                            className="flex items-center content-center justify-center font-koulen text-xl px-6 py-2 rounded-3xl mt-2 bg-red-600 text-white">
                            <span className="w-6 h-6 mr-1 inline-block alerta-icon"></span>
                            Actualizar Infracción
                        </button>
                    </div>
                )}

                {/* Listado de Turnos */}
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
                                            <span onClick={()  => eliminarTurnos(turno.id)} className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"></span>
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

                <ModalCrearActualizar 
                    title={tituloModal}
                    fields={tituloModal === 'Crear Turno' ? camposTurno : camposInfracciones}
                    onSubmit={tituloModal === 'Crear Infracción' ? enviarFormularioInfracciones : tituloModal === 'Actualizar Infracción' ? enviarFormularioInfracciones : enviarFormulario}
                    isOpen={isOpen}
                    onClose={closeModal}
                    initialData={initialData}
                />

                <div className="">
                    <NavMovil informacion={InfoSinNav} />
                </div>
            </div>
        </div>
    );
};

export default GestionarMoto;