import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import axios from 'axios';

const Venta = ({ venta, ventas, guardarVentas }) => {
	const { total, fecha, cliente, vendedor, _id } = venta;
	const history = useHistory();

	// Funcion eliminar venta de la api
	const eliminarVenta = async (id) => {
		try {
			await axios({
				method: 'delete',
				url: `https://wiredinbackend.herokuapp.com/api/ventas/${id}`,
			});

			// Mostrar alerta
			Swal.fire('¡Eliminada!', 'La venta se eliminó correctamente.', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	// Eliminar venta del estado
	const eliminarVentaDelEstado = (id) => {
		guardarVentas(ventas.filter((ventaState) => ventaState._id !== id));
	};

	// Funcion confirmar eliminar venta
	const confirmarEliminarVenta = (id) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¡La venta eliminada no se puede recuperar!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Sí, eliminar!',
		}).then((result) => {
			if (result.isConfirmed) {
				eliminarVenta(id);

				// Eliminar venta del estado
				eliminarVentaDelEstado(id);
				history.push('/ventas');
			}
		});
	};

	return (
		<tr>
			<td className="codigo">
				<span>{_id}</span>
			</td>
			<td>{cliente}</td>
			<td className="valor">
				<span>$ {total}</span>
			</td>
			<td>{fecha}</td>
			<td>{vendedor.nombre}</td>
			<td className="acciones">
				<Link
					to={`/ventas/editar/${_id}`}
					className="btn btn-editar"
					type="button"
				>
					Editar
				</Link>
				<button
					className="btn btn-eliminar"
					type="button"
					onClick={() => confirmarEliminarVenta(_id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Venta;
