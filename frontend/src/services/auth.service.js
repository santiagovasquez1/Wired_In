import axios from 'axios';
// const urlUsuarios = 'http://wiredinbackend.herokuapp.com/api/login';
const urlUsuarios = 'http://localhost:3500/api/login';
let usuario;

const getToken = () => {
    return localStorage.getItem('token') || '';
};

const getHeader = () => {
    const headers = {
        'Content-Type': 'application/json',
        'x-token': getToken(),
    };
    return headers;
};

const login = (loginData) => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await axios({
                method: 'POST',
                url: urlUsuarios,
                data: loginData,
            });
            resolve(response.data);
        } catch (err) {
            reject(err.response.data);
        }
    });
};

const validarToken = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `${urlUsuarios}/renew`;
            const response = await axios.get(url, {
                headers: getHeader()
            });
            usuario = response.data.user;
            localStorage.setItem('token', response.data.token);
            resolve(true);
        } catch (error) {
            reject(false);
        }
    });
}

export default { login, getHeader, validarToken, usuario };