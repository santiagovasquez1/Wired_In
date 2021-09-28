import React, { useState } from 'react';
import NavbarVentas from './NavbarVentas';
import { useHistory } from 'react-router-dom';
import './NuevaVenta.css';
import axios from 'axios';

const NuevaVenta = () => {
	const history = useHistory();

	// state con la informacion de la venta
	const [nuevaVenta, guardarNuevaVenta] = useState({
		// valores iniciales
		id: null,
		valor: null,
		fecha: '',
		cliente: '',
		cedula: null,
		vendedor: '',
	});

	const { id, valor, fecha, cliente, cedula, vendedor } = nuevaVenta;

	// leer los datos del formulario y tenerlos en el estado
	const onChangeNuevaVenta = (e) => {
		if (
			e.target.name === 'id' ||
			e.target.name === 'valor' ||
			e.target.name === 'cedula'
		) {
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

	// funcion que envia la venta a la api
	const enviarNuevaVenta = async (nuevaVenta) => {
		try {
			await axios({
				method: 'post',
				url: 'http://localhost:4000/ventas',
				data: nuevaVenta,
			});
			alert('envio exitoso');
		} catch (error) {
			alert('Algo salio mal');
			console.log(error);
		}
	};

	// funcion submit
	const submitNuevaVenta = (e) => {
		e.preventDefault();

		// validar formulario
		if (
			id <= 0 ||
			valor <= 0 ||
			fecha.trim() === '' ||
			cliente.trim() === '' ||
			cedula <= 0 ||
			vendedor.trim() === ''
		) {
			// alerta momentanea
			alert('Todos los campos son obligatorios');
			return;
		}

		// crear la venta
		enviarNuevaVenta(nuevaVenta);

		// redireccionar al home de ventas
		history.push('/ventas');
	};

	return (
		<div className="ventas">
			<NavbarVentas />
			<div className="nueva-venta">
				<h2>Nueva Venta</h2>
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
					<button>Agregar</button>
				</form>
			</div>
		</div>
	);
};

export default NuevaVenta;
