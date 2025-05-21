import React, { useState } from 'react';
import ClienteCard from '../../components/Clientes/ClienteCard';
import { FaHome, FaUser, FaPlus, FaArrowLeft, FaTimes } from 'react-icons/fa';
import fondo from '../../images/cliente/fondo.png';
import { useNavigate } from 'react-router-dom';

const GestionClientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@mail.com', phone: '123456789' },
    { id: 2, name: 'Ana Gómez', email: 'ana@mail.com', phone: '987654321' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [clienteForm, setClienteForm] = useState({ id: null, name: '', email: '', phone: '' });

  const navigate = useNavigate();

  const abrirModalNuevo = () => {
    setClienteForm({ id: null, name: '', email: '', phone: '' });
    setModalVisible(true);
  };

    const presionarClick = () => {
        navigate('/panel');
    }

  const abrirModalEditar = (cliente) => {
    setClienteForm(cliente);
    setModalVisible(true);
  };

  const guardarCliente = () => {
    if (clienteForm.id === null) {
      const nuevoCliente = {
        ...clienteForm,
        id: Date.now(),
      };
      setClientes((prev) => [...prev, nuevoCliente]);
    } else {
      setClientes((prev) =>
        prev.map((c) => (c.id === clienteForm.id ? clienteForm : c))
      );
    }
    setModalVisible(false);
  };

  const eliminarCliente = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funciones para botones de INICIO y CUENTA (puedes personalizar)
  const handleInicioClick = () => {
    alert('Navegar a INICIO');
  };

  const handleCuentaClick = () => {
    alert('Navegar a CUENTA');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center font-koulen"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="flex items-center justify-between p-4 font-koulen">
        <FaArrowLeft onClick={presionarClick} className="text-2xl text-cyan-500" />
        <h2 className="text-xl font-bold text-black">GESTIÓN CLIENTES</h2>
        <FaUser className="text-2xl text-cyan-500" />
      </div>

      <div className="flex flex-col items-center gap-4 px-4 overflow-y-auto font-koulen">
        {clientes.length === 0 ? (
          <p className="text-black">No hay clientes disponibles.</p>
        ) : (
          clientes.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}
              onEditar={() => abrirModalEditar(cliente)}
              onEliminar={() => eliminarCliente(cliente.id)}
            />
          ))
        )}

        <button
          onClick={abrirModalNuevo}
          className="flex items-center gap-2 bg-cyan-500 text-white font-bold px-6 py-3 rounded-full mt-2 font-koulen"
        >
          <FaPlus /> AGREGAR
        </button>
      </div>

      <footer className="bg-white p-4 flex justify-around rounded-t-xl mt-4 font-koulen">
        <button
          onClick={handleInicioClick}
          className="flex flex-col items-center text-cyan-500 font-bold focus:outline-none"
          type="button"
        >
          <FaHome className="text-xl" />
          <span>INICIO</span>
        </button>
        <button
          onClick={handleCuentaClick}
          className="flex flex-col items-center text-cyan-500 font-bold focus:outline-none"
          type="button"
        >
          <FaUser className="text-xl" />
          <span>CUENTA</span>
        </button>
      </footer>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative font-koulen">
            <button
              onClick={() => setModalVisible(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Cerrar modal"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4">{clienteForm.id ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                guardarCliente();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={clienteForm.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={clienteForm.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={clienteForm.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-cyan-500 text-white font-bold py-2 rounded mt-4"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionClientes;
