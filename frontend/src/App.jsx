import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Dashboard from './components/layout/Dashboard';
import NuevoProducto from './components/layout/Productos/NuevoProducto';
import Producto from './components/layout/Productos/Producto';
import Productos from './components/layout/Productos/Productos';
import Sidebar from './components/layout/Sidebar';
import NuevoUsuario from './components/layout/usuarios/NuevoUsuario';
import Usuario from './components/layout/usuarios/usuario';
import Usuarios from './components/layout/usuarios/usuarios';
import NuevaVenta from './components/layout/ventas/NuevaVenta';
import Ventas from './components/layout/ventas/Ventas';
import {ProtectedRoute} from './components/ProtectedRoute/protected.route';

function App() {

	return (
		<Router>
			<Sidebar />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/nueva-cuenta" component={NuevaCuenta} />
				<Route exact path="/dashboard" component={Dashboard} />
				<ProtectedRoute exact path="/ventas" component={Ventas} />
				<ProtectedRoute exact path="/ventas/nueva" component={NuevaVenta} />
				<ProtectedRoute exact path="/usuarios" component={Usuarios}></ProtectedRoute>
				<ProtectedRoute exact path="/usuarios/info" component={Usuario}></ProtectedRoute>
				<ProtectedRoute exact path="/usuarios/nuevo" component={NuevoUsuario}></ProtectedRoute>
				<ProtectedRoute exact path="/productos" component={Productos}></ProtectedRoute>
				<ProtectedRoute exact path="/productos/info" component={Producto}></ProtectedRoute>
				<ProtectedRoute exact path="/productos/nuevo" component={NuevoProducto}></ProtectedRoute>
				<Route path="*" component={() => "404 Not found"}></Route>
			</Switch>
		</Router>
	);
}

export default App;
