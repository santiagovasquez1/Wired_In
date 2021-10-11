import React from 'react';
import NavbarVentanas from '../share/NavbarVentanas';
import Buscador from './../share/buscador';
// import { Link, useHistory } from 'react-router-dom';
import './productos.css'
import Swal from 'sweetalert2';

export default class Productos extends React.Component {

    producto = {
        id: '',
        nombre: '',
        valor: '',
        cantidad: '',
        estado: 'Disponible' || 'No disponible'
    };

    constructor(props) {
        super(props);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.infoProducto = this.infoProducto.bind(this);
        this.state = {
            productos: []
        }
        this.state.productos.push({
            id: '1',
            nombre: 'Chicharron',
            valor: '3000',
            cantidad: '250gr',
            estado: 'Disponible'
        });
        this.state.productos.push({
            id: '2',
            nombre: 'Chirozo',
            valor: '3000',
            cantidad: '250gr',
            estado: 'Disponible'
        });
        this.state.productos.push({
            id: '3',
            nombre: 'Punta de anca',
            valor: '3000',
            cantidad: '250gr',
            estado: 'Disponible'
        });
        this.state.productos.push({
            id: '4',
            nombre: 'Solomito',
            valor: '3000',
            cantidad: '250gr',
            estado: 'Disponible'
        });
        this.state.productos.push({
            id: '2',
            nombre: 'Pierna',
            valor: '3000',
            cantidad: '250gr',
            estado: 'Disponible'
        });
    }

    eliminarProducto(producto) {

        Swal.fire({
            title: `¿Estás seguro?`,
            text: `¡El producto ${producto.nombre} eliminado no se puede recuperar!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Eliminado!', "Producto eliminado con exito", 'success');
            }
        });
    }

    infoProducto(producto) {
        this.props.history.push({
            pathname: '/productos/info',
            state: producto
        });
    }

    render() {
        const { productos } = this.state;
        if (productos.length === 0) {
            return (
                <div className="usuarios">
                    <NavbarVentanas title="Productos" />
                    <div style={{
                        textAlign: "center",
                        width: '100%',
                    }}>
                        <h4>Cargando Productos....</h4>
                        <p className="">Por favor esperar</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="productos">
                    <NavbarVentanas title="Productos" />
                    <Buscador title='Productos' url='/productos/nuevo' />

                    <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Valor unitario</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                productos.map(producto => (
                                    <tr>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.valor}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.estado}</td>
                                        <td className="acciones">
                                            <button className="btn btn-editar" type="button" onClick={() => this.infoProducto(producto)}>
                                                Editar
                                            </button>

                                            <button className="btn btn-eliminar" type="button" onClick={() => this.eliminarProducto(producto)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            );

        }
    }

};