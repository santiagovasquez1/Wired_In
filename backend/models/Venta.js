const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
	valor: {
		type: Number,
		required: true,
		trim: true,
	},
	fecha: {
		type: String,
		required: true,
		trim: true,
	},
	cliente: {
		type: String,
		required: true,
		trim: true,
	},
	cedula: {
		type: Number,
		required: true,
		trim: true,
	},
	vendedor: {
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'Usuario',
		type: String,
		required: true,
	},
	estadoVenta: {
		type: String,
		required: true,
		trim: true,
	},
	listaProductos: [
		// {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Producto',
		// },
	],
});

module.exports = mongoose.model('Venta', VentaSchema);
