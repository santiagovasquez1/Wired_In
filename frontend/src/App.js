import React from 'react';

// Componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Dashboard from './components/layout/Dashboard';
import Sidebar from './components/layout/Sidebar';
import Ventas from './components/layout/ventas/Ventas';
import NuevaVenta from './components/layout/ventas/NuevaVenta';
import Productos from './components/layout/productos/Productos';
import NuevoProducto from './components/layout/productos/NuevoProducto';
// import NuevoProductos from './components/layout/productos/Productos';

// Rutas
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Estilos
import './App.css';

function App() {
	return (
		<Router>
			<Sidebar />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/nueva-cuenta" component={NuevaCuenta} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/ventas" component={Ventas} />
				<Route exact path="/ventas/nueva" component={NuevaVenta} />
				<Route exact path="/productos" component={Productos} />
				<Route exact path="/productos/nuevo" component={NuevoProducto} />
			</Switch>
		</Router>
	);
}

export default App;
