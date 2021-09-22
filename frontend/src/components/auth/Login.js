import React, { Fragment } from 'react';

function Login() {
	const onChange = () => {
		console.log('Escribiendo...');
	};

	return (
		<Fragment>
			<form>
				<h1>Iniciar Sesión</h1>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						onChange={onChange}
					></input>
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Contraseña"
						onChange={onChange}
					></input>
				</div>
				<div>
					<input type="submit" value="Iniciar Sesión" />
				</div>
			</form>
		</Fragment>
	);
}

export { Login };
