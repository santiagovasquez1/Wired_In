import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Crear el context de productos
export const ProductosContext = createContext();

// Provider
const ProductosProvider = (props) => {
	// Crear el state del productos context
	const [productos, guardarProductos] = useState([]);

	// Ejecutar el llamado a la api
	useEffect(() => {
		const obtenerProductos = async () => {
			const url = 'http://localhost:3500/productos';
			const respuesta = await axios.get(url);
			guardarProductos(respuesta.data);
		};
		obtenerProductos();
	}, []);

	return (
		<ProductosContext.Provider value={{ productos, guardarProductos }}>
			{props.children}
		</ProductosContext.Provider>
	);
};

export default ProductosProvider;
