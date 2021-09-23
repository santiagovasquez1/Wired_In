const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioDb = require('../models/usuario');

const login = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioDb.findOne({ email });

        if (!usuario) {
            return res.status(404).send({
                ok: false,
                msg: "El usuario no esta registrado en la aplicación"
            });
        } else if (validatePassword(password, usuario)) {
            res.status(200).send({
                ok: true,
                usuario,
                msg: "Usuario logeado"
            });
        } else {
            return res.status(400).send({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error.msg
        });
    }
}

const validatePassword = (password, user) => {
    return validPassword = bcrypt.compareSync(password, user.password);
}

module.exports = {
    login
}