import React, { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../../../App.css'

const Usuario = () => {
    let location = useLocation();
    const usuario = location.state;

    return (
        <Fragment>
            <div className="form-container">
                <h2>Editar Usuario</h2>
                <div className="form-group">
                    <form >
                        <div className="field">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" value={usuario.nombre} />
                        </div>
                        <div className="field">
                            <label htmlFor="email">Correo</label>
                            <input type="text" id="email" name="nombre" value={usuario.email} />
                        </div>
                        <div className="field">
                            <label htmlFor="rol">Rol</label>
                            <input type="text" id="email" name="rol" value={usuario.rol} />
                        </div>
                        <button>Guardar</button>
                    </form>
                </div>

            </div>
        </Fragment>
    );
}

export default Usuario;