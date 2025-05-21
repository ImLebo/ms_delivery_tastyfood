import { Link, useLocation } from 'react-router-dom';

type NavOption = {
    nombre: string;
    icono?: string;
    ruta: string;
};

type InfoSinNav = {
    icono?: string; 
    nombre?: string
}

type BottomNavProps = {
    opciones?: NavOption[];
    informacion?: InfoSinNav[]; 
    className?: string;
};

export const NavMovil = ({ opciones, informacion, className = '' }: BottomNavProps) => {
    const location = useLocation();


    return (
        <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top ${className}`}>
            <div className="flex justify-around items-center h-24">
                {opciones?.map((opcion) => (
                <Link
                    key={opcion.ruta}
                    to={opcion.ruta}
                    className={`flex flex-col items-center justify-center w-full h-full ${
                    location.pathname === opcion.ruta ? 'text-azul-principal' : 'text-gray-500'
                    }`}
                >
                    {opcion.icono && <div className={`w-8 h-8 inline-block  ${location.pathname === opcion.ruta ? opcion.icono : opcion.icono+'-disable'}`}></div>}
                    {opcion.nombre && <span className="font-koulen mt-1">{opcion.nombre}</span>}
                </Link>
                ))}
                {informacion?.map((info) => (
                    <div key={info.nombre} className='flex flex-row gap-2 '>
                        {info.icono && <span className={`w-8 h-8 inline-block ${info.icono}`}></span>}
                        <h2 className='font-koulen text-azul-principal text-2xl mt-1'>{info.nombre}</h2>
                    </div>
                ))
                }
            </div>
        </nav>
    );
};