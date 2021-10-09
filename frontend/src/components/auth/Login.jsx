import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../services/auth.service';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
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

	// funcion de iniciar sesion
	const onSubmit = (e) => {
		e.preventDefault();

		// validar que no haya campos vacios

		// pasarlo al action
		const loginData = {
			email,
			password,
		}

		auth.login(loginData).then(result => {
			localStorage.setItem('token', result.token);
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
