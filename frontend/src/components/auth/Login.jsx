import React, { Fragment, useState } from 'react';
// import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Error from './Error'
import auth from '../../services/auth.service';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
	const [error, guardarError] = useState(false);

	// State para iniciar sesion
	const [usuario, guardarUsuario] = useState({
		email: '',
		password: '',
	});

	const history = useHistory();

	// Extraer de usuario
	const { email, password } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// Cuando el usuario inicia sesión
	// const iniciarSesion = async (usuario) => {
	// 	try {
	// 		const respuesta = await axios({
	// 			method: 'post',
	// 			url: 'https://wiredinbackend.herokuapp.com/api/login',
	// 			data: usuario,
	// 		});
	// 		console.log(respuesta);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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
		const loginData = {
			email,
			password,
		}

		console.log(loginData);

		auth.login(loginData).then(result => {
			localStorage.setItem('token', result.token);
			// iniciarSesion(usuario);
			Swal.fire('Login', 'Usuario logeado', 'success').then(result=>{
				history.push('/usuarios');
			});
		}).catch(err => {
			Swal.fire('Error', `${err.msg}`, 'error');
		});
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
