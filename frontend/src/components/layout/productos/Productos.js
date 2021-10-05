import React, { useState, useEffect } from 'react';

import axios from 'axios';

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
		<div className="main-container">
			<NavbarProductos />
			<BuscadorProductos />
			<table clasname="table">
				<thead className="table-head">
					<tr>
						<th scope="col">Código</th>
						<th scope="col">Descripción</th>
						<th scope="col">Valor Unitario</th>
						<th scope="col">Estado</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{productos.length === 0
						? 'No hay productos'
						: productos.map((producto) => (
								<Producto key={producto.id} producto={producto} />
						  ))}
				</tbody>
			</table>
		</div>
	);
};

export default Ventas;
