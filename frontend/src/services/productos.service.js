import axios from 'axios';
import auth from './auth.service';

const urlProductos = 'https://wiredinbackend.herokuapp.com/api/productos';

const getProductos = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios({
				method: 'GET',
				headers: auth.getHeader(),
				url: urlProductos,
			});
			resolve(response.data);
		} catch (err) {
			reject(err.response.data);
		}
	});
};

const crearProducto = (producto) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios({
				method: 'POST',
				url: urlProductos,
				data: producto,
				headers: auth.getHeader(),
			});
			resolve(response.data);
		} catch (err) {
			reject(err.response.data);
		}
	});
};

const actualizarProducto = (id, producto) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.put(`${urlProductos}/${id}`, producto, {
				headers: auth.getHeader(),
			});
			resolve(response.data);
		} catch (err) {
			reject(err.response.data);
		}
	});
};

const eliminarProducto = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.delete(`${urlProductos}/${id}`, {
				headers: auth.getHeader(),
			});
			resolve(response.data);
		} catch (err) {
			reject(err.response.data);
		}
	});
};

export default {
	getProductos,
	crearProducto,
	actualizarProducto,
	eliminarProducto,
};
