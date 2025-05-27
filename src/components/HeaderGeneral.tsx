import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    rutaAtras: string;
    titulo?: string;
}

const HeaderGeneral: FC<Props> = ({ rutaAtras, titulo }) => {
    const navegar = useNavigate();

    const handleClickAtras = () => {
        navegar(rutaAtras);
    };

    return (
        <div className="flex w-full justify-between items-center">
        <button 
            onClick={handleClickAtras}
            className="w-8 h-8 md:w-11 md:h-11 inline-block back-icon cursor-pointer"
            aria-label="Volver atrás"
        ></button>
        
        <div className="text-right flex gap-4">
            <h3 className="font-koulen py-1 md:py-2 text-lg md:text-2xl lg:text-3xl">
            {titulo}
            </h3>
            <span className="w-8 h-8 md:w-11 md:h-11 inline-block img-logo"></span>
        </div>
        </div>
    );
};

export default HeaderGeneral;