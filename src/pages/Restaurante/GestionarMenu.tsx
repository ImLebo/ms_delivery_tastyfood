import React from "react";
import { useState, useEffect } from "react";

//Componenetes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Restaurante from "../../models/Restaurante";
import Producto from "../../models/Producto";
import Menu from "../../models/Menu";
import { FormField } from "../../models/CamposFormulario";

import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { getProducto } from "../../services/ProductoService";
import { getRestaurante } from "../../services/RestauranteService";
import { getMenu, createMenu, deleteMenu, updateMenu} from "../../services/MenuService";

//Alerta
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const GestionarMenu: React.FC = () => {
    //Variables reactivas
    const[initialLoading, setInitialLoading] = useState(true);
    const[restaurantes, setRestaurante] = useState<Restaurante[]>([]);
    const[productos, setProducto] = useState<Producto[]>([]);
    const[menus, setMenu] = useState<Menu[]>([]);
    const[tituloModal, setTituloModal] = useState<string>();
    
    //Variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();
    
    //Código adicional (Aux, Complementos para componentes, Etc)
    const navOptions = [
        {
            nombre: 'Gestionar producto',
            icono: 'product-icon',
            ruta:'/gestionar-producto'
        },
        {
            nombre: 'Gestionar restaurante',
            icono: 'gestionar-restaurante-icon',
            ruta: '/gestionar-restaurante'
        },
        {
            nombre: 'Cuenta',
            icono: 'usuario-icon',
            ruta: '/a'
        }
    ]

    const camposMenu: FormField[] = [
        {
            name: 'restaurant_id',
            label: 'ID del restaurante',
            type: 'select',
            required: true,
            options: restaurantes.map(restaurante => ({
            value: restaurante.id,
            label: `${restaurante.name} `
            }))
        },
        {
            name: 'product_id',
            label: 'ID del producto',
            type: 'select',
            required: true,
            options: productos.map(producto => ({
            value: producto.id,
            label: `${producto.name} `
            }))            
        },
        {
            name: 'price',
            label: 'Precio del producto',
            type: 'text',          
        },
        {
            name: 'availability',
            label: 'Disponipilidad',
            type: 'select',
            options: [
                {value: true, label: 'Disponible'},
                {value: false, label: 'No Disponible'},
            ],
            required: true
        }
    ];

    const presionarEditar = (menu: Menu) => {
        setTituloModal('Editar Menu'); 
        openModal(menu);
    }

    const presionarCrear = () => {
        setTituloModal('Crear Menu');
        openModal(); 
    }  

    const enviarFormulario = async (data: any) => {
        try {
            if (initialData.id) {
            const menuActualizado = await updateMenu(initialData.id, data);
            setMenu(menus.map(menu => 
                menu.id === initialData.id ? menuActualizado : menu
            ));
            } else {
            const respuesta = await createMenu(data);

            const nuevoMenu = respuesta; 
            setMenu([...menus, nuevoMenu]);
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar el menú:", error);
            alert("Ocurrió un error al guardar el menú");
        }
    };

    //set de variables reactivas
    useEffect(() => {
        obtenerInformacionPrincipal();
        obtenerInformacionComplementaria();
        setTituloModal('');
    }, []);

    const obtenerInformacionPrincipal = async () => {
        try {
            setInitialLoading(true);
            const respuesta = await getMenu();
            setMenu(respuesta);
            } catch (error) {
                console.error("Error al obtener los turnos:", error);
            } finally {
                setInitialLoading(false);
            }
    };

    const obtenerInformacionComplementaria = async () => {
        try {
            const respuestaRestaurantes = await getRestaurante();
            setRestaurante(respuestaRestaurantes);

            const respuestaProductos = await getProducto();
            setProducto(respuestaProductos); 

            } catch (error) {
                console.error("Error al obtener los datos complementarios:", error);
            }
    };

    //Metodos
    const eliminarMenu = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este menú?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await deleteMenu(id);
                    setMenu(menus.filter(menu => menu.id !== id));
                } catch (err) {
                    alert("No se pudo eliminar el menú");
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
                titulo="gestion menu"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                {initialLoading? (
                    <></>
                ): (
                    <div className="w-full mt-1 flex items-center">
                        <button onClick={() => presionarCrear()} className="flex items-center content-center justify-center font-koulen mx-auto text-xl px-6 py-2 rounded-3xl mt-2 bg-azul-principal text-white"><span className="w-6 h-6 mr-1 inline-block agregar-icon"></span>Agregar</button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="flex flex-col items-center justify-center mt-2 md:mt-8 md:gap-10 w-full">
                        {initialLoading? (
                                <div className="flex justify-center items-center h-64">
                                    <p className="font-koulen text-2xl">Cargando menus...</p>
                                </div>
                            ): menus.length === 0 ? (
                                <div  className="flex justify-center items-center h-64">
                                    <p>No hay menús registrados</p>
                                </div>
                            ): (
                            menus.map((menu) => (
                            <div key ={menu.id}
                                className="max-w-sm p-3 bg-pastelCyan rounded-xl shadow-md border border-gray-200 relative">
                                
                                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
                                    <span onClick={() => eliminarMenu(menu.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block cancel-icon"></span>
                                </button>

                                <button onClick={() => presionarEditar ({
                                    id: menu.id,
                                    restaurant_id: menu.restaurant_id,
                                    product_id: menu.product_id,
                                    price: menu.price,
                                    availability: menu.availability,
                                })} 
                                className="top-3 right-3 text-gray-700 hover:text-cyan-500 text-xl">
                                    <span className="w-8 h-8 md:w-9 md:h-9 inline-block editar-icon"></span>
                                </button>

                                {/* Imagen */}
                                <div className="w-40 h-40 overflow-hidden rounded-full mx-auto mb-4">
                                    <img
                                    src="/src/images/imagen-plato-generica-2.png"
                                    alt="Plato de pasta"
                                    className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="w-full h-[60%] flex flex-row p-4">
                                    <div className=" flex flex-col justify-center pr-[5rem] md:pr-[5rem]">
                                        <p className="inline-block font-semibold text-lg text-left">Restaurante: {menu.restaurant?.name || '...Cargando'} </p>
                                        <p className="inline-block font-semibold text-lg text-left">Producto: {menu.product?.name || '...Cargando'} </p>
                                        <p className="inline-block font-semibold text-lg text-left">Precio: {menu.price || '...Cargando'}</p>
                                        <p className="inline-block font-semibold text-lg text-left">Disponibilidad: {menu.availability || '...Cargando'} </p>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>

            <ModalCrearActualizar
            title={tituloModal}
            fields={camposMenu}
            onSubmit={enviarFormulario}
            isOpen={isOpen}
            onClose={closeModal}
            initialData={initialData}
            ></ModalCrearActualizar>

            <div className="">
                <NavMovil opciones={navOptions} />
            </div>
        </div>
    )
}

export default GestionarMenu;