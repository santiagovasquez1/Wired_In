import React, { useState, useEffect } from 'react';
import Venta from './Venta';
import BuscadorVentas from './BuscadorVentas';
import NavbarVentas from './NavbarVentas';
import axios from 'axios';
import './Ventas.css';

const Ventas = () => {
	// State con las ventas
	const [ventas, guardarVentas] = useState([]);

	// consultar la api
	useEffect(() => {
		const data = async () => {
			try {
				const respuesta = await axios({
					method: 'get',
					url: 'http://localhost:4000/ventas',
				});

				guardarVentas(respuesta.data);
			} catch (error) {
				console.log(error);
			}
		};

		data();
	}, []);

	return (
		<div className="ventas">
			<NavbarVentas />
			<BuscadorVentas />
			<table className="table">
				<thead className="table-head">
					<tr>
						<th scope="col">Código</th>
						<th scope="col">Cliente</th>
						<th scope="col">Valor</th>
						<th scope="col">Fecha</th>
						<th scope="col">Vendedor</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{ventas.length === 0
						? 'No hay ventas'
						: ventas.map((venta) => (
								<Venta
									key={venta.id}
									ventas={ventas}
									guardarVentas={guardarVentas}
									venta={venta}
								/>
						  ))}
				</tbody>
			</table>
		</div>
	);
};

export default Ventas;
