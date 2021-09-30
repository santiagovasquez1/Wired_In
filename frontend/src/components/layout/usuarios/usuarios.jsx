import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Usuario from './usuario';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import './usuarios.css';

const Usuarios = () => {

    const urlUsuarios = 'http://localhost:3500/api/usuarios';
    const history = useHistory();
    let [usuarios, guardarUsuarios] = useState([]);

    useEffect(() => {
        const data = async () => {
            try {
                const respuesta = await axios({
                    method: 'GET',
                    url: urlUsuarios
                });

                guardarUsuarios(respuesta.data.usuarios);
            } catch (error) {
                Swal.fire('Error', 'No se cargaron los usuarios', 'error');
            }
        }
        data();
    }, []);

    const eliminarUsuario = async (usuario) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${urlUsuarios}/${usuario.uid}`
            });
            Swal.fire('¡Eliminado!', response.data.msg, 'success');
        } catch (error) {
            Swal.fire('Error', error.msg, 'error');
        }
    }


    const confirmarEliminarUsuario = (usuario) => {
        Swal.fire({
            title: `¿Estás seguro?`,
            text: `¡El usuario ${usuario.nombre} eliminado no se puede recuperar!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(usuario);
                eliminarUsuarioDelEstado(usuario);
                history.push('/usuarios');
            }
        });
    }

    // cambiar el estado de los usuarios
    const eliminarUsuarioDelEstado = (usuario) => {
        guardarUsuarios(usuarios.filter((usuarioEsado) => usuarioEsado.uid !== usuario.uid));
    };

    const editarUsuario = (usuario) => {
        // <Usuario
        //     key={usuario.uid}
        //     usuario={usuario}
        // />
    };

    return (
        <div className="usuarios">
            <nav className="nav-ventas">
                <h1>Usuarios</h1>
            </nav>
            {
                usuarios.length === 0
                    ? <div style={{
                        textAlign: "center",
                        width: '100%',
                    }}>
                        <h4>Cargando Usuarios....</h4>
                        {/* <i>
                            <FontAwesomeIcon icon={faSpinner} rotation={90} onAnimationStart={() => {

                            }} />
                        </i> */}
                        <p className="">Por favor esperar</p>
                    </div>
                    :
                    //  <div className="buscador">
                    //     <div className="buscador-input">
                    //         <h3>Buscar Usuario</h3>
                    //         <input type="text" placeholder="Buscar" />
                    //     </div>
                    // </div>
                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th scope="col">Correo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                usuarios.map(usuario => (
                                    <tr>
                                        <td >{usuario.email}</td>
                                        <td>{usuario.nombre}</td>
                                        <td className="w200">{usuario.rol}</td>
                                        <td className="acciones">
                                            {/* <button className="btn btn-editar" type="button" onClick={() => editarUsuario(usuario)}>
                                                Editar
                                            </button> */}
                                            <Link to={{pathname:'/usuarios/info', state:usuario}}  className="btn btn-editar">
                                                Editar
                                            </Link>

                                            <button className="btn btn-eliminar" type="button" onClick={() => confirmarEliminarUsuario(usuario)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div >
    );
}

export default Usuarios;