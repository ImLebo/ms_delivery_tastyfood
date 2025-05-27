import { lazy } from "react";
import { RutaProtegida } from "../components/Authentication/RutaProtegida";

const InicioSesion = lazy(() => import('../pages/Authentication/InicioSesion'));
const Panel = lazy(() => import('../pages/Panel')); 
const PanelCliente = lazy(() => import('../pages/Cliente/PanelCliente'));
const PanelRepartidor = lazy(() => import('../pages/Repartidor/PanelRepartidor'));
const PanelRestaurante = lazy(() => import('../pages/Restaurante/PanelRestaurante'));
const GestionarRepartidor = lazy(() => import('../pages/Repartidor/GestionarRepartidor'));
const GestionarRestaurante = lazy(() => import('../pages/Restaurante/GestionarRestaurante'));
const GestionarProducto = lazy(() => import('../pages/Restaurante/GestionarProducto'));
const GestionarMenu = lazy(() => import('../pages/Restaurante/GestionarMenu'));
const GestionarMoto = lazy(() => import('../pages/Repartidor/GestionarMoto'));
const GestionarTurno = lazy(() => import('../pages/Repartidor/GertionarTurno'));
const GestionarCliente = lazy(() => import('../pages/Cliente/GestionarCliente'));
const GestionarNovedad = lazy(() => import('../pages/Repartidor/GestionarNovedad'));
const VerRestaurantes = lazy(() => import('../pages/Cliente/VerRestaurantes'));
const VerInfoRestaurante = lazy(() => import('../pages/Cliente/VerInfoRestaurante'));



const coreRoutes = [
	{
        path: "/",
        title: "InicioSesion",
        component: InicioSesion,
    },
    {
        element: <RutaProtegida/>,
        children: [
            {
                path: "/panel",
                title: "Panel",
                component: Panel
            },
			{
				path: '/cliente',
				title:'PanelCliente',
				component: PanelCliente
			},
			{
				path: '/repartidor',
				title: 'PanelRepartidor',
				component: PanelRepartidor
			},
				{
				path: '/restaurante',
				title: 'PanelRestaurante',
				component: PanelRestaurante
			},
			{
				path: '/gestionar-repartidor',
				title: 'GestionarRepartidor',
				component: GestionarRepartidor
			},
			{
				path: '/gestionar-restaurante',
				title: 'GestionarRestaurante',
				component: GestionarRestaurante
			},
			{
				path: '/gestionar-producto',
				title: 'GestionarProducto',
				component: GestionarProducto
			},
			{
				path: '/gestionar-menu',
				title: 'GestionarMenu',
				component: GestionarMenu
			},
			{
				path: '/gestionar-moto',
				title: 'GestionarMoto',
				component: GestionarMoto
			},
			{
				path: '/gestionar-turno',
				title: 'GestionarTurno',
				component: GestionarTurno
			},
			{
				path: '/gestionar-novedad',
				title: 'GestionarNovedad',
				component: GestionarNovedad
			},
			{
				path: '/ver-restaurantes',
				title: 'VerRestaurantes',
				component: VerRestaurantes
			},
			{
				path: '/gestionar-cliente',
				title: 'GestionarCliente',
				component: GestionarCliente
			},
			{
				path: '/ver-info-restaurante',
				title: 'VerInfoRestaurante',
				component: VerInfoRestaurante
			},			
		]
	}
];



const routes = [...coreRoutes];
export default routes;
