import React from 'react';

// iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavbarVentas = () => {
	return (
		<nav className="nav-ventas">
			<h1>Ventas</h1>
			<div className="usuario">
				<span>Administrador</span>
				<FontAwesomeIcon icon={faUser} />
			</div>
		</nav>
	);
};

export default NavbarVentas;
