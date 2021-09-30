import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function NuevaCuenta() {
    // State para crear cuenta
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
        rol: '',
    });

    // Extraer de usuario
    const { nombre, email, password, confirmar, rol } = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    // funcion para registrar usuario
    const registrarUsuario = async(datos) => {
        try {
            const respuesta = await axios({
                method: 'post',
                url: 'http://localhost:3500/api/usuarios',
                data: datos,
            });
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
    };

    // funcion de crear cuenta
    const onSubmit = (e) => {
        console.log('submit');
        e.preventDefault();

        // validar que no haya campos vacios
        if (
            nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === ''
        ) {
            // prueba momentanea
            alert('Todos los campos son obligatorios');
            return;
        }

        // contraseña minimio de 6 caracteres
        if (password.length < 6) {
            // prueba momentanea
            alert('La contraseña debe ser de al menos 6 caracteres');
            return;
        }

        // contraseña igual en ambos campos
        if (password !== confirmar) {
            // prueba momentanea
            alert('Las contraseñas no coinciden');
            return;
        }

        // pasarlo al action
        registrarUsuario({ nombre, email, password });

        // limpiar formulario
        guardarUsuario({
            nombre: '',
            email: '',
            password: '',
            confirmar: '',
            rol: '',
        });
    };

    return ( <
        Fragment >
        <
        div className = "login" >
        <
        form onSubmit = { onSubmit } >
        <
        h1 > Crear Nueva Cuenta < /h1>

        <
        div className = "field" >
        <
        label htmlFor = "nombre" > Nombre < /label> <
        input type = "text"
        id = "nombre"
        name = "nombre"
        placeholder = "Nombre"
        value = { nombre }
        onChange = { onChange } >
        < /input> <
        /div>

        <
        div className = "field" >
        <
        label htmlFor = "email" > Email < /label> <
        input type = "email"
        id = "email"
        name = "email"
        placeholder = "Email"
        value = { email }
        onChange = { onChange } >
        < /input> <
        /div>

        <
        div className = "field" >
        <
        label htmlFor = "password" > Contraseña < /label> <
        input type = "password"
        id = "password"
        name = "password"
        placeholder = "Contraseña"
        value = { password }
        onChange = { onChange } >
        < /input> <
        /div>

        <
        div className = "field" >
        <
        label htmlFor = "confirmar" >
        Confirmar < br / >
        Contraseña <
        /label> <
        input type = "password"
        id = "confirmar"
        name = "confirmar"
        placeholder = "Confirmar contraseña"
        value = { confirmar }
        onChange = { onChange } >
        < /input> <
        /div>

        <
        div className = "field" >
        <
        label htmlFor = "rol" > Rol < /label> <
        input type = "text"
        id = "rol"
        name = "rol"
        placeholder = "Rol"
        value = { rol }
        onChange = { onChange } >
        < /input> <
        /div>

        <
        div className = "submit-btn" >
        <
        input onSubmit = { onSubmit }
        type = "submit"
        value = "Registrarme" / >
        <
        /div> <
        /form>

        <
        Link to = { '/' }
        className = "enlace-cuenta" >
        Iniciar sesión <
        /Link> <
        /div> <
        /Fragment>
    );
}

export { NuevaCuenta };