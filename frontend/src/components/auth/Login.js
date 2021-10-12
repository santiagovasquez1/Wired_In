import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error';
import './Login.css';

const Login = () => {
	// State para iniciar sesion
	const [usuario, guardarUsuario] = useState({
		email: '',
		password: '',
	});

	const [error, guardarError] = useState({
		errorEstado: false,
		mensaje: '',
	});

	// Extraer de usuario
	const { email, password } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// Cuando el usuario inicia sesión
	const iniciarSesion = async (usuario) => {
		try {
			const respuesta = await axios({
				method: 'post',
				url: 'http://localhost:3500/api/usuarios',
				data: usuario,
			});
			console.log(respuesta);
		} catch (error) {
			console.error(error);
		}
	};

	// funcion de iniciar sesion
	const onSubmit = (e) => {
		e.preventDefault();

		// validar que no haya campos vacios
		if (email.trim() === '' || password.trim() === '') {
			guardarError({
				errorEstado: true,
				mensaje: 'Todos los campos son obligatorios',
			});
			return;
		}

		// pasarlo al action
		iniciarSesion(usuario);
	};

	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<h1>Iniciar Sesión</h1>

					{error.errorEstado ? <Error mensaje={error.mensaje} /> : null}

					<div className="email field">
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
					<div className="password field">
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
					<div className="submit-btn">
						<input type="submit" value="Iniciar Sesión" />
					</div>
				</form>
				<Link to={'/nueva-cuenta'} className="enlace-cuenta">
					Crear nueva cuenta
				</Link>
			</div>
		</Fragment>
	);
};

export default Login;
