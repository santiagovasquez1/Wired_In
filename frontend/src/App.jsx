import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Dashboard } from './components/layout/Dashboard';
import { Sidebar } from './components/layout/Sidebar';
import NuevoUsuario from './components/layout/usuarios/NuevoUsuario';
import Usuario from './components/layout/usuarios/usuario';
import Usuarios from './components/layout/usuarios/usuarios';
import NuevaVenta from './components/layout/ventas/NuevaVenta';
import Ventas from './components/layout/ventas/Ventas';

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
				<Route exact path="/usuarios" component={Usuarios}></Route>
				<Route exact path="/usuarios/info" component={Usuario}></Route>
				<Route exact path="/usuarios/nuevo" component={NuevoUsuario}></Route>
			</Switch>
		</Router>
	);
}

export default App;
