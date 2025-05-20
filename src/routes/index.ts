import { lazy } from "react";

const InicioSesion = lazy(() => import('../pages/Authentication/InicioSesion'));
const Panel = lazy(() => import('../pages/Panel')); 
const VerRestaurantes = lazy(() => import('../pages/Cliente/VerRestaurantes'))
const PanelRepartidor = lazy(() => import('../pages/Repartidor/PanelRepartidor'))
const GestionarRepartidor = lazy(() => import('../pages/Repartidor/GestionarRepartidor'));

const coreRoutes = [
	{
		path: '/',
		title: 'InicioSesion',
		component: InicioSesion
	},
	{
		path: '/panel',
		title:'Panel',
		component: Panel
	},
	{
		path: '/ver-restaurantes',
		title:'VerRestaurantes',
		component: VerRestaurantes
	},
	{
		path: '/repartidor',
		title: 'PanelRepartidor',
		component: PanelRepartidor
	},
	{
		path: '/gestionar-repartidor',
		title: 'GestionarRepartidor',
		component: GestionarRepartidor
	}
]

const routes = [...coreRoutes];
export default routes;
