import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// Componentes
import Venta from './Venta';
import BuscadorVentas from './BuscadorVentas';
import NavbarVentas from './NavbarVentas';
import NavbarVentanas from '../share/NavbarVentanas';
import Swal from 'sweetalert2';
import axios from 'axios';

const Ventas = () => {
	// State con las ventas
	const [ventas, guardarVentas] = useState([]);
	const [showVentas, setShowVentas] = useState(false);
	const history = useHistory();

	// Consultar la api
	useEffect(() => {
		const obtenerVentas = () => {
			axios({
				method: 'get',
				url: 'https://wiredinbackend.herokuapp.com/api/ventas',
			}).then(res => {
				guardarVentas(res.data.ventas);
				setShowVentas(true);
			}).catch(err => {
				Swal.fire('Error', 'Las ventas no se pueden cargar de la base de datos', 'error').then(() => {
					history.push('/');
					setShowVentas(false);
				});
			});
		};
		obtenerVentas();
	}, []);


	if (showVentas) {
		return (
			<div className="main-container">
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
							<th scope="col">Acciones</th>
						</tr>
					</thead>
					<tbody className="table-body">
						{ventas.length === 0
							? 'No hay ventas'
							: ventas.map((venta) => (
								<Venta
									key={venta._id}
									ventas={ventas}
									guardarVentas={guardarVentas}
									venta={venta}
								/>
							))}
					</tbody>
				</table>
			</div>
		);

	} else {
		return (
			<div className="usuarios">
				<NavbarVentanas title="Ventas" />
				<div style={{
					textAlign: "center",
					width: '100%',
				}}>
					<h4>Cargando Ventas....</h4>
					<p className="">Por favor esperar</p>
				</div>
			</div>
		);
	}
};

export default Ventas;
