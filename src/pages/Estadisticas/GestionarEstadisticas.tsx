import { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

import Motocicleta from '../../models/Motocicleta';
import Turno from '../../models/Turno';

import HeaderGeneral from '../../components/HeaderGeneral';


import { obtenerTurnos } from '../../services/TurnoService';
import { obtenerMotocicletas } from '../../services/MotocicletaService';

// Registrar componentes necesarios de Chart.js
	ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
	);

	const GestionarEstadisticas = () => {
	const [motocicletas, setMotocicletas] = useState<Motocicleta[]>([]);
	const [turnos, setTurnos] = useState<Turno[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const cargarDatos = async () => {
		try {
			const [dataMotocicletas, dataTurnos] = await Promise.all([
			obtenerMotocicletas(),
			obtenerTurnos()
			]);
			setMotocicletas(dataMotocicletas);
			setTurnos(dataTurnos);
		} catch (error) {
			console.error('Error cargando datos:', error);
		} finally {
			setLoading(false);
		}
		};
		cargarDatos();
	}, []);

	// Procesar datos para gráficos
	const procesarDatosMotocicletas = () => {
		const conteoPorMarca: { [key: string]: number } = {};
		motocicletas.forEach(moto => {
		conteoPorMarca[moto.brand] = (conteoPorMarca[moto.brand] || 0) + 1;
		});
		return conteoPorMarca;
	};

	const procesarDatosTurnos = () => {
		const conteoPorEstado: { [key: string]: number } = {};
		turnos.forEach(turno => {
		conteoPorEstado[turno.status] = (conteoPorEstado[turno.status] || 0) + 1;
		});
		return conteoPorEstado;
	};

	const procesarSeriesTemporales = () => {
		const fechas = turnos.map(turno => new Date(turno.start_time).toISOString().split('T')[0]);
		const conteoPorFecha: { [key: string]: number } = {};
		
		fechas.forEach(fecha => {
		conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + 1;
		});
		
		return {
		labels: Object.keys(conteoPorFecha).sort(),
		datos: Object.values(conteoPorFecha)
		};
	};

	// Configuración común para gráficos
	const opcionesComunes = {
		responsive: true,
		maintainAspectRatio: false,
	};

	if (loading) return <div>Cargando datos...</div>;

	return (

		<div className='w-full min-h-screen bg-cliente flex flex-col py-3 px-6 relative'>
		<HeaderGeneral titulo='Estadisticas' rutaAtras='/panel'></HeaderGeneral>
		<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
		{/* Gráfico de Barras - Motocicletas por Marca */}
		<div className="bg-white p-4 rounded-lg shadow-md h-96">
			<h2 className="text-xl font-bold mb-4">Motocicletas por Marca</h2>
			<Bar
			options={opcionesComunes}
			data={{
				labels: Object.keys(procesarDatosMotocicletas()),
				datasets: [{
				label: 'Cantidad',
				data: Object.values(procesarDatosMotocicletas()),
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)',
					'rgba(75, 192, 192, 0.5)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
				],
				borderWidth: 1
				}]
			}}
			/>
		</div>

		{/* Gráfico de Torta - Turnos por Estado */}
		<div className="bg-white p-4 rounded-lg shadow-md h-96">
			<h2 className="text-xl font-bold mb-4">Distribución de Turnos</h2>
			<Pie
			options={opcionesComunes}
			data={{
				labels: Object.keys(procesarDatosTurnos()),
				datasets: [{
				data: Object.values(procesarDatosTurnos()),
				backgroundColor: [
					'rgba(255, 99, 132, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 206, 86, 0.5)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1
				}]
			}}
			/>
		</div>

		{/* Gráfico de Líneas - Series Temporales de Turnos */}
		<div className="bg-white p-4 rounded-lg shadow-md h-96 md:col-span-2">
			<h2 className="text-xl font-bold mb-4">Evolución de Turnos en el Tiempo</h2>
			<Line
			options={opcionesComunes}
			data={{
				labels: procesarSeriesTemporales().labels,
				datasets: [{
				label: 'Turnos creados',
				data: procesarSeriesTemporales().datos,
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.1
				}]
			}}
			/>
		</div>
		</div>
		</div>
	);
	};

export default GestionarEstadisticas;