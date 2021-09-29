import React from 'react';
import './Ventas.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Venta = ({ venta, ventas, guardarVentas }) => {
	const { valor, fecha, cliente, vendedor, id } = venta;
	const history = useHistory();

	// funcion eliminar venta
	const eliminarVenta = async (id) => {
		try {
			await axios({
				method: 'delete',
				url: `http://localhost:4000/ventas/${id}`,
			});

			// mostrar alerta
			Swal.fire('¡Eliminada!', 'La venta se eliminó correctamente.', 'success');
		} catch (error) {
			console.log(error);
		}
	};

	// cambiar el estado de las ventas
	const eliminarVentaDelEstado = (id) => {
		guardarVentas(ventas.filter((ventaState) => ventaState.id !== id));
	};

	// funcion confirmar eliminar venta
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

				// eliminar venta del estado
				eliminarVentaDelEstado(id);
				history.push('/ventas');
			}
		});
	};

	return (
		<tr>
			<td>{id}</td>
			<td>{cliente}</td>
			<td>
				<span className="valor-venta">$ {valor}</span>
			</td>
			<td>{fecha}</td>
			<td>{vendedor}</td>
			<td className="acciones">
				<button className="btn btn-editar" type="button">
					Editar
				</button>
				<button
					className="btn btn-eliminar"
					type="button"
					onClick={() => confirmarEliminarVenta(id)}
								>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Venta;
