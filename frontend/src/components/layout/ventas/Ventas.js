import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Ventas.css';

const Ventas = () => {
	return (
		<Router>
			<div className="ventas">
				<nav>
					<h1>Ventas</h1>
					<div className="usuario">
						<span>Administrador</span>
						<FontAwesomeIcon icon={faUser} />
					</div>
				</nav>
				<table className="table">
					<thead className="table-head">
						<tr>
							<th scope="col">Código Venta</th>
							<th scope="col">Nombre cliente</th>
							<th scope="col">Valor</th>
							<th scope="col">Fecha</th>
							<th scope="col">Nombre vendedor</th>
						</tr>
					</thead>
					<tbody className="table-body">No hay ventas</tbody>
				</table>
			</div>
		</Router>
	);
};

export default Ventas;
