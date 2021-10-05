import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import axios from 'axios';

const Producto = ({ producto, productos, guardarProductos }) => {
	const { id, descripcion, valorUnitario, estadoProducto } = producto;
	const history = useHistory();

	// Funcion  eliminar producto de la api
	const eliminarProducto = async (id) => {
		try {
			await axios({
				method: 'delete',
				url: `http://localhost:4500/productos/${id}`,
			});

			// Mostrar alerta de exito
			Swal.fire(
				'!Eliminado!',
				'El producto se eliminó correctamente',
				'success'
			);
		} catch (error) {
			console.log(error);
		}
	};

	// Eliminar venta del estado
	const eliminarProductoDelEstado = (id) => {
		guardarProductos(
			productos.filter((productoState) => productoState.id !== id)
		);
	};

	// Funcion confirmar eliminación del producto
	const confirmarEliminarProducto = (id) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¡El producto eliminado no se puede recuperar!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Sí, eliminar!',
		}).then((result) => {
			if (result.isConfirmed) {
				eliminarProducto(id);

				// Eliminar venta del estado
				eliminarProductoDelEstado(id);
				history.push('/productos');
			}
		});
	};

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
				<Link to={'/productos/editar'} className="btn btn-editar" type="button">
					Editar
				</Link>
				<button
					className="btn btn-eliminar"
					type="button"
					onClick={() => confirmarEliminarProducto(id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
