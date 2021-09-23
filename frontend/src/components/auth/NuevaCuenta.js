import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function NuevaCuenta() {
	// State para crear cuenta
	const [usuario, guardarUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
		rol: '',
	});

	// Extraer de usuario
	const { nombre, email, password, confirmar, rol } = usuario;

	const onChange = (event) => {
		guardarUsuario({
			...usuario,
			[event.target.name]: event.target.value,
		});
	};

	// funcion de crear cuenta
	const onSubmit = (e) => {
		e.preventDefault();

		// validar que no haya campos vacios

		// contraseña minimio de 6 caracteres

		// contraseña igual en ambos campos

		// pasarlo al action
	};

	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<h1>Crear Nueva Cuenta</h1>

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
						<label htmlFor="rol">Rol</label>
						<input
							type="text"
							id="rol"
							name="rol"
							placeholder="Rol"
							value={rol}
							onChange={onChange}
						></input>
					</div>

					<div className="submit-btn">
						<input type="submit" value="Registrarme" />
					</div>
				</form>

				<Link to={'/'} className="enlace-cuenta">
					Iniciar sesión
				</Link>
			</div>
		</Fragment>
	);
}

export { NuevaCuenta };
