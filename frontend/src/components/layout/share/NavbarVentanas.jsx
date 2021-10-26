import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class NavbarVentanas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
        }
    }

    render() {
        return (
            <Fragment>
                <nav className="nav-ventas">
                    <h1>{this.state.title}</h1>
                    {/* <div className="usuario">
                        <span>Administrador</span>
                        <FontAwesomeIcon icon={faUser} />
                    </div> */}
                </nav>
            </Fragment>
        )
    }
}