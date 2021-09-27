import React from 'react';
import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Dashboard } from './components/layout/Dashboard';
import { Sidebar } from './components/layout/Sidebar';
import Ventas from './components/layout/ventas/Ventas';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
			</Switch>
		</Router>
	);
}

export default App;
