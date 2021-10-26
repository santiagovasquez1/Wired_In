import axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import NavbarVentanas from '../share/NavbarVentanas';
import './usuarios.css';
import auth from '../../../services/auth.service';

export default class NuevoUsuario extends Component {

    constructor(props) {
        super(props);
        this.regresar = this.regresar.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            usuario: {
                nombre: '',
                email: '',
                rol: '',
                password: '',
                confirmar: ''
            },
            urlUsuarios: 'https://wiredinbackend.herokuapp.com/api/usuarios',
            redirect: false,
            crearDisabled: false
        }
    }

    regresar() {
        this.props.history.push('/usuarios');
    }

    onChangeModel(e) {
        const field = e.target.name;
        const { usuario } = this.state;
        usuario[field] = e.target.value;
        this.setState({ usuario });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({ crearDisabled: true })
        try {
            const { usuario, urlUsuarios } = this.state;
            if (usuario.confirmar === usuario.password) {
                await axios({
                    method: 'POST',
                    url: urlUsuarios,
                    data: usuario,
                    headers: auth.getHeader()
                });

                Swal.fire('Creacion', 'El usuario ha sido creado', 'success')
                    .then(result => {
                        this.regresar();
                    });
            } else if (usuario.password.length < 6) {
                Swal.fire('Error!', 'La contraseña debe ser de al menos 6 caracteres', 'error');
                this.setState({ crearDisabled: false });
            }
            else {
                Swal.fire('Error!', 'Las contraseñas no coinciden', 'error');
                this.setState({ crearDisabled: false });
            }

        } catch (error) {
            Swal.fire('Error!', 'Error al actualizar el usuario', 'error');
            this.setState({ crearDisabled: false });
        }
    }

    render() {
        const { usuario, crearDisabled } = this.state;
        return (
            <div className="usuarios">
                <NavbarVentanas title="Usuarios" />
                <div className="form-container">
                    <form onSubmit={this.onSubmit}>
                        <h1>Nuevo Usuario</h1>
                        <div className="field-form">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={this.onChangeModel} required="true" />
                        </div>
                        <div className="field-form">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" placeholder="Email" value={usuario.email} onChange={this.onChangeModel} required="true" />
                        </div>
                        <div className="field-form">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="Contraseña" value={usuario.password} onChange={this.onChangeModel} required="true" />
                        </div>
                        <div className="field-form">
                            <label htmlFor="confirmar">Confirmar contraseña</label>
                            <input type="password" name="confirmar" id="confirmar" placeholder="Confirmar contraseña" value={usuario.confirmar} onChange={this.onChangeModel} required="true" />
                        </div>
                        <div className="field-form">
                            <label htmlFor="rol">Rol de usuario</label>
                            <select name="rol" id="rol" value={usuario.rol} onChange={this.onChangeModel} required="true">
                                <option value=""></option>
                                <option value="Administrador">Administrador</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button disabled={crearDisabled}>Crear Usuario</button>
                            <button onClick={this.regresar}>Regresar</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}