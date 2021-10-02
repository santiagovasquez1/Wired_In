import React from 'react';

const Producto = ({ producto }) => {
	const { idProducto, descripcion, valorUnitario, estadoProducto } = producto;

	return (
		<div className="producto">
			<p className="producto-codigo">{idProducto}</p>
			<p>{descripcion}</p>
			<p className="producto-valor">${valorUnitario}</p>
			<div className="producto-estado">
				{estadoProducto ? 'DISPONIBLE' : 'NO DISPONIBLE'}
			</div>
			<button className="btn-editar">EDITAR</button>
			<button className="btn-eliminar">ELIMINAR</button>
		</div>
	);
};

export default Producto;
