import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Boton = ({ nombre = '', ruta = '/', icono = '' }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(ruta);
    };

    return (
        <button
        onClick={handleClick}
        className={`
            w-full
            h-full
            px-5
            py-3
            font-pixel
            bg-white text-black 
            rounded-3xl 
            hover:bg-blue-300
            transition-colors
            flex items-center justify-center gap-4
        `}
        >
        {icono && <span className={icono} style={{
            display: 'inline-block',
            width: '24px',
            height: '24px'
        }} ></span>}
        {nombre}
        </button>
    );
};

Boton.propTypes = {
    nombre: PropTypes.string.isRequired,
    ruta: PropTypes.string.isRequired,
    icono: PropTypes.string,
};

export default Boton;