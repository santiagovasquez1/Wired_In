import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import '../../../App.css';
import NavbarVentanas from '../share/NavbarVentanas';

export default class Usuario extends React.Component {

    constructor(props) {
        super(props);
        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.regresar = this.regresar.bind(this);
        this.state = {
            usuario: {
                uid: this.props.location.state.uid,
                nombre: this.props.location.state.nombre,
                email: this.props.location.state.email,
                rol: this.props.location.state.rol
            },
            urlUsuarios: 'http://localhost:3500/api/usuarios',
            redirect: false,
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
            await axios({
                method: 'PUT',
                url: `${urlUsuarios}/${usuario.uid}`,
                data: usuario
            });
            Swal.fire('Actualizado', 'El usuario ha sido actualizado', 'success')
                .then(result => {
                    this.regresar();
                });
        } catch (error) {
            Swal.fire('Error!', 'Error al actualizar el usuario', 'error');
        }
    }

    regresar() {
        this.props.history.push('/usuarios');
    }

    render() {
        const { usuario } = this.state;
        return (
            <div className="usuarios">
                <NavbarVentanas title="Usuarios" />
                <div className="form-container">

                    <h2>Editar Usuario</h2>
                    <div className="form-group">
                        <form onSubmit={this.actualizarUsuario} >
                            <div className="field-form">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" name="nombre"
                                    value={usuario.nombre}
                                    onChange={this.onChangeModel} />
                            </div>
                            <div className="field-form">
                                <label htmlFor="email">Correo</label>
                                <input type="text" id="email" name="email"
                                    value={usuario.email}
                                    onChange={this.onChangeModel} />
                            </div>
                            <div className="field-form">
                                <label htmlFor="rol">Rol</label>
                                <input type="text" id="email" name="rol"
                                    value={usuario.rol}
                                    onChange={this.onChangeModel} />
                            </div>
                            <div className="form-actions">
                                <button>Guardar</button>
                                <button onClick={this.regresar}>Regresar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        );
    }
}