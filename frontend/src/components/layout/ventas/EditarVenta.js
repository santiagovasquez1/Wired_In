import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavbarVentas from './NavbarVentas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const EditarVenta = (props) => {
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

	// Leer los datos del formulario y tenerlos en el estado
	// const onChangeNuevaVenta = (e) => {
	// 	if (e.target.name === 'total' || e.target.name === 'cedula') {
	// 		guardarNuevaVenta({
	// 			...nuevaVenta,
	// 			[e.target.name]: Number(e.target.value),
	// 		});
	// 	} else {
	// 		guardarNuevaVenta({
	// 			...nuevaVenta,
	// 			[e.target.name]: e.target.value,
	// 		});
	// 	}
	// };

	return (
		<div className="main-container">
			<NavbarVentas />
			<div className="main">
				<div className="nuevo-item">
					<h2>Editar Venta</h2>
					<form>
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
									// onChange={onChangeNuevaVenta}
								/>
							</div>

							<div className="field-form">
								<label>Fecha</label>
								<input
									type="date"
									placeholder="Fecha"
									name="fecha"
									value={fecha}
									// onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cliente</label>
								<input
									type="text"
									placeholder="Cliente"
									name="cliente"
									value={cliente}
									// onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Cédula</label>
								<input
									type="number"
									placeholder="Cédula"
									name="cedula"
									value={cedula}
									// onChange={onChangeNuevaVenta}
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
									// onChange={onChangeNuevaVenta}
								/>
							</div>
							<div className="field-form">
								<label>Estado</label>
								<select
									name="estadoVenta"
									/* onChange={onChangeNuevaVenta} */
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
