import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Estilos
import './Productos.css';

// Componentes
import NavbarProductos from './NavbarProductos';
import BuscadorProductos from './BuscadorProductos';
import Producto from './Producto';

const Ventas = () => {
	// State con los productos
	const [productos, guardarProductos] = useState([]);

	// consultar la api
	useEffect(() => {
		const obtenerProductos = async () => {
			try {
				const respuesta = await axios({
					method: 'get',
					url: 'http://localhost:4500/productos',
				});
				guardarProductos(respuesta.data);
			} catch (error) {
				console.log(error);
				alert('No se pueden cargar los productos desde la base de datos');
			}
		};

		obtenerProductos();
	}, []);

	return (
		<div className="productos">
			<NavbarProductos />
			<BuscadorProductos />
			<div>
				{productos.map((producto) => (
					<Producto key={producto.idProducto} producto={producto} />
				))}
			</div>
		</div>
	);
};

export default Ventas;
