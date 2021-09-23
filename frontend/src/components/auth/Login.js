import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
	// State para iniciar sesion
	const [usuario, guardarUsuario] = useState({
		email: '',
		password: '',
	});

	// Extraer de usuario
	const { email, password } = usuario;

	const onChange = (event) => {
		guardarUsuario({
			...usuario,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Fragment>
			<div className="login">
				<form>
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
}

export { Login };
