import React from 'react';

// Componentes
import NavbarProductos from './NavbarProductos';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const NuevoProducto = () => {
	// Leer los datos del formulario y tenerlos en el estado

	// enviar los productos a la api

	// funcin submit
	const submitNuevoProducto = (e) => {
		e.preventDefault();
	};
	return (
		<div className="ventas">
			<NavbarProductos />
			<div className="nueva-venta">
				<h2>Nueva Producto</h2>

				{/* {alerta ? (
					<p className={alerta.classes}>
						{alerta.msg}{' '}
						<span>
							<FontAwesomeIcon onClick={quitarAlerta} icon={faWindowClose} />
						</span>
					</p>
				) : null} */}

				<form onSubmit={submitNuevoProducto}>
					<div className="form-group">
						<div className="field-form">
							<label>Código</label>
							<input
								type="text"
								placeholder="Código"
								name="id"
								// onChange={onChangeNuevaVenta}
							/>
						</div>

						<div className="field-form">
							<label>Valor</label>
							<input
								type="number"
								placeholder="0"
								name="valor"
								// onChange={onChangeNuevaVenta}
							/>
						</div>

						<div className="field-form">
							<label>Fecha</label>
							<input
								type="date"
								placeholder="Fecha"
								name="fecha"
								// onChange={onChangeNuevaVenta}
							/>
						</div>
						<div className="field-form">
							<label>Cliente</label>
							<input
								type="text"
								placeholder="Cliente"
								name="cliente"
								// onChange={onChangeNuevaVenta}
							/>
						</div>
						<div className="field-form">
							<label>Cédula</label>
							<input
								type="number"
								placeholder="Cédula"
								name="cedula"
								// onChange={onChangeNuevaVenta}
							/>
						</div>
						<div className="field-form">
							<label>Vendedor</label>
							<input
								type="text"
								placeholder="Vendedor"
								name="vendedor"
								// onChange={onChangeNuevaVenta}
							/>
						</div>
					</div>
					<button>Agregar Producto</button>
				</form>
			</div>
		</div>
	);
};

export default NuevoProducto;
