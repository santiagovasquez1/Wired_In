import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Componentes

const Ventas = () => {
	// State con los productos
	const [productos, guardarProductos] = useState([]);

	// const { idProducto, descripcion, valorUnitario, estadoProducto } = productos;

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
			<h1>Productos</h1>
			<div>
				{productos.map((producto) => (
					<p>{producto.descripcion}</p>
				))}
			</div>
		</div>
	);
};

export default Ventas;
