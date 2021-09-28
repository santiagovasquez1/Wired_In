import React from 'react';
import NavbarVentas from './NavbarVentas';
// import './Ventas.css';
import './NuevaVenta.css';

const NuevaVenta = () => {
	return (
		<div className="ventas">
			<NavbarVentas />
			<div className="nueva-venta">
				<h2>Nueva Venta</h2>
				<form>
					<div className="form-group">
						<div className="field-form">
							<label>Código</label>
							<input type="text" placeholder="Código" name="codigo" />
						</div>

						<div className="field-form">
							<label>Valor</label>
							<input type="number" placeholder="0" name="valor" />
						</div>

						<div className="field-form">
							<label>Fecha</label>
							<input type="date" placeholder="Fecha" name="fecha" />
						</div>
						<div className="field-form">
							<label>Cliente</label>
							<input type="text" placeholder="Cliente" name="cliente" />
						</div>
						<div className="field-form">
							<label>Cédula</label>
							<input type="number" placeholder="Cédula" name="cedula" />
						</div>
						<div className="field-form">
							<label>Vendedor</label>
							<input type="text" placeholder="Vendedor" name="vendedor" />
						</div>
					</div>
					<button>Agregar</button>
				</form>
			</div>
		</div>
	);
};

export default NuevaVenta;
