import React from 'react';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import Producto from '../models/Producto';

interface ProductoCardProps {
  producto: Producto;
  imagen: string;
  onEliminar: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, imagen, onEliminar }) => {
  
  if (!producto) {
    console.error('El objeto producto no es válido.');
    return null;
  }

  return (
    <div className="relative bg-cyan-200 rounded-2xl p-4 shadow-md flex flex-row justify-between items-start gap-4 w-full max-w-md">
      {/* Botón de cerrar */}
      <button
        onClick={onEliminar}
        className="absolute top-2 right-2 text-white bg-cyan-500 rounded-full p-1 hover:bg-red-500"
      >
        <FaTimes />
      </button>

      {/* Información */}
      <div className="flex-1">
        <h3 className="text-black font-bold uppercase text-sm border-b border-white pb-1">
          {producto.name}
        </h3>
        <p className="text-black text-sm mt-1">{producto.description}</p>

        <div className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Precio:</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full">${parseFloat(producto.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Categoría:</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full">{producto.category}</span>
          </div>
        </div>

        {/* Selectores */}
        <div className="flex gap-2 mt-4">
          <button className="flex items-center justify-center gap-1 bg-white text-cyan-700 font-bold px-4 py-1 rounded-full shadow">
            CLIENTE <FaChevronDown />
          </button>
          <button className="flex items-center justify-center gap-1 bg-cyan-500 text-white font-bold px-4 py-1 rounded-full shadow">
            CANTIDAD
          </button>
        </div>
      </div>

      {/* Imagen del producto */}
      <div className="flex-shrink-0">
        <img
          src={imagen}
          alt={producto.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
      </div>
    </div>
  );
};

export default ProductoCard;
