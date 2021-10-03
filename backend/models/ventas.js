'use strict'

const { Schema, model } = require('mongoose');

const ventasSchema = Schema({
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    valor: {
        type: Number,
        require: true
    },
    fecha: {
        type: Date,
        require: true,
        default: Date.now()
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        require: true
    }]
});


ventasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object
});

module.exports = model('Venta', ventasSchema);