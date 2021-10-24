import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import authService from '../../services/auth.service';

class RouterRender extends React.Component {
    constructor(props) {
        super(props)
        this.state = { authorized: null }
    }

    componentDidMount() {
        authService.validarToken().then(result => {
            this.setState({ authorized: result });
        });
    }

    render() {
        if (this.state.authorized === true) {
            const { component: Component, componentProps } = this.props
            return <Component {...componentProps} />
        } else {
            return (<Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
            }} />)
        }
    }
}

export const ProtectedRoute = function ({ component: Component, ...rest }) {
    return (
        // render is now a function rather than a Promise.
        <Route {...rest} render={props => <RouterRender componentProps={props} component={Component} />} />
    )
}