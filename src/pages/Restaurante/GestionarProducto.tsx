import React from "react";
import { useEffect, useState } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Producto from "../../models/Producto";
import { FormField } from "../../models/CamposFormulario";
import { gestionarModal } from "../../hooks/gestionarModal";
import ModalCrearActualizar from "../../components/ModalCrearActualizar";

//Service
import { getProducto, createProducto, updateProducto, deleteProducto } from "../../services/ProductoService";

//Alerta
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';


const GestionarProducto: React.FC = () => {
    //Varibales reactivas
    const [productos, setProductos] = useState<Producto[]>([]);    
    const [initialLoading, setInitialLoading] = useState(true);
    const [tituloModal, setTituloModal] =  useState<string>();

    //variables
    const { isOpen, initialData, openModal, closeModal } = gestionarModal();

    //Código adicional (Aux, Complementos para componentes, Etc)
    const InfoSinNav = [
        {
            icono: 'gestionar-producto-icon',
            nombre: 'Gestionar Producto'
        }
    ]

    const camposProducto: FormField[] = [
        {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre',
        required: true,
        },
        {
        name: 'description',
        label: 'Descripción',
        type: 'text',
        placeholder: 'Ingrese una descripción del producto',
        required: true,            
        },
        {
        name: 'price',
        label: 'Precio',
        type: 'text',
        placeholder: 'Ingrese el precio del producto',
        required: true,            
        },
        {
        name: 'category',
        label: 'Categoría',
        type: 'text',
        placeholder: 'Ingrese la categoría del producto',
        required: true,            
        }
    ]

    const presionarEditar = (producto: Producto) => {
        setTituloModal('Editar producto');
        openModal(producto);
    }

    const presionarCrear = () => {
        setTituloModal('Crear producto');
        openModal();
    }

    const enviarFormulario = async (data:any) => {
        try{
            if (initialData.id) {
                const productoActualizado = await updateProducto(initialData.id, data);
                setProductos(productos.map(rep =>
                    rep.id === initialData.id ? productoActualizado : rep
                ))
            }else {
                const respuesta = await createProducto(data);

                const nuevoProducto = respuesta;
                console.log(nuevoProducto);
                setProductos([...productos, nuevoProducto]);
            }
        } catch (error) {
            console.log("Error al guardar producto:", error);
            alert("Ocurrió un erro al guardar el producto");
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
            const respuesta = await getProducto();
            setProductos(respuesta);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setInitialLoading(false);
        }
    };

    //Metodos
    const eliminarProducto = async (id: number) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este producto?',
            buttons: [
            {
                label: 'Sí',
                onClick: async () => {
                try {
                    await deleteProducto(id);
                    setProductos(productos.filter(prod => prod.id !== id));
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
                rutaAtras="/restaurante"
                titulo="gestion producto"
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
                                        <p className="font-koulen text-2xl">Cargando productos...</p>
                                    </div>
                                ) : productos.length === 0 ?(
                                    <div className="flex justify-center items-center h-64">
                                        <p>No hay productos registrados</p>
                                    </div>
                                ) : (
                                    productos.map((producto) => (
                                        <div key={producto.id} className="w-full max-w-sm border-2 border-azul-principal rounded-lg p-4 mt-5 md:">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20  cesta-compra-icon"></div>

                                                <div className="flex flex-col text-black text-base font-semibold">
                                                    <p className="inline-block font-semibold text-lg text-left">Nombre: {producto.name || '...Cargando'}</p>
                                                    <p className="inline-block font-semibold text-lg text-left">Descripción: {producto.description || '...Cargando'}</p>
                                                    <p className="inline-block font-semibold text-lg text-left">Precio: {producto.price || '...Cargando'}</p>
                                                    <p className="inline-block font-semibold text-lg text-left">Categoria: {producto.category || '...Cargando'}</p>
                                                </div>
                                            </div>


                                            <div className="border-t-2 border-dotted border-azul-principal my-4"></div>

                                            <div className="flex justify-around items-center text-black text-lg font-medium">
                                                <button onClick={() => presionarEditar ({
                                                    id: producto.id,
                                                    name: producto.name,
                                                    description: producto.description,
                                                    price: producto.price,
                                                    category: producto.category
                                                })} 
                                                className="flex items-center gap-1">
                                                    <span className="w-6 h-6 md:w-8 md:h-8 inline-block editar-icon"></span> Editar 
                                                </button>
                                                <button className="flex items-center gap-1">
                                                    <span onClick={() => eliminarProducto(producto.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block  eliminar-icon"></span> Eliminar
                                                </button>
                                            </div>
                                        </div>
                                )))}
                        </div>
                    </div>
            </div>
            
            <ModalCrearActualizar
            title={tituloModal}
            fields={camposProducto}
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
}

export default GestionarProducto;