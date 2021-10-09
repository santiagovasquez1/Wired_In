import React from 'react';
import NavbarVentanas from '../share/NavbarVentanas';
import Buscador from './../share/buscador';
import './productos.css'
import Swal from 'sweetalert2';
import productoService from '../../../services/productos.service';
export default class Productos extends React.Component {

    constructor(props) {
        super(props);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.infoProducto = this.infoProducto.bind(this);
        this.cargarProductos = this.cargarProductos.bind(this);

        this.state = {
            productos: [],
            mostrarProductos: false
        }
    }

    componentDidMount() {
        this.cargarProductos();
    }

    cargarProductos() {
        productoService.getProductos().then(result => {
            this.setState({ mostrarProductos: true, productos: result.productos });
        }).catch(error => {
            Swal.fire('Error', error.msg, 'error').then(() => {
                this.props.history.push('/');
            });
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                productoService.eliminarProducto(producto._id).then(() => {
                    Swal.fire('¡Eliminado!', "Producto eliminado con exito", 'success').then(() => {
                        this.cargarProductos();
                    });
                }).catch(error => {
                    Swal.fire('Error', error.msg, 'error');
                });
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
        const { productos, mostrarProductos } = this.state;
        if (!mostrarProductos) {
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
                                        <td>{producto._id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>
                                            <span className="valor-venta">${producto.valor}</span>
                                        </td>
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