import React from 'react';
import { Link } from 'react-router-dom';

const BuscadorVentas = () => {
	return (
		<div className="buscador">
			<div className="buscador-input">
				<h3>Buscar por código</h3>
				<input type="text" placeholder="Buscar" />
			</div>
			<Link to={'/ventas/nueva'} className="btn-agregar">
				Agregar venta
			</Link>
		</div>
	);
};

export default BuscadorVentas;
