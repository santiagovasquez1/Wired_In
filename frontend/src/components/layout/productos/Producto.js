import React from 'react';

const Producto = ({ producto }) => {
	const { id, descripcion, valorUnitario, estadoProducto } = producto;

	return (
		<tr>
			<td className="codigo">
				<span>{id}</span>
			</td>
			<td>{descripcion}</td>
			<td className="valor">
				<span>$ {valorUnitario}</span>
			</td>
			<td
				className={
					estadoProducto ? 'disponible estado' : 'no-disponible estado'
				}
			>
				{estadoProducto ? <span>DISPONIBLE</span> : <span>NO DISPONIBLE</span>}
			</td>
			<td className="acciones">
				<button className="btn btn-editar" type="button">
					Editar
				</button>
				<button className="btn btn-eliminar" type="button">
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
