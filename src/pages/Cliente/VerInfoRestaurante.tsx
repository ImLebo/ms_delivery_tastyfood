import React from "react";

//Components
import HeaderGeneral from "../../components/HeaderGeneral";
//import { NavMovil } from "../../components/NavMovil";

const VerInfoRestaurante: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative">
            <div className="flex-1 flex flex-col py-3 px-6 pb-20">
                <HeaderGeneral
                rutaAtras="/ver-restaurante"
                titulo="TastyFood"
                />

                <div className="w-full mt-6">
                    <div className="w-full h-px bg-azul-principal my-2"></div>
                </div>

                <div className="min-h-screen flex items-center justify-center bg-cover">
                    <div className="bg-cyan-700 bg-opacity-80 rounded-2xl p-8 w-96 text-white shadow-lg backdrop-blur-md">
                        <h1 className="text-black text-2xl font-bold mb-6 tracking-widest">
                            NOMBRE RESTAURANTE
                        </h1>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Dirección</label>
                            <div className="border-b border-white py-1"></div>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold uppercase mb-1 text-sm">Teléfono:</label>
                            <div className="border-b border-white py-1"></div>
                        </div>

                        <div>
                            <label className="block font-bold uppercase mb-1 text-sm">Email:</label>
                            <div className="border-b border-white py-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerInfoRestaurante;