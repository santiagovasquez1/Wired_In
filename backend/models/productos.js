const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    valor: {
        type: Number,
        require: true,
        default: 0,
    },
    cantidad: {
        type: Number,
        require: true,
        default: 0,
    },
    estado: {
        type: String,
        require: true,
        default: 'No disponible',
    },
});

productoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Producto', productoSchema);