import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'
import authService from '../../services/auth.service';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    let [isLogin, saveLogin] = useState(false);

    useEffect(() => {
        checkLogin();
    }, [])

    const checkLogin = async () => {
        let isLog = await authService.validarToken();
        saveLogin(isLog);
    }

    return (
        <Route {...rest}
            render={props => {
                if (isLogin) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }} />
                }
            }}
        />
    );
}

