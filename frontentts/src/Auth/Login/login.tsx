import React from "react";

export class Login {

    // constructor() {
    //     super({});
    // }

    render(): JSX.Element {
        return (
            <div>
                <h1>Login</h1>
                <form action="">
                    <fieldset>
                        <label htmlFor="">Correo electronico</label>
                        <input type="text" placeholder="Ingrese el correo electronico" />
                        <br />
                        <label htmlFor="">Contraseña</label>
                        <input type="password" />
                        <br />
                        <button onClick={this.onClick}>Login</button>
                    </fieldset>
                </form>
            </div>
        );
    }

    onClick() {
        console.log("Hola mundo");
        return false;
    }
}