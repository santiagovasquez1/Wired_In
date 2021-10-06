import React, { useState, useContext } from 'react';

// Componentes
import NavbarVentas from './NavbarVentas';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// Context
import { ProductosContext } from '../../../Context/ProductosContext';

// Sweetalert
import Swal from 'sweetalert2';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const NuevaVenta = () => {
	const history = useHistory();

	// Llamando los productos desde el context
	const { productos } = useContext(ProductosContext);

	// State con la informacion de la venta
	const [nuevaVenta, guardarNuevaVenta] = useState({
		// Valores iniciales
		id: '',
		valor: null,
		fecha: '',
		cliente: '',
		cedula: null,
		vendedor: '',
	});

	// State de la alerta
	const [alerta, guardarAlerta] = useState(null);

	// Desestructuración de nuevaVenta
	const { id, valor, fecha, cliente, cedula, vendedor } = nuevaVenta;

	// Leer los datos del formulario y tenerlos en el estado
	const onChangeNuevaVenta = (e) => {
		if (e.target.name === 'valor' || e.target.name === 'cedula') {
			guardarNuevaVenta({
				...nuevaVenta,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			guardarNuevaVenta({
				...nuevaVenta,
				[e.target.name]: e.target.value,
			});
		}
	};

	// Funcion que envia la venta a la api
	const enviarNuevaVenta = async (nuevaVenta) => {
		try {
			await axios({
				method: 'post',
				url: 'http://localhost:4000/ventas',
				data: nuevaVenta,
			});

			// Alerta de exito al ingresar venta
			Swal.fire('Correcto', 'La venta se agregó correctamente', 'success');
		} catch (error) {
			console.log(error);

			// Alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error, intenta de nuevo',
			});
		}
	};

	// Funcion submit
	const submitNuevaVenta = (e) => {
		e.preventDefault();

		// Validar formulario
		if (
			id.trim() === '' ||
			valor <= 0 ||
			fecha.trim() === '' ||
			cliente.trim() === '' ||
			cedula <= 0 ||
			vendedor.trim() === ''
		) {
			guardarAlerta({
				msg: 'Todos los campos son obligatorios',
				classes: 'alerta',
			});
			return;
		}

		// Crear la venta
		enviarNuevaVenta(nuevaVenta);

		// Redireccionar al home de ventas
		history.push('/ventas');
	};

	return (
		<div className="main-container">
			<NavbarVentas />
			<div className="main">
				<div className="listado-productos">
					<table>
						<thead className="table-head">
							<tr>
								<th scope="col">Código</th>
								<th scope="col">Descripción</th>
								<th scope="col">Valor unitario</th>
							</tr>
						</thead>
						<tbody className="table-body">
							{productos.length === 0
								? 'No hay productos'
								: productos.map((producto) => (
										<tr key={producto.id}>
											<td className="codigo">
												<span>{producto.id}</span>
											</td>
											<td>{producto.descripcion}</td>
											<td>
												<span>$ {producto.valorUnitario}</span>
											</td>
											<td className="acciones">
												<button className="btn btn-editar" type="button">
													Agregar
												</button>
											</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
				<div className="nuevo-item">
					<h2>Nueva Venta</h2>

					{alerta ? (
						<p className={alerta.classes}>
							{alerta.msg}{' '}
							<span>
								<FontAwesomeIcon
									onClick={() => guardarAlerta(null)}
									icon={faWindowClose}
								/>
							</span>
						</p>
					) : null}

					<form onSubmit={submitNuevaVenta}>
						<div className="form-group">
							<div className="field-form">
								<label>Código</label>
								<input
									type="text"
									placeholder="Código"
									name="id"
									onChange={onChangeNuevaVenta}
								/>
							</div>

							<div className="field-form">
								<label>Valor</label>
								<input
									type="number"
									placeholder="0"
									name="valor"
									onChange={onChangeNuevaVenta}
								/>
							</div>

							<div className="field-form">
								<label>Fecha</label>
								<input
									type="date"
									placeholder="Fecha"
									name="fecha"
									onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cliente</label>
								<input
									type="text"
									placeholder="Cliente"
									name="cliente"
									onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cédula</label>
								<input
									type="number"
									placeholder="Cédula"
									name="cedula"
									onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Vendedor</label>
								<input
									type="text"
									placeholder="Vendedor"
									name="vendedor"
									onChange={onChangeNuevaVenta}
								/>
							</div>
						</div>
						<button>Nueva venta</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NuevaVenta;
