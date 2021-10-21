'use strict';
import axios from 'axios';
const urlUsuarios = 'https://wiredinbackend.herokuapp.com/api/login';

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
	return new Promise(async (resolve, reject) => {
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

export default { login, getHeader };
