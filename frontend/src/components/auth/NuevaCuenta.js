import React, { Fragment, useState } from 'react';
import Error from './Error';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Login.css';

const NuevaCuenta = () => {
	// State para crear cuenta
	const [usuario, guardarUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
		rol: '',
	});

	// State con el error
	const [error, guardarError] = useState({
		errorEstado: false,
		mensaje: '',
	});

	// Extraer de usuario
	const { nombre, email, password, confirmar } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// funcion para registrar usuario
	const registrarUsuario = async (datos) => {
		try {
			await axios({
				method: 'post',
				url: 'http://localhost:3500/api/usuarios',
				data: datos,
			});
			// Usuario ingresado con exito
			Swal.fire('Correcto', 'El usuario se registró correctamente', 'success');
		} catch (error) {
			console.error(error);

			// Alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error, intenta de nuevo',
			});
		}
	};

	// funcion de crear cuenta
	const onSubmit = (e) => {
		e.preventDefault();

		// validar que no haya campos vacios
		if (
			nombre.trim() === '' ||
			email.trim() === '' ||
			password.trim() === '' ||
			confirmar.trim() === ''
		) {
			// prueba momentanea
			guardarError({
				errorEstado: true,
				mensaje: 'Todos los campos son obligatorios',
			});
			return;
		}

		// contraseña minimio de 6 caracteres
		if (password.length < 6) {
			// prueba momentanea
			guardarError({
				errorEstado: true,
				mensaje: 'La contraseña debe ser de al menos 6 caracteres',
			});
			return;
		}

		// contraseña igual en ambos campos
		if (password !== confirmar) {
			// prueba momentanea
			guardarError({
				errorEstado: true,
				mensaje: 'Las contraseñas no coinciden',
			});
			return;
		}

		// pasarlo al action
		guardarError({
			error: false,
			mensaje: '',
		});
		registrarUsuario({ nombre, email, password });

		// limpiar formulario
		guardarUsuario({
			nombre: '',
			email: '',
			password: '',
			confirmar: '',
			rol: '',
		});
	};

	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<h1>Crear Nueva Cuenta</h1>

					{error.errorEstado ? <Error mensaje={error.mensaje} /> : null}

					<div className="field">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Nombre"
							value={nombre}
							onChange={onChange}
						></input>
					</div>

					<div className="field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={onChange}
						></input>
					</div>

					<div className="field">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Contraseña"
							value={password}
							onChange={onChange}
						></input>
					</div>

					<div className="field">
						<label htmlFor="confirmar">
							Confirmar <br />
							Contraseña
						</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Confirmar contraseña"
							value={confirmar}
							onChange={onChange}
						></input>
					</div>

					<div className="field">
						<label>Rol</label>
						<select name="rol" onChange={onChange}>
							<option value="">-- Selecciona rol --</option>
							<option value="administrador">Administrador</option>
							<option value="vendedor">Vendedor</option>
							<option value="usuario">Usuario</option>
						</select>
					</div>

					<div className="submit-btn">
						<input onSubmit={onSubmit} type="submit" value="Registrarme" />
					</div>
				</form>

				<Link to={'/'} className="enlace-cuenta">
					Iniciar sesión
				</Link>
			</div>
		</Fragment>
	);
};

export default NuevaCuenta;
