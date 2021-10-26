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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    estadoVenta: {
        type: String,
        required: true,
        trim: true,
    },
    listaProductos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    }, ],
});

module.exports = mongoose.model('Venta', VentaSchema);