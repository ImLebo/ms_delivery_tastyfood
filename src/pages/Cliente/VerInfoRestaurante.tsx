import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Components
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Services
import { getRestauranteById } from "../../services/RestauranteService";
import { getMenu } from "../../services/MenuService";

//Models
import Restaurante from "../../models/Restaurante";
import Menu from "../../models/Menu";

const VerInfoRestaurante: React.FC = () => {
    //Variables
    const { id } = useParams();
    const navigate = useNavigate();

    //Variables reactivas  
    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [menuItem, setMenus] = useState<Menu[]>([]);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoNoDisponible, setProductoNoDisponible] = useState<string | null>(null);

    //Código adicional (Aux, Complementos para componentes, Etc)
    const navOptions = [
        {
        nombre: 'Ver Restaurantes',
        icono: 'logo-restaurant-icon',
        ruta: '/ver-restaurantes',
        },
        {
        nombre: 'Carrito',
        icono: 'carrito-icon',
        ruta: '/'
        },
        {
        nombre: 'Cuenta',
        icono: 'usuario-icon',
        ruta: '/a',
        }
    ];

    //
    useEffect(() => {
        obtenerInformacion(Number(id));
    }, [id]);

    const obtenerInformacion = async (ideRestaurante: number) => {
        try {
            setInitialLoading(true);
            const respuesta = await getRestauranteById(ideRestaurante);
            setRestaurante(respuesta);
        } catch (error) {
            console.error("Error al obtener restaurantes:", error);
        } finally {
            setInitialLoading(false);
        }
    };

    const obtenerMenu = async () => {
        try {
            const todosLosMenus = await getMenu();
            const filtrarMenus = todosLosMenus.filter(
                (menuItem: Menu) => menuItem.restaurant_id === Number(id)
            );
            setMenus(filtrarMenus);
            setMostrarMenu(true);
        } catch (error) {
            console.error("Error al obtener el menú:", error)
        } 
    };

    const carrito = (item: Menu) => {
        if (item.availability) {
            navigate(`/orden/${item.id}`)
        } else {
            setProductoNoDisponible(item.product?.name ?? "Producto");
            setMostrarModal(true)
        }
    }


    return (
        <div className="w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/ver-restaurantes"
                titulo="TastyFood"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                <div className="pt-10 flex items-center justify-center bg-cover">
                    <div className="bg-cyan-700 bg-opacity-80 rounded-2xl p-8 w-96 text-white shadow-lg backdrop-blur-md">
                        <h1 className="text-black text-2xl font-bold mb-6 tracking-widest">
                            {restaurante?.name}
                        </h1>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Dirección</label>
                            <p className="border-b border-white py-1">{restaurante?.address}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Teléfono</label>
                            <p className="border-b border-white py-1">{restaurante?.phone}</p>
                        </div>

                        <div>
                            <label className="block font-bold uppercase mb-1 text-sm">Correo</label>
                            <p className="border-b border-white py-1">{restaurante?.email}</p>
                        </div>
                    
                        <button
                        className="w-full mt-4 bg-white text-cyan-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                        onClick={obtenerMenu}
                        >
                            Ver Menú
                        </button>
                    </div>
                </div>

                {mostrarMenu && (
                    <div className="mt-10 bg-white rounded-xl p-6 shadow-md w-full max-w-3xl mx-auto">
                        <h2 className="text-xl font-bold text-cyan-700 mb-4">Menú</h2>
                        {menuItem.length === 0 ? (
                            <p className="text-gray-500">Este restaurante no tiene productos</p>
                        ): (
                            <ul className="space-y-6">
                                {menuItem.map((item, index) => (
                                    <li key={index} className="border-b pb-4 flex justify-between items-start">
                                        <div>
                                            <p  className="font-semibold text-lg">
                                                {item.product?.name ?? 'Producto no disponible'}
                                            </p>
                                            <p className="text-sm text-gray-600">Precio: {item.price} </p>
                                            <p className={`text-sm ${item.availability ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.availability ? 'Disponible' : 'No disponible'}
                                            </p> 
                                        </div>
                                        <button
                                        className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition"
                                        onClick={() => carrito(item)}
                                        >
                                            Comprar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {mostrarModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <h2 className="text-lg font-semibold text-red-600 mb-4">Producto no disponible</h2>
                            <p className="mb-4">
                                El producto <strong>{productoNoDisponible}</strong> no está disponible actualmente para la compra.
                            </p>
                            <button
                                className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
                                onClick={() => setMostrarModal(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <NavMovil opciones={navOptions}></NavMovil>
        </div>
    )
}

export default VerInfoRestaurante;