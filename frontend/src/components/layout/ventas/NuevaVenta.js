import React, { useState, useEffect } from 'react';

// Componentes
import NavbarVentas from './NavbarVentas';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import auth from '../../../services/auth.service';

// Sweetalert
import Swal from 'sweetalert2';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const NuevaVenta = () => {
	const history = useHistory();

	// State con el valor total de la venta
	const [valortotal, guardarValorTotal] = useState(0);
	const [items, guardarItems] = useState([]);
	const [productos, guardarProductos] = useState([]);

	// Actualizar valor total a pagar
	const actualizarTotal = () => {
		if (items.length === 0) {
			guardarValorTotal(0);
			return;
		}

		let nuevoTotal = 0;

		items.map((item) => (nuevoTotal += item.unidades * item.valor));

		guardarValorTotal(nuevoTotal);
	};

	// Cargar productos
	useEffect(() => {
		const obtenerProductos = async () => {
			const url = 'http://localhost:3500/api/productos';
			const respuesta = await axios({
				method: 'get',
				headers: auth.getHeader(),
				url: url,
			});
			guardarProductos(respuesta.data.productos);
			// console.log(respuesta.data.productos);
			// console.log(auth.getHeader());
		};
		obtenerProductos();

		actualizarTotal();
	}, [items]);

	// Funcion para agregar producto a la venta
	const agregarProducto = (producto) => {
		// validar el estado disponible del producto o si se encuentra en el array de items
		if (producto.estado === 'Disponible' && !items.includes(producto)) {
			producto.unidades = 0;
			guardarItems([...items, producto]);
			guardarNuevaVenta({
				...nuevaVenta,
				total: valortotal,
				listaProductos: [...items, producto],
			});
		} else {
			alert(`El producto ${producto.nombre} no se puede agregar`);
		}
	};

	// Actualizar las cantidades de productos en la tabla
	const sumarItems = (i) => {
		const todosItems = [...items];
		todosItems[i].unidades++;
		guardarItems(todosItems);
		guardarNuevaVenta({
			...nuevaVenta,
			total: valortotal,
			listaProductos: todosItems,
		});
		//console.log(todosItems[i].unidades);
	};

	const restarItems = (i) => {
		// Copiar el arreglo original
		const todosItems = items;

		// Validar que el numero no sea menor que 0
		if (todosItems[i].unidades === 0) return;

		todosItems[i].unidades--;
		guardarItems(todosItems);
		guardarNuevaVenta({
			...nuevaVenta,
			total: valortotal,
			listaProductos: todosItems,
		});
		//console.log(todosItems[i].unidades);
	};

	// Funcion para eliminar producto de la venta
	const eliminarItems = (item) => {
		guardarItems(items.filter((itemState) => itemState._id !== item._id));
		actualizarTotal();
		guardarNuevaVenta({
			...nuevaVenta,
			total: valortotal,
			listaProductos: items,
		});
	};

	// State con la informacion de la venta
	const [nuevaVenta, guardarNuevaVenta] = useState({
		// Valores iniciales

		listaProductos: [],
		total: 0,
		fecha: '',
		cliente: '',
		cedula: null,
		vendedor: '',
		estadoVenta: 'proceso',
	});

	// State de la alerta
	const [alerta, guardarAlerta] = useState(null);

	// Desestructuración de nuevaVenta
	const { total, fecha, cliente, cedula, vendedor, listaProductos } =
		nuevaVenta;

	// Leer los datos del formulario y tenerlos en el estado
	const onChangeNuevaVenta = (e) => {
		if (e.target.name === 'total' || e.target.name === 'cedula') {
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
				url: 'http://localhost:3500/api/ventas',
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
			total <= 0 ||
			fecha.trim() === '' ||
			cliente.trim() === '' ||
			cedula <= 0 ||
			vendedor.trim() === '' ||
			listaProductos.length <= 0
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
								<th scope="col">Descripción</th>
								<th scope="col">Valor unitario</th>
							</tr>
						</thead>
						<tbody className="table-body">
							{productos.length === 0
								? 'No hay productos'
								: productos.map((producto) => (
										<tr key={producto._id}>
											<td>{producto.nombre}</td>
											<td>
												<span>$ {producto.valor}</span>
											</td>
											<td className="acciones">
												<button
													className="btn btn-editar"
													type="button"
													onClick={() => agregarProducto(producto)}
												>
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
							{/* <div className="field-form">
								<label>Código</label>
								<input
									type="text"
									placeholder="Código"
									name="id"
									onChange={onChangeNuevaVenta}
								/>
							</div> */}

							<div className="field-form venta__productos">
								<table>
									<thead className="table-head">
										<tr>
											<th scope="col">Producto</th>
											<th scope="col">Valor</th>
											<th scope="col">Cantidad</th>
											<th scope="col">Accion</th>
										</tr>
									</thead>
									<tbody className="table-body">
										{items.length === 0
											? 'Agregue items'
											: items.map((item, index) => (
													<tr key={item._id}>
														<td>{item.nombre}</td>
														<td>$ {item.valor}</td>
														<td>{item.unidades}</td>
														<td className="acciones">
															<FontAwesomeIcon
																className="fa-icon"
																icon={faPlus}
																onClick={() => sumarItems(index)}
															/>
															<FontAwesomeIcon
																className="fa-icon"
																icon={faMinus}
																onClick={() => restarItems(index)}
															/>
															<FontAwesomeIcon
																className="fa-icon"
																icon={faTrash}
																onClick={() => eliminarItems(item)}
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
									value={valortotal}
									name="total"
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
							<div className="field-form">
								<label>Estado</label>
								<select name="estadoVenta" onChange={onChangeNuevaVenta}>
									<option value="proceso">En proceso</option>
									<option value="cancelada">Cancelada</option>
									<option value="entregada">Entregada</option>
								</select>
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
