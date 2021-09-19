import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Auth/Login/login';

const login = new Login();

function holaMundo(nombre: string): JSX.Element {
  let presentacion: JSX.Element = <h2>Realizado por {nombre}</h2>
  return presentacion;
}

function App() {
  const nombre = "Santiago Vasquez";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido al demo de reacts, elaborado por {holaMundo(nombre)}
        </p>

        {login.render()}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
