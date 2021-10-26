import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

export default class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            url: this.props.url
        }
    }

    render() {
        return (
            <Fragment>
                <div className="buscador">
                    <div className="buscador-input">
                        <h3>Buscar {this.state.title}</h3>
                        <input type="text" placeholder="Buscar" />
                    </div>
                    <Link to={this.state.url} className="btn-agregar">
                        Agregar {this.state.title}
                    </Link>
                </div>
            </Fragment>
        );
    }
}