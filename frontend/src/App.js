import React from 'react';

// Componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';

import Dashboard from './components/layout/Dashboard';
import Sidebar from './components/layout/Sidebar';

import Ventas from './components/layout/ventas/Ventas';
import NuevaVenta from './components/layout/ventas/NuevaVenta';

import Productos from './components/layout/Productos/Productos';
import Producto from './components/layout/Productos/Producto';
import NuevoProducto from './components/layout/Productos/NuevoProducto';

import Usuarios from './components/layout/usuarios/usuarios';
import Usuario from './components/layout/usuarios/usuario';
import NuevoUsuario from './components/layout/usuarios/NuevoUsuario';
// import Productos from './components/layout/productos/Productos';
// import NuevoProducto from './components/layout/productos/NuevoProducto';
// import EditarProducto from './components/layout/productos/EditarProducto';

// Context
import ProductosProvider from './Context/ProductosContext';

// Rutas
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Estilos
import './App.css';

function App() {
	return (
		<ProductosProvider>
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
					{/* <Route exact path="/productos" component={Productos} /> */}
					{/* <Route exact path="/productos/nuevo" component={NuevoProducto} /> */}
					{/* <Route exact path="/productos/editar" component={EditarProducto} /> */}
					<Route exact path="/productos" component={Productos} />
					<Route exact path="/productos/info" component={Producto} />
					<Route exact path="/productos/nuevo" component={NuevoProducto} />
				</Switch>
			</Router>
		</ProductosProvider>
	);
}

export default App;
