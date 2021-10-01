import axios from 'axios';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from "react-router";
import '../../../App.css'

export default class Usuario extends React.Component {

    constructor(props) {
        super(props);
        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.state = {
            usuario: {
                uid: this.props.location.state.uid,
                nombre: this.props.location.state.nombre,
                email: this.props.location.state.email,
                rol: this.props.location.state.rol
            },
            urlUsuarios: 'http://localhost:3500/api/usuarios'
        };
    }

    onChangeModel(e) {
        const field = e.target.name;
        const { usuario } = this.state;
        usuario[field] = e.target.value;
        this.setState({ usuario });
    }

    async actualizarUsuario(e) {
        e.preventDefault();

        try {
            const { usuario, urlUsuarios } = this.state;
            const respuesta = await axios({
                method: 'PUT',
                url: `${urlUsuarios}/${usuario.uid}`,
                data: usuario
            });
            Swal.fire('Actualizado', 'El usuario ha sido actualizado', 'success')
                .then(result => {

                });
        } catch (error) {
            Swal.fire('Error!', 'Error al actualizar el usuario', 'error');
        }
    }

    render() {
        const { usuario } = this.state;

        return (
            <Fragment>
                <div className="form-container">
                    <h2>Editar Usuario</h2>
                    <div className="form-group">
                        <form onSubmit={this.actualizarUsuario} >
                            <div className="field">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" name="nombre"
                                    value={usuario.nombre}
                                    onChange={this.onChangeModel} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Correo</label>
                                <input type="text" id="email" name="email"
                                    value={usuario.email}
                                    onChange={this.onChangeModel} />
                            </div>
                            <div className="field">
                                <label htmlFor="rol">Rol</label>
                                <input type="text" id="email" name="rol"
                                    value={usuario.rol}
                                    onChange={this.onChangeModel} />
                            </div>
                            <button>Guardar</button>
                        </form>
                    </div>

                </div>
            </Fragment>
        );
    }
}