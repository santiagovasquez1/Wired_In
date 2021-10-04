import React from 'react';
import './Productos.css';
// import { Link } from 'react-router-dom';

const BuscadorProductos = () => {
	return (
		<div className="hero-productos">
			<div className="buscador">
				<div className="buscador-input-codigo">
					<p>Buscar por codigo</p>
					<input type="text" placeholder="Buscar" />
				</div>
				<div className="buscador-input-descripcion">
					<p>Buscar por descripción</p>
					<input type="text" placeholder="Buscar" />
				</div>
			</div>
			{/* <Link to={'/ventas/nueva'} className="btn-agregar">
				Agregar Producto
			</Link> */}
		</div>
	);
};

export default BuscadorProductos;
