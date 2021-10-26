const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: 'Usuario',
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

usuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', usuarioSchema);