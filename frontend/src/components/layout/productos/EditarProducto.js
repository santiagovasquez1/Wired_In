import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import NavbarProductos from './NavbarProductos';
import axios from 'axios';

const EditarProducto = ({ productoeditar }) => {
	// const history = useHistory();

	// Nuevo state del producto
	const [producto, guardarProducto] = useState({
		id: '',
		descripcion: '',
		valorUnitario: 0,
		estadoProducto: '',
	});

	// Seleccionar producto a editar
	guardarProducto(productoeditar);
	console.log(producto);

	const { id, descripcion, valorUnitario, estadoProducto } = producto;

	// Leer los datos del formulario
	const onChangeFormulario = (e) => {
		if (e.target.name === 'valorUnitario') {
			guardarProducto({
				...producto,
				[e.target.name]: Number(e.target.value),
			});
		} else if (e.target.name === 'estadoProducto') {
			guardarProducto({
				...producto,
				[e.target.name]: JSON.parse(e.target.value),
			});
		} else {
			guardarProducto({
				...producto,
				[e.target.name]: e.target.value,
			});
		}
	};

	// Llena el state automaticamente
	useEffect(() => {
		guardarProducto(productoeditar);
	}, [productoeditar]);

	// Funcion editar producto en la api
	const editarProducto = async (producto) => {
		try {
			await axios({
				method: 'put',
				url: `http:localhost:4500/productos/${producto.id}`,
				data: producto,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// Funcion onSubmit para editar productos
	const submitEditarProducto = (e) => {
		e.preventDefault();

		console.log('Producto editado');
	};

	return (
		<div className="main-container">
			<NavbarProductos />
			<div className="nuevo-item">
				<h2>Editar Producto</h2>

				{/* {alerta ? (
					<p className={alerta.classes}>
						{alerta.msg}{' '}
						<span>
							<FontAwesomeIcon
								onClick={() => guardarAlerta(null)}
								icon={faWindowClose}
							/>
						</span>
					</p>
				) : null} */}

				<form onSubmit={submitEditarProducto}>
					<div className="form-group">
						<div className="field-form">
							<label>Código</label>
							<input
								type="text"
								placeholder="Código"
								name="id"
								value={id}
								readOnly
								onChange={onChangeFormulario}
							/>
						</div>

						<div className="field-form">
							<label>Descripción</label>
							<input
								type="text"
								placeholder="Descripción"
								name="descripcion"
								value={descripcion}
								onChange={onChangeFormulario}
							/>
						</div>

						<div className="field-form">
							<label>Valor unitario</label>
							<input
								type="number"
								placeholder="0"
								name="valorUnitario"
								value={valorUnitario}
								onChange={onChangeFormulario}
							/>
						</div>

						<div className="field-form">
							<label>Estado</label>
							<select
								name="estadoProducto"
								value={estadoProducto}
								onChange={onChangeFormulario}
							>
								<option value="">-- Selecciona --</option>
								<option value={true}>DISPONIBLE</option>
								<option value={false}>NO DISPONIBLE</option>
							</select>
						</div>
					</div>
					<button>Confirmar</button>
				</form>
			</div>
		</div>
	);
};

export default EditarProducto;
