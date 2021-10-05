import React from 'react';
import { Link } from 'react-router-dom';

const BuscadorProductos = () => {
	return (
		<div className="buscador">
			<div className="buscador-group">
				<div className="buscador-input-codigo buscador-input">
					<h3>Buscar por código</h3>
					<input type="text" placeholder="Buscar" />
				</div>
				<div className="buscador-input-descripcion buscador-input">
					<h3>Buscar por descripción</h3>
					<input type="text" placeholder="Buscar" />
				</div>
			</div>
			<Link to={'/productos/nuevo'} className="btn-agregar">
				Agregar Producto
			</Link>
		</div>
	);
};

export default BuscadorProductos;
