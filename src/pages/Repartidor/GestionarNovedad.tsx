import React from "react";
import { useState, useEffect } from "react";

// Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

// Models
import Motocicleta from "../../models/Motocicleta";
import Novedad from "../../models/Novedad";
import { FormField } from "../../models/CamposFormulario";

import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

// Services
import { obtenerMotocicletas } from "../../services/MotocicletaService";
import { obtenerNovedades, crearNovedad, eliminarNovedad, actualizarNovedad } from "../../services/NovedadService";
import { subirFoto } from "../../services/FotoService";

// Alerta
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const GestionarNovedad: React.FC = () => {
    // Estados
    const [initialLoading, setInitialLoading] = useState(true);
    const [novedades, setNovedades] = useState<Novedad[]>([]);
    const [motocicletas, setMotocicletas] = useState<Motocicleta[]>([]);
    const [tituloModal, setTituloModal] = useState<string>('');
    
    // Gestión del modal
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();

    // Configuración de navegación
    const InfoSinNav = [
        {
            icono: 'novedad-negro-icon',
            nombre: 'Gestionar Novedades'
        }
    ]

    // Campos del formulario
    const camposNovedad: FormField[] = [
        {
            name: 'motorcycle_id',
            label: 'Motocicleta',
            type: 'select',
            required: true,
            options: motocicletas
                .filter(m => m.status === 'available')
                .map(m => ({
                    value: m.id,
                    label: `${m.license_plate} - ${m.brand}`
                }))
        },
        {
            name: 'issue_type',
            label: 'Tipo de novedad',
            type: 'select',
            required: true,
            options: [
                { value: 'accident', label: 'Accidente' },
                { value: 'breakdown', label: 'Avería' },
                { value: 'maintenance', label: 'Mantenimiento' }
            ]
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            required: true,
            placeholder: 'Detalla la novedad ocurrida...'
        },
        {
            name: 'imagen',
            label: 'Adjuntar foto',
            type: 'file',
            required: true
        }
    ];

    // Handlers
    const presionarEditar = (novedad: Novedad) => {
        setTituloModal('Editar Novedad');
        openModal(novedad);
    }

    const presionarCrear = () => {
        setTituloModal('Crear Novedad');
        openModal();
    }

    const enviarFormulario = async (data: any) => {
        try {
            const { imagen, ...novedadData } = data;
            
            if (initialData.id) {
                // Lógica de actualización
                const novedadActualizada = await actualizarNovedad(initialData.id, novedadData);
                setNovedades(novedades.map(n => n.id === initialData.id ? novedadActualizada : n));
            } else {
                // Crear nueva novedad con imagen
                const nuevaNovedad = await crearNovedad({
                    ...novedadData,
                    status: 'open',
                    date_reported: new Date().toISOString()
                });

                if (imagen) {
                    const foto = await subirFoto(imagen, nuevaNovedad.id!, 'Foto de la novedad');
                    nuevaNovedad.photos = [foto];
                }

                setNovedades([...novedades, nuevaNovedad]);
            }
            
            closeModal();
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Ocurrió un error al procesar la solicitud");
        }
    };

    // Efectos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setInitialLoading(true);
                const [novedadesRes, motosRes] = await Promise.all([
                    obtenerNovedades(),
                    obtenerMotocicletas()
                ]);
                
                setNovedades(novedadesRes);
                setMotocicletas(motosRes);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        
        cargarDatos();
    }, []);

    // Eliminar novedad
    const handleEliminar = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar esta novedad?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: async () => {
                        try {
                            await eliminarNovedad(id);
                            setNovedades(novedades.filter(n => n.id !== id));
                        } catch (error) {
                            alert("Error eliminando la novedad");
                        }
                    }
                },
                { label: 'Cancelar' }
            ]
        });
    };

    return (
        <div className="w-full min-h-screen bg-cliente flex flex-col relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral 
                    rutaAtras="/repartidor" 
                    titulo="Gestión de Novedades"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                {initialLoading ? (
                    <></>
                ) : (
                    <div className="w-full mt-1 flex items-center">
                        <button 
                            onClick={presionarCrear}
                            className="flex items-center content-center justify-center font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"
                        >
                            <span className="w-6 h-6 mr-1 inline-block agregar-icon"></span>
                            Agregar
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                        {initialLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="font-koulen text-2xl">Cargando Novedades...</p>
                            </div>
                        ) : novedades.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <p>No hay novedades registradas.</p>
                            </div>
                        ) : (
                            novedades.map(novedad => (
                                <div 
                                    key={novedad.id}
                                    className="flex flex-col rounded-md items-center justify-center text-center w-[80%] border-2 border-dotted border-blue-900 p-3 md:p-8 md:w-[50%] relative mb-4"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 inline-block moto-icon border p-2 border-blue-900 rounded-full"></div>
                                        <span 
                                            onClick={() => handleEliminar(novedad.id!)}
                                            className="absolute top-0 right-0 w-8 h-8 md:w-9 md:h-9 inline-block cursor-pointer eliminar-icon"
                                        ></span>
                                    </div>

                                    <div className="flex flex-col w-full p-1 gap-1 text-left">
                                        <p><strong>Motocicleta:</strong> {
                                            motocicletas.find(m => m.id === novedad.motorcycle_id)?.license_plate || 'N/A'
                                        }</p>
                                        <p><strong>Tipo:</strong> {
                                            novedad.issue_type === 'accident' ? 'Accidente' :
                                            novedad.issue_type === 'breakdown' ? 'Avería' : 'Mantenimiento'
                                        }</p>
                                        <p><strong>Estado:</strong> {
                                            novedad.status === 'open' ? 'Abierta' :
                                            novedad.status === 'in_progress' ? 'En progreso' : 'Resuelta'
                                        }</p>
                                        <p><strong>Descripción:</strong> {novedad.description}</p>
                                        
                                        {novedad.photos?.map(foto => (
                                            <img 
                                                key={foto.id}
                                                src={'/app/'+foto.image_url}
                                                alt="Evidencia"
                                                className="mt-2 w-full h-32 object-cover rounded"
                                            />
                                        ))}
                                    </div>

                                    <div className="w-full mt-1">
                                        <div className="w-full h-1 rounded-sm bg-azul-principal my-2"></div>
                                    </div>

                                    <button 
                                        onClick={() => presionarEditar(novedad)}
                                        className="flex items-center mt-4 gap-2 py-2 px-6 bg-azul-principal hover:bg-blue-950 text-xl rounded-lg text-center"
                                    >
                                        <span className="w-8 h-8 md:w-9 md:h-9 inline-block editar-icon"></span>
                                        Editar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <ModalCrearActualizar 
                title={tituloModal}
                fields={camposNovedad}
                onSubmit={enviarFormulario}
                isOpen={isOpen}
                onClose={closeModal}
                initialData={initialData}
            />

            <div className="">
                <NavMovil informacion={InfoSinNav} />
            </div>
        </div>
    );
};

export default GestionarNovedad;