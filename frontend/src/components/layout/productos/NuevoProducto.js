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
		<div className="main-container">
			<NavbarProductos />
			<div className="nuevo-item">
				<h2>Nuevo Producto</h2>

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
								name="idProducto"
								// onChange={onChangeNuevaVenta}
							/>
						</div>

						<div className="field-form">
							<label>Descripción</label>
							<input
								type="text"
								placeholder="Descripción"
								name="descripcion"
								// onChange={onChangeNuevaVenta}
							/>
						</div>

						<div className="field-form">
							<label>Valor unitario</label>
							<input
								type="number"
								placeholder="0"
								name="valorUnitario"
								// onChange={onChangeNuevaVenta}
							/>
						</div>

						<div className="field-form">
							<label>Estado</label>
							<select name="estadoProducto">
								<option value="">-- Selecciona --</option>
								<option value="disponible">DISPONIBLE</option>
								<option value="no disponible">NO DISPONIBLE</option>
							</select>
						</div>
					</div>
					<button>Agregar Producto</button>
				</form>
			</div>
		</div>
	);
};

export default NuevoProducto;
