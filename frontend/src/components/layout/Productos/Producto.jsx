import React, { Component } from 'react';
import Swal from 'sweetalert2';
import '../../../App.css';
import productosService from '../../../services/productos.service';
import NavbarVentanas from '../share/NavbarVentanas';
import './productos.css';

export default class Producto extends Component {
    constructor(props) {
        super(props);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.regresar = this.regresar.bind(this);
        this.actualizarProducto = this.actualizarProducto.bind(this);

        const { _id,nombre, valor, cantidad, estado } = this.props.location.state;
        this.state = {
            producto: {
                _id,
                nombre,
                valor,
                cantidad,
                estado
            }
        };

    }

    onChangeModel(e) {
        const field = e.target.name;
        const { producto } = this.state;
        producto[field] = e.target.value;
        this.setState({ producto });
    }

    regresar() {
        this.props.history.push('/productos');
    }

    actualizarProducto(e) {
        e.preventDefault();

        productosService.actualizarProducto(this.state.producto._id,this.state.producto).then(result=>{
            Swal.fire('Actualizado', 'El producto ha sido actualizado', 'success')
            .then(result => {
                this.regresar();
            });
        }).catch(err=>{
            Swal.fire('Error', 'El producto no ha sido actualizado', 'error')
        });


    }

    render() {
        const { producto } = this.state;

        return (
            <div className="productos">
                <NavbarVentanas title="Productos" />
                <div className="form-container">
                    <h2>Editar producto</h2>
                    <div className="form-group">
                        <form onSubmit={this.actualizarProducto}>
                            <div className="field-form">
                                <label htmlFor="nombre">Descripcion</label>
                                <input type="text" id="nombre" name="nombre"
                                    value={producto.nombre}
                                    onChange={this.onChangeModel}
                                    required="true" />
                            </div>

                            <div className="field-form">
                                <label htmlFor="valor">Valor</label>
                                <input type="number" id="valor" name="valor" value={producto.valor} onChange={this.onChangeModel} required="true" />
                            </div>

                            <div className="field-form">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input type="text" name="cantidad" id="cantidad" value={producto.cantidad} onChange={this.onChangeModel} required="true" />
                            </div>

                            <div className="field-form">
                                <label htmlFor="estado">Estado</label>
                                <select name="estado" id="estado" value={producto.estado} onChange={this.onChangeModel} required="true">
                                    <option value=""></option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
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
};