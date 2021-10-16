const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
	total: {
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
		type: Schema.ObjectId,
		ref: 'Usuario',
	},
	estadoVenta: {
		type: String,
		required: true,
		trim: true,
	},
	listaProductos: [
		{
			producto: {
				type: Schema.ObjectId,
				ref: 'Producto',
			},
			unidades: Number,
		},
	],
});

module.exports = mongoose.model('Venta', VentaSchema);
