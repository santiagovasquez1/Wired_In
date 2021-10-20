import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavbarVentas from './NavbarVentas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const EditarVenta = (props) => {
	const history = useHistory();

	// Obtener el id
	const { id } = props.match.params;

	// State con la venta que se va a actualizar
	const [venta, guardarVenta] = useState({
		listaProductos: [],
		total: 0,
		fecha: '',
		cliente: '',
		cedula: null,
		vendedor: '',
		estadoVenta: 'proceso',
	});

	const [alerta, guardarAlerta] = useState(false);

	// Consultar a la api para traer la venta a editar
	useEffect(() => {
		const obtenerVenta = async () => {
			try {
				const respuesta = await axios({
					method: 'get',
					url: `http://localhost:3500/api/ventas/${id}`,
				});
				guardarVenta(respuesta.data);
				console.log(respuesta.data);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerVenta();
	}, []);

	const {
		listaProductos,
		total,
		fecha,
		cliente,
		cedula,
		vendedor,
		estadoVenta,
	} = venta;

	// Cambiar los datos del vendedor
	// const cambiarDatosVendedor = (venta) => {
	// 	guardarVenta({
	// 		...venta,
	// 		[venta.vendedor]: venta.vendedor.uid,
	// 	});
	// };

	// Leer los datos del formulario y tenerlos en el estado
	const onChangeEditarVenta = (e) => {
		if (e.target.name === 'total' || e.target.name === 'cedula') {
			guardarVenta({
				...venta,
				[e.target.name]: Number(e.target.value),
			});
			// } else if (e.target.name === 'vendedor') {
			// 	guardarVenta({
			// 		...venta,
			// 		[e.target.name]: vendedor.uid,
			// 	});
		} else {
			guardarVenta({
				...venta,
				[e.target.name]: e.target.value,
			});
		}
	};

	// Funcion submit
	const submitEditarVenta = async (e) => {
		e.preventDefault();

		// Validar formulario
		if (
			total <= 0 ||
			fecha.trim() === '' ||
			cliente.trim() === '' ||
			cedula <= 0
		) {
			guardarAlerta({
				msg: 'Todos los campos son obligatorios',
				classes: 'alerta',
			});
			return;
		}

		guardarVenta({
			...venta,
			[vendedor]: vendedor.uid,
		});

		// Edita la venta en la base de datos
		try {
			await axios({
				method: 'put',
				url: `http://localhost:3500/api/ventas/${id}`,
				data: venta,
			});

			// Alerta de exito al ingresar venta
			Swal.fire('Correcto', 'La venta se actualizo correctamente', 'success');
		} catch (error) {
			console.log(error);

			// Alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error, intenta de nuevo',
			});
		}

		// Redireccionar al home de ventas
		// history.push('/ventas');
	};

	return (
		<div className="main-container">
			<NavbarVentas />
			<div className="main">
				<div className="nuevo-item">
					<h2>Editar Venta</h2>

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

					<form onSubmit={submitEditarVenta}>
						<div className="form-group">
							<div className="field-form venta__productos">
								<table>
									<thead className="table-head">
										<tr>
											<th scope="col">Producto</th>
											<th scope="col">Valor</th>
											<th scope="col">Accion</th>
										</tr>
									</thead>
									<tbody className="table-body">
										{listaProductos.map((item, index) => (
											<tr key={item._id}>
												<td>{item.nombre}</td>
												<td>$ {item.valor}</td>

												<td className="acciones">
													<FontAwesomeIcon
														className="fa-icon"
														icon={faTrash}
														// onClick={() => eliminarItems(item)}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="field-form">
								<label>Valor Total</label>
								<input
									type="number"
									readOnly
									value={total}
									name="total"
									onChange={onChangeEditarVenta}
								/>
							</div>

							<div className="field-form">
								<label>Fecha</label>
								<input
									type="date"
									placeholder="Fecha"
									name="fecha"
									defaultValue={fecha}
									onChange={onChangeEditarVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cliente</label>
								<input
									type="text"
									placeholder="Cliente"
									name="cliente"
									defaultValue={cliente}
									onChange={onChangeEditarVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cédula</label>
								<input
									type="number"
									placeholder="Cédula"
									name="cedula"
									defaultValue={cedula}
									onChange={onChangeEditarVenta}
								/>
							</div>
							<div className="field-form">
								<label>Vendedor</label>
								<input
									type="text"
									placeholder="Vendedor"
									name="vendedor"
									value={vendedor.nombre}
									readOnly
									onChange={onChangeEditarVenta}
								/>
							</div>
							<div className="field-form">
								<label>Estado</label>
								<select
									name="estadoVenta"
									defaultValue={estadoVenta}
									onChange={onChangeEditarVenta}
								>
									<option value="proceso">En proceso</option>
									<option value="cancelada">Cancelada</option>
									<option value="entregada">Entregada</option>
								</select>
							</div>
						</div>
						<button>Actualizar Venta</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditarVenta;
