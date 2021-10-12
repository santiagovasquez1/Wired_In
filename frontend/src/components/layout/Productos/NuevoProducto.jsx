import React, { Component } from 'react';
import Swal from 'sweetalert2';
import '../../../App.css';
import NavbarVentanas from '../share/NavbarVentanas';
import './productos.css';

export default class NuevoProducto extends Component {
    constructor(props) {
        super(props);

        this.onChangeModel = this.onChangeModel.bind(this);
        this.regresar = this.regresar.bind(this);
        this.nuevoProducto = this.nuevoProducto.bind(this);

        this.state = {
            producto: {
                id: '',
                nombre: '',
                valor: '',
                cantidad: '',
                estado: 'Disponible' || 'No disponible'
            }
        }
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

    nuevoProducto(e) {
        e.preventDefault();
        Swal.fire('Actualizado', 'El producto ha sido creado', 'success')
            .then(result => {
                this.regresar();
            });
    }

    render() {
        const { producto } = this.state;

        return (
            <div className="productos">
                <NavbarVentanas title="Productos" />
                <div className="form-container">
                    <h2>Nuevo producto</h2>
                    <div className="form-group">
                        <form onSubmit={this.nuevoProducto}>
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
}