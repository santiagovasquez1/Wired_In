import React, { Fragment } from 'react';
import './Login.css';

function Login() {
	const onChange = () => {
		console.log('Escribiendo...');
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
							onChange={onChange}
						></input>
					</div>
					<div className="submit-btn">
						<input type="submit" value="Iniciar Sesión" />
					</div>
				</form>
			</div>
		</Fragment>
	);
}

export { Login };
