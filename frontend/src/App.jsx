import React, { useState, useEffect } from 'react';
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
import { ProtectedRoute } from './components/ProtectedRoute/protected.route';
import authService from './services/auth.service';

function App() {
	const [loginUser, setLoginUser] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			let isLog = await authService.validarToken();
			setLoginUser(isLog);
		}
	}, [setLoginUser])

	return (
		<Router>
			<Sidebar />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/nueva-cuenta" component={NuevaCuenta} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/ventas" component={Ventas} />
				<Route exact path="/ventas/nueva" component={NuevaVenta} />
				<Route exact path="/usuarios" component={Usuarios}></Route>
				<Route exact path="/usuarios/info" component={Usuario}></Route>
				<Route exact path="/usuarios/nuevo" component={NuevoUsuario}></Route>
				<Route exact path="/productos" component={Productos}></Route>
				<Route exact path="/productos/info" component={Producto}></Route>
				<Route exact path="/productos/nuevo" component={NuevoProducto}></Route>
				<Route path="*" component={() => "404 Not found"}></Route>
			</Switch>
		</Router>
	);
}

export default App;
