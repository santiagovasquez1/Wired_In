import React from 'react';
import './Ventas.css';

const Venta = ({ venta }) => {
	const { valorTotal, fecha, nombreCliente, vendedor, id } = venta;

	return (
		<tr>
			<td>{id}</td>
			<td>{nombreCliente}</td>
			<td>
				<span className="valor-venta">$ {valorTotal}</span>
			</td>
			<td>{fecha}</td>
			<td>{vendedor}</td>
		</tr>
	);
};

export default Venta;
