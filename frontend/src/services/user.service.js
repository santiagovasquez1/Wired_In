import axios from "axios";
import authService from "./auth.service";
const urlUsuarios = 'http://localhost:3500/api/usuarios';

const getUsers = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let resp = await axios.get(urlUsuarios, {
                headers: authService.getAuthHeader()
            })
            resolve(resp.data);
        } catch (error) {
            reject(error);
        }
    });
}

const getUsersByRole = (role) => {
    return new Promise(async(resolve, reject) => {
        try {
            const url = `${urlUsuarios}/${role}`;
            const headers = authService.getHeader();
            const resp = await axios.get(url, { headers });
            resolve(resp.data);
        } catch (error) {
            if (error.response != null) {
                reject(error.response.data);
            } else {
                reject(error);
            }
        }
    });
}

export default { getUsers, getUsersByRole };