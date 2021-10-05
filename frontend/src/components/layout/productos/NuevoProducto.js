import React, { useState } from 'react';

// Componentes
import NavbarProductos from './NavbarProductos';
import { useHistory } from 'react-router-dom';

// Sweetalert
import Swal from 'sweetalert2';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const NuevoProducto = () => {
	const history = useHistory();

	// State con la información del producto
	const [nuevoProducto, guardarNuevoProducto] = useState({
		id: '',
		descripcion: '',
		valorUnitario: 0,
		estadoProducto: '',
	});

	// State de la alerta
	const [alerta, guardarAlerta] = useState(null);

	// Desestructuración de nuevoProducto
	const { id, descripcion, valorUnitario, estadoProducto } = nuevoProducto;

	// Leer los datos del formulario y tenerlos en el estado
	const onChangeNuevoProducto = (e) => {
		if (e.target.name === 'valorUnitario') {
			guardarNuevoProducto({
				...nuevoProducto,
				[e.target.name]: Number(e.target.value),
			});
		} else if (e.target.name === 'estadoProducto') {
			guardarNuevoProducto({
				...nuevoProducto,
				[e.target.name]: JSON.parse(e.target.value),
			});
		} else {
			guardarNuevoProducto({
				...nuevoProducto,
				[e.target.name]: e.target.value,
			});
		}
	};

	// Enviar los productos a la api
	const enviarNuevoProducto = async (nuevoProducto) => {
		try {
			await axios({
				method: 'post',
				url: 'http://localhost:4500/productos',
				data: nuevoProducto,
			});

			// Alerta de exito al ingresar el producto
			Swal.fire('Correcto', 'El producto se agregó correctamente', 'success');
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
	const submitNuevoProducto = (e) => {
		e.preventDefault();

		// Validar formulario
		if (
			id.trim() === '' ||
			valorUnitario <= 0 ||
			descripcion.trim() === '' ||
			estadoProducto === ''
		) {
			guardarAlerta({
				msg: 'Todos los campos son obligatorios',
				classes: 'alerta',
			});
			return;
		}

		// Crear el producto
		enviarNuevoProducto(nuevoProducto);

		// Redireccionar al home de productos
		history.push('/productos');
	};

	return (
		<div className="main-container">
			<NavbarProductos />
			<div className="nuevo-item">
				<h2>Nuevo Producto</h2>

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

				<form onSubmit={submitNuevoProducto}>
					<div className="form-group">
						<div className="field-form">
							<label>Código</label>
							<input
								type="text"
								placeholder="Código"
								name="id"
								onChange={onChangeNuevoProducto}
							/>
						</div>

						<div className="field-form">
							<label>Descripción</label>
							<input
								type="text"
								placeholder="Descripción"
								name="descripcion"
								onChange={onChangeNuevoProducto}
							/>
						</div>

						<div className="field-form">
							<label>Valor unitario</label>
							<input
								type="number"
								placeholder="0"
								name="valorUnitario"
								onChange={onChangeNuevoProducto}
							/>
						</div>

						<div className="field-form">
							<label>Estado</label>
							<select name="estadoProducto" onChange={onChangeNuevoProducto}>
								<option value="">-- Selecciona --</option>
								<option value={true}>DISPONIBLE</option>
								<option value={false}>NO DISPONIBLE</option>
							</select>
						</div>
					</div>
					<button>Agregar Producto</button>
				</form>
			</div>
		</div>
	);
};

export default NuevoProducto;
