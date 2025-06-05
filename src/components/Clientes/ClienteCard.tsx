// src/components/Clientes/ClienteCard.jsx
import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ClienteCard = ({ cliente, onEditar, onEliminar }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center w-full max-w-md">
      <div>
        <h2 className="text-xl font-bold">{cliente.name}</h2>
        <p className="text-sm text-gray-600">{cliente.email}</p>
        <p className="text-sm text-gray-600">{cliente.phone}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onEditar} className="text-blue-500 hover:text-blue-700 text-lg">
          <FaEdit />
        </button>
        <button onClick={onEliminar} className="text-red-500 hover:text-red-700 text-lg">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ClienteCard;
