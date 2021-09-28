import React from 'react';
import './Ventas.css';

const Venta = ({ venta }) => {
	const { valor, fecha, cliente, vendedor, id } = venta;

	return (
		<tr>
			<td>{id}</td>
			<td>{cliente}</td>
			<td>
				<span className="valor-venta">$ {valor}</span>
			</td>
			<td>{fecha}</td>
			<td>{vendedor}</td>
		</tr>
	);
};

export default Venta;
