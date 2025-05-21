import React from "react";
import { useEffect, useState } from "react";

//Componentes
import HeaderGeneral from "../../components/HeaderGeneral";
import { NavMovil } from "../../components/NavMovil";

//Models
import Producto from "../../models/Producto";

//Service
import { getProducto, createProducto, updateProducto, deleteProducto } from "../../services/ProductoService";

const GestionarProducto: React.FC = () => {
    //Varibales reactivas
    const [productos, setProductos] = useState<Producto[]>([]);    
    
    //Código adicional (Aux, Complementos para componentes, Etc)
    const InfoSinNav = [
        {
            icono: 'gestionar-producto-icon',
            nombre: 'Gestionar Producto'
        }
    ]
    
    //Set de variables reactivas
    useEffect(() => {
        obtenerInformacion()
    })

    const obtenerInformacion = async () => {
        const respuesta = await getProducto();
        setProductos(respuesta)
    }

    //Metodos
    const eliminarProducto = async (id: number) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este repartidor?")) {
            return;
        }
        
        try {
            await deleteProducto(id);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            alert("No se pudo eliminar el producto");
            console.error(error);
        }
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

                {productos.map((producto) => (
                    <div key={producto.id} className="w-full max-w-sm border-2 border-azul-principal rounded-lg p-4 mt-5">
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
                            <button className="flex items-center gap-1">
                            <span className="w-6 h-6 md:w-8 md:h-8 inline-block editar-icon"></span> Editar 
                            </button>
                            <button className="flex items-center gap-1">
                            <span onClick={() => eliminarProducto(producto.id)} className="w-8 h-8 md:w-9 md:h-9 inline-block  eliminar-icon"></span> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            

            <div className="">
                <NavMovil informacion={InfoSinNav}></NavMovil>
            </div>  
        </div>      
    );
}

export default GestionarProducto;