import React from 'react';

const Usuario = ({ usuario }) => {

    return (
        <div>
            <form action="">
                <label>Nombre :</label>
                <input type='text' value={usuario.name} />
            </form>
        </div>
    );
}

export default Usuario;