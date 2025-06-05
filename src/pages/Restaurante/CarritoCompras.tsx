import React, { useState } from 'react';
import ProductoCard from '../../components/ProductoCard';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import fondo from '../../images/cliente/fondo.png';
import Producto from '../../models/Producto';
import Boton from '../../components/Panel/Boton';

const Botones: Array<Object> = [
  {
    nombre: '',
    ruta: '/ver-restaurantes',
    icono: <FaArrowLeft />,
  },
];

const Carrito = () => {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      name: 'Rigatoni alla Melanzana',
      description: 'Pasta rigatoni en salsa de tomate con berenjenas, aceitunas y toque de albahaca.',
      price: "15.99",
      category: 'Pasta',
    },
  ]);

  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const agregarProducto = () => {
    const nuevoProducto: Producto = {
      id: productos.length + 1,
      name: 'Pizza Margherita',
      description: 'Pizza clásica con tomate, mozzarella y albahaca fresca.',
      price: "12.5",
      category: 'Pizza',
    };
    setProductos([...productos, nuevoProducto]);
  };

  const total = productos.reduce((sum, p) => sum + parseFloat(p.price), 0);

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      {/* Parte superior con el Botón de retroceso */}
      <div className="flex items-center justify-between p-4">
        <div className="w-52 h-14 flex flex-col gap-6">
          {Botones.map((boton: any, index: number) => (
            <Boton key={index} nombre={boton.nombre} ruta={boton.ruta} icono={boton.icono} />
          ))}
        </div>
        <h2 className="text-lg font-bold text-black">RESUMEN DE LA COMPRA</h2>
        <FaShoppingCart className="text-2xl text-cyan-500" />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center gap-6 px-4 pb-4">
        <div className="w-full bg-white/90 border-2 border-cyan-300 rounded-2xl p-4 space-y-4">
          {productos.length === 0 ? (
            <p className="text-center text-black font-bold text-lg">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="space-y-4">
                {productos.map((producto) => (
                  <ProductoCard
                    key={producto.id}
                    producto={producto}
                    imagen="https://i.imgur.com/JZV1i9v.png"
                    onEliminar={() => eliminarProducto(producto.id)}
                  />
                ))}
              </div>
              <p className="text-center font-bold text-lg mt-4">
                TOTAL: ${total.toFixed(2)}
              </p>
            </>
          )}
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={agregarProducto}
            className="bg-green-500 text-white font-bold px-6 py-3 rounded-full w-full flex justify-center items-center gap-2"
          >
            + Agregar producto
          </button>

          <button className="bg-cyan-500 text-white font-bold px-6 py-3 rounded-full w-full flex justify-center items-center gap-2">
            <FaShoppingCart /> FINALIZAR
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 flex justify-around rounded-t-xl mt-6">
        <div className="flex flex-col items-center text-cyan-500 font-bold">
          <FaShoppingCart className="text-xl" />
          <span>TU CARRITO</span>
        </div>
      </footer>
    </div>
  );
};

export default Carrito;

